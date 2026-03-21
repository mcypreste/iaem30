const SB_URL = 'https://ihylwxjxjajtdhsnlrfm.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWx3eGp4amFqdGRoc25scmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDQyNjYsImV4cCI6MjA4OTA4MDI2Nn0.CVVtGeSrg47hSm_WKX-EaQhzaUilrLXhKZnKdJkzepY';

export default async function handler(req, res) {
  const slug = req.query.slug;
  if (!slug) return res.status(404).send('Not found');

  // Busca dados da página no Supabase
  const r = await fetch(`${SB_URL}/rest/v1/iaem30_personal_pages?slug=eq.${slug}&select=*`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
  });
  const rows = await r.json();
  const page = rows?.[0];

  if (!page) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    return res.status(404).send(notFoundHtml());
  }

  if (new Date(page.expires_at) < new Date()) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    return res.status(200).send(expiredHtml());
  }

  // Incrementa views
  fetch(`${SB_URL}/rest/v1/iaem30_personal_pages?slug=eq.${slug}`, {
    method: 'PATCH',
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ views: (page.views || 0) + 1 })
  });

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).send(buildPage(page));
}

function buildPage(page) {
  const first    = (page.name || '').split(' ')[0] || 'Visitante';
  const discount = page.discount_percent || 15;
  const final    = (19.90 * (1 - discount / 100)).toFixed(2).replace('.', ',');
  const expires  = page.expires_at;
  const coupon   = page.coupon_code || '';
  const slug     = page.slug || '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Oferta especial para ${first} — IA em 30 Dias</title>
<meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#060608;color:#f0ecff;font-family:'DM Sans',sans-serif;min-height:100vh}
a{color:inherit;text-decoration:none}
.hero{background:linear-gradient(160deg,#0d0520 0%,#060608 55%);padding:0 24px 60px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(124,92,252,.18) 0%,transparent 70%);pointer-events:none}
.logo{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;padding:28px 0;text-align:center;letter-spacing:-.02em}
.logo em{color:#a78bfa;font-style:normal}
.badge{display:inline-flex;align-items:center;gap:6px;background:rgba(124,92,252,.15);border:1px solid rgba(124,92,252,.3);color:#a78bfa;border-radius:100px;padding:6px 16px;font-size:12px;font-weight:600;letter-spacing:.05em;margin-bottom:20px}
.hero-inner{max-width:640px;margin:0 auto;text-align:center;padding-top:40px}
.hello{font-size:16px;color:#7c6a9a;margin-bottom:12px}
h1{font-family:'Syne',sans-serif;font-size:clamp(30px,5vw,50px);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin-bottom:20px}
h1 .hl{background:linear-gradient(135deg,#a78bfa,#67e8f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{font-size:16px;color:#6b6090;line-height:1.75;max-width:500px;margin:0 auto 32px}
.timer-box{display:inline-flex;align-items:center;gap:8px;background:rgba(244,63,94,.1);border:1px solid rgba(244,63,94,.25);border-radius:10px;padding:10px 20px;margin-bottom:36px}
.tdot{width:8px;height:8px;border-radius:50%;background:#f43f5e;animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
.ttxt{font-size:13px;color:#f43f5e;font-weight:600;font-family:'Syne',sans-serif}
.price-card{background:linear-gradient(135deg,rgba(16,185,129,.1),rgba(16,185,129,.04));border:1px solid rgba(16,185,129,.25);border-radius:20px;padding:28px 32px;max-width:380px;margin:0 auto 28px}
.plabel{font-size:11px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}
.prow{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:10px}
.pold{font-size:17px;color:#4a4060;text-decoration:line-through}
.pnew{font-family:'Syne',sans-serif;font-size:44px;font-weight:800;color:#10b981;letter-spacing:-.03em}
.cpn-box{background:rgba(124,92,252,.12);border:1.5px dashed rgba(124,92,252,.4);border-radius:12px;padding:14px 20px;margin-top:14px}
.cpn-label{font-size:10px;color:#7c6a9a;text-transform:uppercase;letter-spacing:.12em;margin-bottom:5px}
.cpn-code{font-family:monospace;font-size:22px;font-weight:700;color:#a78bfa;letter-spacing:.1em}
.cpn-hint{font-size:11px;color:#5a5278;margin-top:4px}
.cta{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#7c5cfc,#5b35db);color:#fff;padding:17px 40px;border-radius:14px;font-family:'Syne',sans-serif;font-size:17px;font-weight:700;letter-spacing:-.02em;box-shadow:0 12px 32px rgba(124,92,252,.4);transition:all .2s;border:none;cursor:pointer}
.cta:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(124,92,252,.5)}
.trust{display:flex;gap:24px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.ti{display:flex;align-items:center;gap:6px;font-size:13px;color:#3d3558}
.sec{max-width:640px;margin:56px auto;padding:0 24px}
.sec h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;margin-bottom:20px;letter-spacing:-.02em}
.feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.feat{background:#0e0c18;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px;display:flex;gap:12px}
.fi{font-size:22px;flex-shrink:0}
.ft{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;margin-bottom:3px}
.fd{font-size:12px;color:#4a4060;line-height:1.5}
.tgrid{display:grid;gap:12px}
.tc{background:#0e0c18;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px}
.tc .stars{color:#f59e0b;margin-bottom:8px;font-size:14px}
.tc .txt{font-size:14px;color:#7c6a9a;line-height:1.7;margin-bottom:10px;font-style:italic}
.tc .auth{font-size:12px;font-weight:600;color:#5a5278}
.cta-bottom{text-align:center;padding:52px 24px;border-top:1px solid rgba(255,255,255,.05);background:linear-gradient(135deg,rgba(124,92,252,.07),rgba(6,182,212,.03))}
.cta-bottom h2{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;margin-bottom:8px;letter-spacing:-.02em}
.cta-bottom p{color:#6b6090;margin-bottom:28px;font-size:15px}
footer{text-align:center;padding:24px;font-size:11px;color:#2a2840}
footer a{color:#3d3558}
@media(max-width:600px){.feat-grid{grid-template-columns:1fr}.pnew{font-size:36px}}
</style>
</head>
<body>
<div class="hero">
  <div class="logo">IA em <em>30</em> Dias</div>
  <div class="hero-inner">
    <div class="badge">🎁 Oferta exclusiva · Só para você</div>
    <div class="hello">Olá, ${first}!</div>
    <h1>Uma página criada <span class="hl">exclusivamente para você</span></h1>
    <p class="sub">Percebemos que você demonstrou interesse no ebook IA em 30 Dias. Por isso preparamos uma oferta especial que só você tem acesso.</p>
    <div class="timer-box">
      <div class="tdot"></div>
      <span class="ttxt" id="timer">⏰ Calculando...</span>
    </div>
    <div class="price-card">
      <div class="plabel">💰 Seu preço exclusivo</div>
      <div class="prow">
        <span class="pold">R$19,90</span>
        <span class="pnew">R$${final}</span>
      </div>
      <div style="font-size:12px;color:#059669;margin-bottom:2px">${discount}% de desconto só para você</div>
      <div class="cpn-box">
        <div class="cpn-label">Seu cupom pessoal</div>
        <div class="cpn-code">${coupon}</div>
        <div class="cpn-hint">Aplique no checkout · Válido por 48h · Uso único</div>
      </div>
    </div>
    <a href="https://go.perfectpay.com.br/PPU38CQ4TBC?coupon=VIP15" class="cta" onclick="trackClick()" target="_blank" rel="noopener">
      ➤ Garantir com ${discount}% de desconto
    </a>
    <div class="trust">
      <div class="ti">🔒 Compra segura</div>
      <div class="ti">🛡️ Garantia 7 dias</div>
      <div class="ti">⚡ Download imediato</div>
    </div>
  </div>
</div>

<div class="sec">
  <h2>O que está incluso</h2>
  <div class="feat-grid">
    <div class="feat"><div class="fi">📚</div><div><div class="ft">180+ páginas práticas</div><div class="fd">Do zero ao avançado com exemplos reais</div></div></div>
    <div class="feat"><div class="fi">🛠️</div><div><div class="ft">Ferramentas passo a passo</div><div class="fd">ChatGPT, Midjourney, Suno, CapCut IA</div></div></div>
    <div class="feat"><div class="fi">📅</div><div><div class="ft">Plano de 30 dias</div><div class="fd">Tarefas diárias para sair do zero</div></div></div>
    <div class="feat"><div class="fi">💰</div><div><div class="ft">7 formas de monetizar</div><div class="fd">TikTok Shop, produtos digitais e mais</div></div></div>
    <div class="feat"><div class="fi">🎁</div><div><div class="ft">3 bônus exclusivos</div><div class="fd">100 prompts, guia de ferramentas</div></div></div>
    <div class="feat"><div class="fi">🛡️</div><div><div class="ft">Garantia de 7 dias</div><div class="fd">Não gostou? Reembolso 100%</div></div></div>
  </div>
</div>

<div class="sec">
  <h2>O que dizem os leitores</h2>
  <div class="tgrid">
    <div class="tc"><div class="stars">★★★★★</div><div class="txt">"Comecei do zero e em 3 semanas já estava vendendo artes digitais no Instagram. Investimento que se pagou em dias!"</div><div class="auth">Ana S. — Ilustradora Digital</div></div>
    <div class="tc"><div class="stars">★★★★★</div><div class="txt">"Como músico, achei que IA ia me substituir. Esse ebook mostrou como usar como aliada. R$1.800 no primeiro mês!"</div><div class="auth">Carlos M. — Produtor Musical</div></div>
    <div class="tc"><div class="stars">★★★★★</div><div class="txt">"A parte de monetização foi um divisor de águas. Hoje faturei mais em 1 semana do que em 1 mês antes."</div><div class="auth">Juliana R. — Designer Gráfica</div></div>
  </div>
</div>

<div class="cta-bottom">
  <h2>Esta oferta expira em breve, ${first}</h2>
  <p>Use seu cupom <strong style="color:#a78bfa;font-family:monospace">${coupon}</strong> antes que expire.</p>
  <a href="https://go.perfectpay.com.br/PPU38CQ4TBC?coupon=VIP15" class="cta" onclick="trackClick()" target="_blank" rel="noopener" style="display:inline-flex">
    Garantir meu ebook agora →
  </a>
  <div class="trust" style="margin-top:16px">
    <div class="ti">🔒 Compra segura</div>
    <div class="ti">🛡️ Garantia 7 dias</div>
    <div class="ti">⚡ Download imediato</div>
  </div>
</div>

<footer>© 2026 IA em 30 Dias · <a href="https://iaem30.com.br/privacidade">Privacidade</a> · <a href="https://iaem30.com.br">iaem30.com.br</a></footer>

<script>
const exp = new Date('${expires}');
function tick(){
  const d = exp - Date.now();
  if(d<=0){document.getElementById('timer').textContent='Oferta expirada';return;}
  const h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000),s=Math.floor((d%60000)/1000);
  document.getElementById('timer').textContent='Expira em: '+String(h).padStart(2,'0')+'h '+String(m).padStart(2,'0')+'m '+String(s).padStart(2,'0')+'s';
}
setInterval(tick,1000);tick();
function trackClick(){
  fetch('${SB_URL}/rest/v1/iaem30_personal_pages?slug=eq.${slug}',{
    method:'PATCH',
    headers:{'apikey':'${SB_KEY}','Content-Type':'application/json','Prefer':'return=minimal'},
    body:JSON.stringify({converted:true})
  }).catch(function(){});
}
</script>
</body></html>`;
}

function notFoundHtml() {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"></head><body style="background:#060608;color:#f0ecff;font-family:sans-serif;text-align:center;padding:80px 24px"><h2>Página não encontrada</h2><p style="color:#7c6a9a;margin:12px 0 24px">Este link não existe ou foi removido.</p><a href="https://iaem30.com.br" style="display:inline-block;background:#7c5cfc;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700">← Ver o ebook</a></body></html>`;
}

function expiredHtml() {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"></head><body style="background:#060608;color:#f0ecff;font-family:sans-serif;text-align:center;padding:80px 24px"><h2>Esta oferta expirou</h2><p style="color:#7c6a9a;margin:12px 0 24px">Mas você ainda pode garantir o ebook pelo preço normal.</p><a href="https://iaem30.com.br" style="display:inline-block;background:#7c5cfc;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700">Ver o ebook →</a></body></html>`;
}
