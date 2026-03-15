import { useEffect } from 'react'
import type { TaskRowProps, TaskCategory } from '../../types'

const TASKROW_STYLES = `
.task-row {
  display:flex; align-items:center; gap:18px;
  padding:22px 32px;
  border-bottom:1px solid var(--l1);
  cursor:pointer; transition:background .12s;
  position:relative;
}
.task-row::before {
  content:''; position:absolute; left:0; top:16px; bottom:16px;
  width:3px; border-radius:0 3px 3px 0;
  background:var(--blue); opacity:0;
  transition:opacity .15s;
}
.task-row:hover { background:rgba(255,255,255,.016); }
.task-row:hover::before { opacity:1; }
.task-row:last-child { border-bottom:none; }
.priority-dot {
  width:7px; height:7px; border-radius:50%; flex-shrink:0;
}
.chip {
  display:inline-flex; align-items:center; gap:5px;
  padding:4px 11px; border-radius:99px;
  font-size:11.5px; font-weight:600; letter-spacing:.01em;
}
.task-row:hover .row-actions { opacity:1 !important; }
`

function useTaskRowStyles() {
  useEffect(() => {
    if (document.getElementById('taskrow-styles')) return
    const style = document.createElement('style')
    style.id = 'taskrow-styles'
    style.textContent = TASKROW_STYLES
    document.head.appendChild(style)
  }, [])
}

const CAT_ICON: Record<TaskCategory, string> = {
  Travail:'🗂️', Personnel:'🌿', Sante:'❤️', Apprentissage:'📊', Finance:'💰',
}
const CAT_COLOR: Record<TaskCategory, string> = {
  Travail:'#7b8fff', Personnel:'#3ecf8e', Sante:'#f87171', Apprentissage:'#a78bfa', Finance:'#fbbf24',
}

/** TaskRow — Props: task, onToggle, onEdit, onDelete, onClick */
export default function TaskRow({ task, onToggle, onEdit, onDelete, onClick }: TaskRowProps) {
  useTaskRowStyles()
  const done   = task.status === 'done'
  const urgent = task.priority === 'urgent'
  const color  = CAT_COLOR[task.category]

  return (
    <div className="task-row group" onClick={() => onClick(task)}>

      {/* Toggle */}
      <button
        onClick={e => { e.stopPropagation(); onToggle(task.id) }}
        style={{
          flexShrink:0, width:22, height:22, borderRadius:'50%',
          border:`2px solid ${done ? 'var(--green)' : 'var(--l3)'}`,
          background: done ? 'var(--green)' : 'transparent',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', transition:'all .18s', outline:'none',
        }}
      >
        {done && (
          <svg width={10} height={10} fill="none" stroke="#04060e" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        )}
      </button>

      {/* Content */}
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{
          fontSize:14.5, fontWeight: done ? 400 : 500,
          color: done ? 'var(--t3)' : 'var(--t1)',
          textDecoration: done ? 'line-through' : 'none',
          letterSpacing:'-.01em', marginBottom:6, lineHeight:1.3,
        }}>
          {task.name}
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12.5, color:'var(--t3)', fontWeight:400 }}>
            <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ opacity:.7 }}>
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {task.dueDate}
          </span>
          <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12.5, color:'var(--t3)', fontWeight:400 }}>
            <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ opacity:.7 }}>
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {task.dueTime}
          </span>
          {task.description && (
            <span style={{ fontSize:12, color:'var(--t4)', maxWidth:220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {task.description}
            </span>
          )}
        </div>
      </div>

      {/* Right side */}
      <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}
           onClick={e => e.stopPropagation()}>

        {/* Category chip */}
        <div style={{
          display:'flex', alignItems:'center', gap:6,
          padding:'5px 12px', borderRadius:99,
          background:`${color}14`, border:`1px solid ${color}30`,
        }}>
          <span style={{ fontSize:14, lineHeight:1 }}>{CAT_ICON[task.category]}</span>
          <span style={{ fontSize:12, fontWeight:600, color, letterSpacing:'-.01em' }}>{task.category}</span>
        </div>

        {/* Priority */}
        {urgent && (
          <div style={{ padding:'4px 10px', borderRadius:99, background:'rgba(248,113,113,.1)', border:'1px solid rgba(248,113,113,.2)' }}>
            <span style={{ fontSize:12, fontWeight:700, color:'var(--red)' }}>🔥 Urgent</span>
          </div>
        )}

        {/* Action icons — appear on hover */}
        <div className="row-actions" style={{ display:'flex', gap:4, opacity:0, transition:'opacity .15s' }}>
          <button className="btn-icon edit" onClick={() => onEdit(task)} title="Modifier">
            <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="btn-icon del" onClick={() => onDelete(task.id)} title="Supprimer">
            <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
