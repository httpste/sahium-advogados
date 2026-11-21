import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/steph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const result={screens:[],interactions:[],errors:[],requests:[]};
const page=await browser.newPage();
page.on('pageerror',error=>result.errors.push(error.message));
page.on('response',response=>{if(response.status()>=400)result.requests.push({url:response.url(),status:response.status()})});
try{
  const routes=['','atuacao/','quem-somos/','carla-sahium/','jefferson-lopes/','publicacoes/','privacidade/'];
  for(const width of [1440,1024,768,390,320]){
    await page.setViewportSize({width,height:width>=1024?1000:844});
    for(const route of routes){
      await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      await page.evaluate(async()=>{
        await Promise.all([...document.images].map(async img=>{img.loading='eager';try{await img.decode()}catch{}}));
        await Promise.all(document.getAnimations().filter(a=>a.effect.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})));
      });
      const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].filter(img=>!img.complete||img.naturalWidth===0).map(img=>img.src),headings:document.querySelectorAll('h1').length}));
      assert.ok(dimensions.scroll<=width+1,`${route} horizontal overflow at ${width}: ${dimensions.scroll}`);
      assert.equal(dimensions.images.length,0,`${route}: broken image`);
      assert.equal(dimensions.headings,1);
      if((route==='' && [1440,768,390].includes(width))||(width===1440&&['atuacao/','carla-sahium/'].includes(route))){
        const filename=`review/${route?route.replace('/',''):'home'}-${width}.png`;
        await page.screenshot({path:filename,fullPage:true});
        result.screens.push(filename);
      }
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  const menu=page.locator('.mobile-menu');
  await menu.locator('summary').click();
  assert.equal(await menu.evaluate(el=>el.open),true);
  await page.keyboard.press('Escape');
  assert.equal(await menu.evaluate(el=>el.open),false);
  assert.equal(await page.locator(':focus').textContent().then(x=>x.trim().startsWith('Menu')),true);
  await menu.locator('summary').click();
  await menu.getByRole('link',{name:'Atuação',exact:true}).click();
  await page.waitForURL('**/atuacao/');
  result.interactions.push('Mobile navigation, Escape and focus return');
  await page.locator('#imobiliario [data-contact-topic]').click();
  await page.waitForURL('**/?assunto=imobiliario#contato');
  assert.equal(await page.locator('#contact-topic').inputValue(),'imobiliario');
  const href=await page.locator('#whatsapp-link').getAttribute('href');
  assert.equal(new URL(href).hostname,'wa.me');
  assert.match(new URL(href).searchParams.get('text'),/Direito Imobiliário/);
  await page.locator('#contact-topic').selectOption('cliente');
  assert.match(await page.locator('#message-preview').textContent(),/Já sou cliente/);
  result.interactions.push('Area selection reaches contact and prepares accurate WhatsApp message without sending');
  const first=page.locator('.practice-list .t-acc').nth(0);
  const second=page.locator('.practice-list .t-acc').nth(1);
  await second.locator('button').click();
  assert.equal(await second.locator('button').getAttribute('aria-expanded'),'true');
  assert.equal(await first.locator('button').getAttribute('aria-expanded'),'false');
  assert.equal(await first.locator('.t-acc-panel').evaluate(el=>el.inert),true);
  await page.keyboard.press('Enter');
  assert.equal(await second.locator('button').getAttribute('aria-expanded'),'false');
  result.interactions.push('Accordion mouse/keyboard state and inert collapsed links');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('.hero-copy').evaluate(el=>getComputedStyle(el).animationName),'none');
  result.interactions.push('Reduced motion disables entrance animation');
  const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await noJs.newPage();await fallback.goto('http://127.0.0.1:4173/');
  assert.equal(await fallback.locator('.practice-list .t-acc-panel').first().evaluate(el=>getComputedStyle(el).gridTemplateRows==='0px'),false);
  await fallback.locator('.mobile-menu summary').click();
  assert.equal(await fallback.locator('.mobile-menu').evaluate(el=>el.open),true);
  result.interactions.push('No-JS fallback keeps content and native mobile navigation usable');
  await noJs.close();
  assert.deepEqual(result.errors,[],'Browser errors');
  assert.deepEqual(result.requests,[],'Failed requests');
  console.log(JSON.stringify(result,null,2));
}finally{
  await fs.writeFile('review/browser-results.json',JSON.stringify(result,null,2));
  await browser.close();
}
