import { useEffect } from 'react'
import type { InputHTMLAttributes } from 'react'

const INPUT_STYLES = `
.field, .field-select, .field-textarea {
  width:100%; font-family:'Outfit',sans-serif; font-size:14px; color:var(--t1);
  background:var(--s2); border:1.5px solid var(--l2); border-radius:12px;
  padding:13px 16px; outline:none; letter-spacing:-.01em;
  transition:border-color .18s, box-shadow .18s, background .18s;
  appearance:none; -webkit-appearance:none;
}
.field::placeholder, .field-textarea::placeholder { color:var(--t3); }
.field:focus, .field-select:focus, .field-textarea:focus {
  border-color:var(--blue); background:var(--s3);
  box-shadow:0 0 0 4px rgba(92,114,245,.12);
}
.field-icon { padding-left:44px; }
.field-select {
  color:var(--t2); cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%233a5075' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right 14px center;
  padding-right:40px;
}
.field-select:focus { color:var(--t1); }
.field-textarea { resize:vertical; min-height:80px; }
.search-wrap { position:relative; flex:1; }
.search-input {
  width:100%; font-family:'Outfit',sans-serif; font-size:14.5px; font-weight:400;
  color:var(--t1); letter-spacing:-.01em;
  background:var(--s2); border:1.5px solid var(--l2); border-radius:14px;
  padding:14px 18px 14px 50px; outline:none;
  transition:all .2s;
}
.search-input::placeholder { color:var(--t3); }
.search-input:focus {
  border-color:var(--blue-border); background:var(--s3);
  box-shadow:0 0 0 4px rgba(92,114,245,.09);
}
.search-icon {
  position:absolute; left:17px; top:50%; transform:translateY(-50%);
  pointer-events:none; color:var(--t3);
}
`

function useInputStyles() {
  useEffect(() => {
    if (document.getElementById('input-styles')) return
    const style = document.createElement('style')
    style.id = 'input-styles'
    style.textContent = INPUT_STYLES
    document.head.appendChild(style)
  }, [])
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
}

export default function Input({ label, error, icon, className='', ...rest }: InputProps) {
  useInputStyles()
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[var(--text-2)]">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] text-base">{icon}</span>}
        <input
          className={`w-full bg-[var(--bg-surface)] border rounded-xl px-4 py-2.5 text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-colors ${error?'border-[var(--danger)]':'border-[var(--border)]'} ${icon?'pl-10':''} ${className}`}
          {...rest}
        />
      </div>
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  )
}
