import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const routes=['','atuacao','quem-somos','carla-sahium','jefferson-lopes','publicacoes','privacidade'];
const production=process.env.SAHIUM_PRODUCTION==='1';

test('All pages have semantics, metadata and usable local links/assets', async()=>{
  for(const route of routes){
    const file=path.join(root,route,'index.html');
    const html=await fs.readFile(file,'utf8');
    assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one main heading`);
    assert.match(html,/<html lang="pt-BR"/);
    assert.match(html,/<meta name="description" content="[^"]+"/);
    assert.match(html,/<main id="conteudo"/);
    assert.match(html,/<nav[^>]+aria-label/);
    const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,`${route}: unique IDs`);
    for(const [,attribute,value] of html.matchAll(/\s(href|src)="([^"]+)"/g)){
      if(/^(https?:|tel:|mailto:|data:)/.test(value))continue;
      const url=new URL(value,`http://local/${route?route+'/':''}`);
      let target=path.join(root,decodeURIComponent(url.pathname));
      const stat=await fs.stat(target).catch(()=>null);
      assert.ok(stat,`${route}: missing ${attribute} ${value}`);
      if(stat.isDirectory())target=path.join(target,'index.html');
      if(url.hash){
        const content=await fs.readFile(target,'utf8');
        assert.ok(content.includes(`id="${url.hash.slice(1)}"`),`${route}: missing anchor ${value}`);
      }
    }
  }
});

test('Institutional content and actual contact routes survive migration',async()=>{
  const home=await fs.readFile(path.join(root,'index.html'),'utf8');
  for(const term of ['Direito Condominial','Direito Imobiliário','Advocacia de Negócios','Planejamento Patrimonial e Sucessório','Contratos Agrários','Advocacia para Mulheres','Soluções Multidisciplinares','tel:+556240088900','https://wa.me/5562993355808','contato@carlasahium.adv.br'])assert.ok(home.includes(term),term);
  const carla=await fs.readFile(path.join(root,'carla-sahium/index.html'),'utf8');
  assert.match(carla,/18\.198/);assert.match(carla,/Cartilha de Mediação Prática/);assert.match(carla,/1993–1998/);
  const jefferson=await fs.readFile(path.join(root,'jefferson-lopes/index.html'),'utf8');
  assert.match(jefferson,/24\.627/);assert.match(jefferson,/Coleta de resíduos/);
});

test('Indexing matches the build mode; no embedded remote trackers or forms',async()=>{
  for(const route of routes){
    const html=await fs.readFile(path.join(root,route,'index.html'),'utf8');
    assert.ok(html.includes(`name="robots" content="${production?'index,follow':'noindex,nofollow'}"`));
    if(production){
      const origin=process.env.SAHIUM_SITE_URL;
      assert.ok(origin,'Production URL required');
      const canonical=new URL(route?`${route}/`:'./',origin.endsWith('/')?origin:origin+'/').href;
      assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
    }
    assert.doesNotMatch(html,/<(?:script|iframe)[^>]*src="https?:/);
    assert.doesNotMatch(html,/<form\b/);
  }
  const robots=await fs.readFile(path.join(root,'robots.txt'),'utf8');
  if(production){
    assert.match(robots,/Allow: \//);
    assert.doesNotMatch(robots,/Disallow: \//);
    const sitemap=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');
    assert.equal((sitemap.match(/<loc>/g)||[]).length,routes.length);
    assert.ok(sitemap.includes(process.env.SAHIUM_SITE_URL));
  }else assert.match(robots,/Disallow: \//);
});
