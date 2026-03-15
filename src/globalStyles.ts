const css = `
:root {
  --canvas:    #04060e;
  --s0:        #070a14;
  --s1:        #0a0f1e;
  --s2:        #0d1426;
  --s3:        #111b32;
  --s4:        #16223e;
  --s5:        #1c2c50;

  --l1: rgba(255,255,255,.05);
  --l2: rgba(255,255,255,.08);
  --l3: rgba(255,255,255,.12);
  --l4: rgba(255,255,255,.18);

  --blue:        #5c72f5;
  --blue-h:      #6b80ff;
  --blue-glow:   rgba(92,114,245,.32);
  --blue-soft:   rgba(92,114,245,.1);
  --blue-border: rgba(92,114,245,.22);

  --green:  #3ecf8e;
  --red:    #f87171;
  --amber:  #fbbf24;
  --purple: #a78bfa;
  --cyan:   #22d3ee;

  --t1: #e8eeff;
  --t2: #7a8fb0;
  --t3: #3a5075;
  --t4: #1e2d45;

  font-family: 'Outfit', sans-serif;
}

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body { background:var(--canvas); color:var(--t1); min-height:100dvh; -webkit-font-smoothing:antialiased; }

::-webkit-scrollbar        { width:4px; height:4px; }
::-webkit-scrollbar-track  { background:transparent; }
::-webkit-scrollbar-thumb  { background:var(--s5); border-radius:99px; }

@keyframes up   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes in   { from{opacity:0} to{opacity:1} }
@keyframes bob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes spin { to{transform:rotate(360deg)} }
@keyframes glow { 0%,100%{opacity:.6} 50%{opacity:1} }
@keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

.fx-up   { animation:up  .5s cubic-bezier(.22,.68,0,1.1) both; }
.fx-in   { animation:in  .3s ease both; }
.fx-bob  { animation:bob 6s ease-in-out infinite; }
.d1 { animation-delay:.08s; } .d2 { animation-delay:.16s; }
.d3 { animation-delay:.24s; } .d4 { animation-delay:.32s; }

.grad {
  background:linear-gradient(130deg,#7b8fff 0%,#a78bfa 60%,#c084fc 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.grad-move {
  background:linear-gradient(130deg,#7b8fff,#c084fc,#7b8fff,#a78bfa);
  background-size:300% auto;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation:shimmer 5s linear infinite;
}
`

const style = document.createElement('style')
style.textContent = css
document.head.appendChild(style)

export {}
