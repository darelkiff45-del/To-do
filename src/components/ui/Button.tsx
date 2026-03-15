import { useEffect } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const BUTTON_STYLES = `
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  cursor:pointer; border:none; outline:none; font-family:'Outfit',sans-serif;
  font-weight:600; white-space:nowrap; letter-spacing:-.02em;
  transition:all .18s cubic-bezier(.22,.68,0,1.2);
  text-decoration:none;
}
.btn:disabled { opacity:.4; pointer-events:none; }
.btn-hero {
  background:linear-gradient(155deg,#6b7fff 0%,#5c5ef4 55%,#7c3aed 100%);
  color:#fff; border-radius:16px; padding:17px 38px;
  font-size:16.5px; font-weight:700; letter-spacing:-.03em;
  box-shadow:0 0 0 1px rgba(108,128,255,.3),0 8px 32px rgba(92,94,244,.48),inset 0 1px 0 rgba(255,255,255,.14);
}
.btn-hero:hover {
  transform:translateY(-3px) scale(1.01);
  box-shadow:0 0 0 1px rgba(108,128,255,.4),0 16px 48px rgba(92,94,244,.58),inset 0 1px 0 rgba(255,255,255,.18);
}
.btn-hero:active { transform:translateY(-1px) scale(.995); }
.btn-primary {
  background:linear-gradient(155deg,#6b7fff,#5c5ef4);
  color:#fff; border-radius:12px; padding:11px 22px;
  font-size:14px; font-weight:600;
  box-shadow:0 4px 18px rgba(92,114,245,.38),inset 0 1px 0 rgba(255,255,255,.1);
}
.btn-primary:hover {
  transform:translateY(-2px);
  box-shadow:0 8px 26px rgba(92,114,245,.52),inset 0 1px 0 rgba(255,255,255,.14);
}
.btn-ghost {
  background:rgba(255,255,255,.04); color:var(--t2);
  border:1px solid var(--l2); border-radius:12px;
  padding:11px 22px; font-size:14px; font-weight:500;
  backdrop-filter:blur(8px);
}
.btn-ghost:hover { background:rgba(255,255,255,.07); color:var(--t1); border-color:var(--l3); transform:translateY(-1px); }
.btn-ghost-hero {
  background:rgba(255,255,255,.05); color:var(--t1);
  border:1px solid var(--l2); border-radius:16px;
  padding:17px 38px; font-size:16.5px; font-weight:600; letter-spacing:-.02em;
  backdrop-filter:blur(12px);
}
.btn-ghost-hero:hover { background:rgba(255,255,255,.08); border-color:var(--l3); transform:translateY(-3px); }
.btn-nav {
  background:linear-gradient(135deg,#6b7fff,#5c5ef4); color:#fff;
  border-radius:10px; padding:8px 20px; font-size:13.5px; font-weight:600;
  box-shadow:0 3px 14px rgba(92,114,245,.38);
}
.btn-nav:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(92,114,245,.52); }
.btn-nav-ghost {
  background:transparent; color:var(--t2);
  border-radius:10px; padding:8px 18px; font-size:13.5px; font-weight:500;
}
.btn-nav-ghost:hover { background:rgba(255,255,255,.05); color:var(--t1); }
.btn-danger {
  background:rgba(248,113,113,.08); color:var(--red);
  border:1px solid rgba(248,113,113,.2); border-radius:10px;
  padding:9px 18px; font-size:13px; font-weight:600;
}
.btn-danger:hover { background:rgba(248,113,113,.14); }
.btn-icon {
  display:inline-flex; align-items:center; justify-content:center;
  width:32px; height:32px; border-radius:8px;
  background:transparent; color:var(--t3);
  border:none; outline:none; cursor:pointer; font-size:14px;
  transition:all .15s;
}
.btn-icon:hover { background:rgba(255,255,255,.07); color:var(--t2); }
.btn-icon.edit:hover  { background:var(--blue-soft); color:var(--blue-h); }
.btn-icon.del:hover   { background:rgba(248,113,113,.1); color:var(--red); }
`

function useButtonStyles() {
  useEffect(() => {
    if (document.getElementById('button-styles')) return
    const style = document.createElement('style')
    style.id = 'button-styles'
    style.textContent = BUTTON_STYLES
    document.head.appendChild(style)
  }, [])
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  loading?: boolean
}

const VARIANT: Record<Variant,string> = {
  primary:   'btn-primary text-white font-semibold',
  secondary: 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-1)] hover:bg-[var(--bg-hover)] transition-colors',
  ghost:     'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--bg-hover)] transition-colors',
  danger:    'bg-[var(--danger)]/10 border border-[var(--danger)]/30 text-[var(--danger)] hover:bg-[var(--danger)]/20 transition-colors',
}
const SIZE: Record<Size,string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

export default function Button({ variant='primary', size='md', children, fullWidth=false, loading=false, className='', disabled, ...rest }: ButtonProps) {
  useButtonStyles()
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT[variant]} ${SIZE[size]} ${fullWidth?'w-full':''} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  )
}
