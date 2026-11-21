import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(source);
const output = path.join(root, 'dist');
const production = process.env.SAHIUM_PRODUCTION === '1';
const origin = process.env.SAHIUM_SITE_URL;
if (production && !origin) throw new Error('Defina SAHIUM_SITE_URL com o endereço público aprovado.');
if (origin && !/^https:\/\//.test(origin)) throw new Error('SAHIUM_SITE_URL deve usar HTTPS.');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const profiles = JSON.parse(await fs.readFile(path.join(source, 'profiles.json'), 'utf8'));
export const areas = [
  ['condominial', 'Direito Condominial', 'Apoio jurídico à vida em condomínio.', 'Assessoria a síndicos e administradoras em assembleias, convenções, regimentos internos, cobrança de taxas condominiais e conflitos entre condôminos.', ['Assembleias e convenções', 'Regimentos internos', 'Taxas condominiais e conflitos']],
  ['imobiliario', 'Direito Imobiliário', 'Orientação em cada etapa de uma relação imobiliária.', 'Orientação em compra, venda, locação e regularização de imóveis, com análise de contratos e atuação em disputas imobiliárias.', ['Compra, venda e locação', 'Regularização de imóveis', 'Contratos e disputas imobiliárias']],
  ['negocios', 'Advocacia de Negócios', 'O Direito no contexto das decisões da empresa.', 'Consultoria e representação jurídica em questões empresariais, com apoio na elaboração e revisão de contratos e na prevenção de conflitos.', ['Consultoria empresarial', 'Elaboração e revisão de contratos', 'Representação jurídica']],
  ['patrimonial', 'Planejamento Patrimonial e Sucessório', 'Organização jurídica do patrimônio e de sua continuidade.', 'Orientação na organização do patrimônio e no planejamento da transferência de bens, considerando as particularidades de cada situação.', ['Organização patrimonial', 'Planejamento da transferência de bens']],
  ['agrarios', 'Contratos Agrários', 'Atenção às relações jurídicas no campo.', 'Elaboração, revisão e negociação de arrendamentos, parcerias rurais e contratos de compra e venda de terras.', ['Arrendamentos', 'Parcerias rurais', 'Compra e venda de terras']],
  ['mulheres', 'Advocacia para Mulheres', 'Orientação jurídica em questões que afetam as mulheres.', 'Atuação em questões de direitos civis, familiares e trabalhistas, além de casos de violência de gênero.', ['Direitos civis e familiares', 'Questões trabalhistas', 'Violência de gênero']],
  ['multidisciplinares', 'Soluções Multidisciplinares', 'Um olhar integrado para demandas que se conectam.', 'Atuação integrada quando a demanda envolve diferentes áreas do Direito. O escritório também atua em recuperação judicial e Direito Administrativo.', ['Recuperação judicial', 'Direito Administrativo', 'Demandas que envolvem diferentes áreas']],
];
const posts = [
  ['instagram-1.webp', 'Direito imobiliário', 'Certidão de conclusão de obra', 'https://www.instagram.com/p/DfATvrLJ6i0/'],
  ['instagram-3.webp', 'Direito imobiliário', 'Atraso de obra, distrato e rescisão', 'https://www.instagram.com/p/DegDDT2I8ag/'],
  ['instagram-6.webp', 'Direito imobiliário', 'Entrega de chaves e obrigações da construtora', 'https://www.instagram.com/reel/DdXKl8lJXS5/'],
  ['instagram-4.webp', 'Solução de conflitos', 'Acesso à justiça e solução de conflitos', 'https://www.instagram.com/p/Dea6KM4oUDa/'],
  ['instagram-5.webp', 'Arbitragem', '30 anos da Lei de Arbitragem', 'https://www.instagram.com/p/DdpKtVopvjr/'],
  ['instagram-2.webp', 'Institucional', 'Aniversário de Goiânia', 'https://www.instagram.com/p/De4XAKCx5mN/'],
];
const external = 'target="_blank" rel="noopener noreferrer"';
const map = 'https://www.google.com/maps/search/?api=1&amp;query=Condom%C3%ADnio%20Absolut%20Business%20Style%2C%20Goi%C3%A2nia';
const mark = (base, light = false) => `<img src="${base}assets/${light ? 'marca-clara' : 'marca'}.webp" width="520" height="105" alt="Sahium Advogados">`;
const route = (base, name) => name ? `${base}${name}/` : base;
function nav(base, current) {
  const items = [['atuacao', 'Atuação'], ['quem-somos', 'O escritório'], ['', 'Profissionais', '#equipe'], ['publicacoes', 'Publicações']];
  return items.map(([slug, label, hash]) => `<a href="${route(base, slug)}${hash || ''}"${current === slug && !hash ? ' aria-current="page"' : ''}>${label}</a>`).join('');
}
function header(base, current) {
  return `<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
  <header class="site-header"><div class="shell header-inner">
    <a class="brand" href="${base}" aria-label="Sahium Advogados — início">${mark(base)}</a>
    <nav class="desktop-nav" aria-label="Navegação principal">${nav(base, current)}</nav>
    <a class="header-contact" href="${base}#contato">Contato</a>
    <details class="mobile-menu"><summary>Menu <span class="menu-lines" aria-hidden="true"></span></summary>
      <nav aria-label="Navegação móvel">${nav(base, current)}<a href="${base}#contato">Contato</a></nav>
    </details>
  </div></header>`;
}
function footer(base) {
  return `<footer class="site-footer"><div class="shell">
    <div class="footer-top"><a class="brand" href="${base}">${mark(base, true)}</a><p>Advocacia em Goiânia.<br>Imóveis, condomínios e negócios.</p><a class="text-link light" href="${base}#contato">Contato com o escritório</a></div>
    <div class="footer-bottom"><div><p>Carla Sahium · OAB/GO 18.198<br>Jefferson Coelho Lopes · OAB/GO 24.627</p><p>CNPJ 17.109.154/0001-19</p></div>
    <nav aria-label="Redes sociais"><a href="https://www.instagram.com/sahiumadvogados/" ${external}>Instagram</a><a href="https://www.linkedin.com/company/sahiumadvogados/" ${external}>LinkedIn</a><a href="https://www.facebook.com/sahiumadvogados" ${external}>Facebook</a></nav>
    <div><a href="${base}privacidade/">Privacidade e canais digitais</a><p>© Sahium Advogados.</p></div></div>
  </div></footer>`;
}
function contact(base, full = false) {
  if (!full) return `<section class="contact-band"><div class="shell"><div><p class="eyebrow">CONTATO</p><h2>Converse com o escritório.</h2></div><a class="button pale" href="${base}#contato">Canais de atendimento</a></div></section>`;
  return `<section class="contact-section section" id="contato" aria-labelledby="contact-title"><div class="shell contact-grid">
    <div><p class="eyebrow">CONTATO</p><h2 id="contact-title">O primeiro passo<br>é uma conversa.</h2><p class="contact-intro">Entre em contato para informações sobre o atendimento. A equipe orienta os próximos passos conforme o assunto.</p>
    <dl class="contact-info"><div><dt>Telefone</dt><dd><a href="tel:+556240088900">(62) 4008-8900</a></dd></div><div><dt>E-mail</dt><dd><a href="mailto:contato@carlasahium.adv.br">contato@carlasahium.adv.br</a></dd></div><div><dt>Escritório</dt><dd><a href="${map}" ${external}>Condomínio Absolut Business Style<br>Goiânia, Goiás</a></dd></div><div><dt>Atendimento</dt><dd>Segunda a sexta, das 8h às 18h</dd></div></dl></div>
    <div class="contact-compose"><p class="eyebrow">ATENDIMENTO PELO WHATSAPP</p><h3>Qual é o assunto?</h3><p class="contact-instructions">Escolha uma opção para preparar sua mensagem.</p><noscript><p>Inicie o contato diretamente pelo botão do WhatsApp abaixo.</p></noscript><label for="contact-topic">Assunto do contato</label>
    <select id="contact-topic"><option value="geral">Informações sobre o atendimento</option><option value="cliente">Já sou cliente</option><option value="debito">Débito condominial</option>${areas.map(a => `<option value="${a[0]}">${a[1]}</option>`).join('')}<option value="outro">Outro assunto</option></select>
    <p class="message-label">MENSAGEM INICIAL</p><p class="message-preview" id="message-preview" aria-live="polite">Olá! Gostaria de informações sobre o atendimento da Sahium Advogados.</p>
    <a class="button green" id="whatsapp-link" href="https://wa.me/5562993355808" ${external}>Continuar no WhatsApp</a><p class="fine-print">Abre um serviço externo. Você poderá revisar a mensagem antes de enviar. Não envie documentos ou dados sensíveis neste primeiro contato.</p><a class="subtle-link" href="${base}privacidade/">Sobre os canais digitais</a></div>
  </div></section>`;
}
function postGrid(base, count = posts.length) {
  return `<div class="post-grid">${posts.slice(0, count).map(([image, category, title, link]) => `<article class="post"><a href="${link}" ${external}><div class="post-image"><img src="${base}assets/${image}" alt="" loading="lazy" width="600" height="600"></div><p class="eyebrow">${category}</p><h3>${title}</h3><span class="post-action">Ler no Instagram<span class="sr-only"> (abre nova aba)</span></span></a></article>`).join('')}</div>`;
}
function team(base, expanded = false) {
  return `<div class="team-grid">
    <article class="person-card"><a href="${base}carla-sahium/" class="person-image"><img src="${base}assets/carla.webp" width="1049" height="1500" alt="Carla Sahium" loading="lazy"></a><div class="person-caption"><p class="eyebrow">SÓCIA FUNDADORA</p><h3><a href="${base}carla-sahium/">Carla Sahium</a></h3><p class="registration">OAB/GO 18.198</p><p>Direito Imobiliário, mediação e arbitragem.</p><a class="text-link" href="${base}carla-sahium/">Trajetória e publicações</a></div></article>
    <article class="person-card" id="jefferson-lopes"><a href="${base}jefferson-lopes/" class="person-image"><img src="${base}assets/jefferson.webp" width="1049" height="1500" alt="Jefferson Coelho Lopes" loading="lazy"></a><div class="person-caption"><p class="eyebrow">SÓCIO</p><h3><a href="${base}jefferson-lopes/">Jefferson Coelho Lopes</a></h3><p class="registration">OAB/GO 24.627</p><p>Direito Tributário, Imobiliário e Administrativo.</p><a class="text-link" href="${base}jefferson-lopes/">Trajetória e atuação</a></div></article>
  </div>${expanded ? `<p class="team-note">Conheça os percursos profissionais e as publicações nos perfis individuais.</p>` : ''}`;
}
function accordion(title, body, id, heading = 'h3') {
  return `<article class="t-acc" data-open="true"><${heading}><button class="t-acc-head" type="button" disabled id="${id}-button" aria-controls="${id}-panel" aria-expanded="true">${title}<span class="t-acc-chevron" aria-hidden="true"><svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m3 6 5 5 5-5"/></svg></span></button></${heading}><div class="t-acc-panel" id="${id}-panel"><div class="t-acc-panel-inner"><div class="accordion-copy">${body}</div></div></div></article>`;
}
function home() {
  const base = './';
  return `<section class="hero" aria-labelledby="home-title"><div class="shell hero-grid">
    <div class="hero-copy"><p class="eyebrow">SAHIUM ADVOGADOS · GOIÂNIA</p><h1 id="home-title">Imóveis, negócios<br>e relações que<br>pedem <em>clareza.</em></h1><p class="hero-description">Assessoria jurídica em questões imobiliárias, condominiais e empresariais. Atenção aos documentos, às pessoas e ao contexto de cada decisão.</p><div class="hero-actions"><a class="button pale" href="atuacao/">Conheça nossa atuação</a><a class="hero-link" href="#contato">Contato com o escritório</a></div></div>
    <figure class="hero-portrait"><div class="portrait-rule" aria-hidden="true"></div><img src="assets/carla.webp" width="1049" height="1500" alt="Carla Sahium, sócia fundadora do escritório" fetchpriority="high"><figcaption><span>Carla Sahium</span><span>Sócia fundadora · OAB/GO 18.198</span></figcaption></figure>
  </div><div class="hero-bottom shell"><p>Direito Imobiliário · Direito Condominial · Advocacia de Negócios</p><span>Orientação. Prevenção. Resolução.</span></div></section>
  <section class="section practices" id="atuacao" aria-labelledby="practice-title"><div class="shell"><div class="section-heading"><div><p class="eyebrow">ÁREAS DE ATUAÇÃO</p><h2 id="practice-title">O Direito acompanha<br>as suas relações.</h2></div><p>Do cotidiano de um condomínio à organização de um patrimônio, cada assunto pede uma análise própria.</p></div>
    <div class="practice-list">${areas.map(([id, title, lead, text]) => accordion(title, `<p>${text}</p><a class="text-link" href="atuacao/#${id}">Conhecer esta área</a>`, `home-${id}`)).join('')}</div>
  </div></section>
  <section class="office-story section" aria-labelledby="office-title"><div class="shell office-grid"><figure class="office-image"><img src="assets/entrada-sahium.webp" width="1500" height="987" alt="Entrada do escritório Sahium Advogados em Goiânia" loading="lazy"><figcaption>O escritório · Goiânia, Goiás</figcaption></figure><div class="office-copy"><p class="eyebrow">O ESCRITÓRIO</p><h2 id="office-title">A técnica encontra<br>o diálogo.</h2><p>A Sahium Advogados assessora empresas, condomínios e pessoas em decisões que envolvem imóveis, contratos e patrimônio.</p><p>A análise dos documentos e dos riscos orienta o trabalho. Negociação, mediação, arbitragem e atuação judicial são caminhos avaliados conforme cada situação.</p><a class="text-link" href="quem-somos/">Conheça o escritório</a></div></div></section>
  <section class="section team-section" id="equipe" aria-labelledby="team-title"><div class="shell"><div class="section-heading"><div><p class="eyebrow">PROFISSIONAIS</p><h2 id="team-title">Pessoas à frente<br>de cada questão.</h2></div><p>Conheça a formação e a atuação dos sócios que integram o escritório.</p></div>${team(base)}</div></section>
  <section class="editorial-band"><div class="shell"><p class="eyebrow">NEGOCIAÇÃO, MEDIAÇÃO E ARBITRAGEM</p><h2>Antes de escolher um caminho,<br>é preciso compreender <em>o conflito.</em></h2><div><p>A avaliação jurídica considera os métodos de resolução adequados ao caso, tanto na prevenção quanto no tratamento de disputas.</p><a class="text-link light" href="quem-somos/#abordagem">Nossa forma de atuação</a></div></div></section>
  <section class="section publications" aria-labelledby="publications-title"><div class="shell"><div class="section-heading"><div><p class="eyebrow">PUBLICAÇÕES</p><h2 id="publications-title">Direito em perspectiva.</h2></div><a class="text-link" href="publicacoes/">Ver todas as publicações</a></div>${postGrid(base, 3)}</div></section>
  <section class="section faq-section" id="faq" aria-labelledby="faq-title"><div class="shell faq-grid"><div><p class="eyebrow">ATENDIMENTO</p><h2 id="faq-title">Antes do<br>primeiro contato.</h2><p>Informações para orientar sua conversa com a equipe.</p></div><div class="faq-list">${[
    ['Como posso entrar em contato?', 'Você pode usar o telefone, o e-mail ou o WhatsApp indicados nesta página. No primeiro contato, descreva brevemente o assunto para que a equipe oriente o atendimento.'],
    ['Quais documentos devo separar?', 'Os documentos necessários variam conforme o assunto. A equipe indica o que é relevante depois de compreender a demanda. Aguarde essa orientação antes de enviar documentos ou dados sensíveis.'],
    ['Preciso ir ao escritório para iniciar o atendimento?', 'O primeiro contato pode ser feito por telefone ou WhatsApp. A equipe orienta se será necessário agendar uma reunião.'],
    ['Como tratar de um débito condominial?', 'No contato por WhatsApp, escolha a opção “Débito condominial”. A equipe orienta como identificar o débito e consultar as opções disponíveis.'],
    ['Já sou cliente. Como peço uma atualização?', 'Selecione “Já sou cliente” no contato por WhatsApp ou ligue para o escritório para falar com a equipe sobre seu atendimento.'],
  ].map(([q, a], i) => accordion(q, `<p>${a}</p>`, `faq-${i}`)).join('')}</div></div></section>
  ${contact(base, true)}`;
}
function pageIntro(eyebrow, title, text) {
  return `<section class="page-intro"><div class="shell"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${text ? `<p class="intro-text">${text}</p>` : ''}</div></section>`;
}
function practicePage(base) {
  return `${pageIntro('ÁREAS DE ATUAÇÃO', 'Cada relação,<br>uma análise jurídica.', 'Conheça os assuntos atendidos pelo escritório e as formas de atuação em questões imobiliárias, condominiais, empresariais e patrimoniais.')}
  <div class="shell practice-directory"><nav aria-label="Índice de áreas de atuação" class="area-index">${areas.map(a => `<a href="#${a[0]}">${a[1]}</a>`).join('')}</nav><div class="area-articles">${areas.map(([id,title,lead,text,topics]) => `<section id="${id}" class="area-article"><p class="eyebrow">${title}</p><h2>${lead}</h2><p>${text}</p><ul>${topics.map(t=>`<li>${t}</li>`).join('')}</ul><a class="text-link" data-contact-topic="${id}" href="${base}#contato">Contato sobre este assunto</a></section>`).join('')}</div></div>${contact(base)}`;
}
function officePage(base) {
  return `${pageIntro('O ESCRITÓRIO', 'O contexto importa.<br>As pessoas, também.', 'Em Goiânia, a Sahium Advogados reúne atuação consultiva e representação jurídica para empresas, condomínios e pessoas.')}
  <div class="shell office-wide"><img src="${base}assets/entrada-sahium.webp" width="1500" height="987" alt="Entrada do escritório Sahium Advogados" fetchpriority="high"></div>
  <section class="section shell text-split" id="abordagem"><div><p class="eyebrow">NOSSA FORMA DE ATUAÇÃO</p><h2>Compreender.<br> Orientar.<br> Atuar.</h2></div><div class="prose"><p>O trabalho começa pela análise dos documentos e dos riscos de cada decisão. O escritório assessora síndicos, administradoras, associações, empresas e pessoas em questões que envolvem imóveis, contratos e patrimônio.</p><p>Na gestão de condomínios, a equipe orienta sobre convenções, regimentos, assembleias e cobrança de taxas. Em negócios imobiliários, acompanha operações de compra, venda e locação, revisão de contratos e regularização de imóveis.</p><p>Quando surge um conflito, os caminhos são avaliados conforme o caso: negociação, mediação, arbitragem ou atuação judicial. A equipe também atua em recuperação judicial e questões de Direito Administrativo.</p><a class="text-link" href="${base}atuacao/">Conheça as áreas de atuação</a></div></section>
  <section class="section team-section" id="socios"><div class="shell"><div class="section-heading"><div><p class="eyebrow">PROFISSIONAIS</p><h2>Os sócios.</h2></div></div>${team(base, true)}</div></section>
  <section class="section shell affiliations" id="filiacoes"><div class="section-heading"><div><p class="eyebrow">RELAÇÕES INSTITUCIONAIS</p><h2>Filiações do escritório.</h2></div></div><dl>${[['CONIMA','Conselho Nacional das Instituições de Mediação e Arbitragem'],['IBRADIM','Instituto Brasileiro de Direito Imobiliário'],['CBAr','Comitê Brasileiro de Arbitragem'],['IBDiC','Instituto Brasileiro de Direito da Construção'],['TMA','Turnaround Management Association']].map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl></section>${contact(base)}`;
}
function profilePage(base, slug) {
  const carla = slug === 'carla-sahium';
  return `<section class="profile-top"><div class="shell profile-grid"><aside><a class="back-link" href="${base}quem-somos/#socios">Voltar aos profissionais</a><div class="profile-photo"><img src="${base}assets/${carla ? 'carla' : 'jefferson'}.webp" width="1049" height="1500" alt="${carla ? 'Carla Sahium' : 'Jefferson Coelho Lopes'}" fetchpriority="high"></div><p class="eyebrow">${carla ? 'SÓCIA FUNDADORA' : 'SÓCIO'}</p><p class="registration">OAB/GO ${carla ? '18.198' : '24.627'}</p></aside><div class="profile-content">${profiles[slug].replace(/href="\.\.\//g, `href="${base}`)}</div></div></section>${contact(base)}`;
}
function privacyPage(base) {
  return `${pageIntro('CANAIS DIGITAIS', 'Privacidade<br>no primeiro contato.', 'Como esta versão do website funciona e o que acontece ao acessar nossos canais de atendimento.')}
  <article class="shell prose legal-copy"><h2>Navegação no site</h2><p>Esta implementação não inclui cadastro, formulário de coleta de dados, ferramentas de analytics ou cookies de rastreamento. As fontes e imagens são servidas com o próprio site. A infraestrutura de hospedagem pode processar dados técnicos necessários ao acesso, conforme as regras do provedor utilizado.</p><h2>Telefone, e-mail e WhatsApp</h2><p>Os botões de contato abrem o aplicativo ou serviço correspondente. Ao selecionar um assunto, a mensagem é preparada no seu navegador e só será enviada se você confirmar o envio no WhatsApp. Este site não armazena o assunto selecionado nem a mensagem.</p><p>No primeiro contato, indique apenas o tema geral. Aguarde a orientação da equipe antes de compartilhar documentos ou dados sensíveis. Os serviços externos possuem suas próprias regras de privacidade.</p><h2>Redes sociais e localização</h2><p>Links para Instagram, LinkedIn, Facebook e Google Maps levam a plataformas externas. Nenhum conteúdo dessas plataformas é incorporado ou carregado automaticamente nesta implementação.</p><h2>Dúvidas sobre seus dados</h2><p>Para obter informações sobre o tratamento de dados no atendimento do escritório, entre em contato pelo e-mail <a href="mailto:contato@carlasahium.adv.br">contato@carlasahium.adv.br</a>. Esta página descreve o funcionamento do website e não substitui informações específicas sobre o tratamento posterior em outros canais.</p><h2>Informação institucional</h2><p>O conteúdo é informativo. As áreas apresentadas e as publicações não substituem a análise individual de uma situação jurídica.</p><a class="text-link" href="${base}#contato">Canais de atendimento</a></article>`;
}
export const pages = [
  ['', 'Sahium Advogados | Carla Sahium · Goiânia', 'Assessoria jurídica em Direito Imobiliário, Condominial e Advocacia de Negócios em Goiânia. Conheça o escritório, seus profissionais e áreas de atuação.', home],
  ['atuacao', 'Áreas de atuação | Sahium Advogados', 'Conheça a atuação em condomínios, imóveis, negócios, patrimônio, contratos agrários e direitos das mulheres.', practicePage],
  ['quem-somos', 'O escritório | Sahium Advogados', 'Conheça a Sahium Advogados, sua forma de atuação em Goiânia, seus sócios e filiações institucionais.', officePage],
  ['carla-sahium', 'Carla Sahium Traboulsi | Sahium Advogados', 'Trajetória, formação e publicações de Carla Sahium Traboulsi, sócia fundadora. OAB/GO 18.198.', base=>profilePage(base,'carla-sahium')],
  ['jefferson-lopes', 'Jefferson Coelho Lopes | Sahium Advogados', 'Conheça a atuação profissional de Jefferson Coelho Lopes, sócio da Sahium Advogados. OAB/GO 24.627.', base=>profilePage(base,'jefferson-lopes')],
  ['publicacoes', 'Publicações | Sahium Advogados', 'Publicações do escritório sobre Direito Imobiliário, mediação, arbitragem e assuntos institucionais.', base=>`${pageIntro('PUBLICAÇÕES', 'O Direito, mais perto<br>do cotidiano.', 'Uma seleção do acervo de publicações do escritório. Os conteúdos completos estão nos canais originais.') }<section class="section shell">${postGrid(base)}<div class="archive-note"><p>Acervo do site anterior. As publicações refletem o contexto de sua edição e não substituem orientação jurídica individual.</p><a class="text-link" href="https://www.instagram.com/sahiumadvogados/" ${external}>Acompanhar o Instagram</a></div></section>${contact(base)}`],
  ['privacidade', 'Privacidade e canais digitais | Sahium Advogados', 'Informações sobre o funcionamento do website e o acesso aos canais digitais da Sahium Advogados.', privacyPage],
];
function document(slug, title, description, body) {
  const base = slug ? '../' : './';
  const absolute = origin ? new URL(slug ? `${slug}/` : './', origin.endsWith('/') ? origin : `${origin}/`).href : null;
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#102a23"><meta name="robots" content="${production ? 'index,follow' : 'noindex,nofollow'}"><title>${esc(title)}</title><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Sahium Advogados">${absolute ? `<link rel="canonical" href="${absolute}"><meta property="og:url" content="${absolute}"><meta property="og:image" content="${new URL('assets/share.jpg',origin.endsWith('/')?origin:`${origin}/`).href}">` : ''}<link rel="icon" href="${base}assets/favicon.png" type="image/png"><link rel="preload" href="${base}assets/fonts/cormorant-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${base}site.css"><noscript><style>.contact-instructions,.contact-compose label,.contact-compose select,.message-label,.message-preview{display:none}.t-acc-head:disabled{cursor:default}</style></noscript><script src="${base}site.js" defer></script></head>
<body class="${slug ? 'inner-page' : 'home-page'}">${header(base,slug)}<main id="conteudo" tabindex="-1">${body(base)}</main>${footer(base)}</body></html>`;
}
await fs.mkdir(output, {recursive:true});
await fs.cp(path.join(root,'assets'),path.join(output,'assets'),{recursive:true});
await fs.cp(path.join(source,'fonts'),path.join(output,'assets/fonts'),{recursive:true});
for (const name of ['site.css','site.js']) await fs.copyFile(path.join(source,name),path.join(output,name));
for (const [slug,title,description,body] of pages) {
  const directory = path.join(output,slug);
  await fs.mkdir(directory,{recursive:true});
  await fs.writeFile(path.join(directory,'index.html'),document(slug,title,description,body));
}
await fs.writeFile(path.join(output,'.nojekyll'),'');
await fs.writeFile(path.join(output,'robots.txt'), production ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',origin.endsWith('/')?origin:`${origin}/`).href}\n` : 'User-agent: *\nDisallow: /\n');
if (production) await fs.writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([slug])=>`<url><loc>${esc(new URL(slug?`${slug}/`:'./',origin.endsWith('/')?origin:`${origin}/`).href)}</loc></url>`).join('')}</urlset>`);
else await fs.rm(path.join(output,'sitemap.xml'),{force:true});
console.log(`Built ${pages.length} pages in ${output} (${production?'production':'local preview, noindex'}).`);
