import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/steph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const axe=await fs.readFile(path.join(os.tmpdir(),'sahium-quality-tools/node_modules/axe-core/axe.min.js'),'utf8');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const report=[];
try{
  for(const width of [1440,390]){
    const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
    for(const route of ['','atuacao/','quem-somos/','carla-sahium/','jefferson-lopes/','publicacoes/','privacidade/']){
      await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'networkidle'});
      await page.addScriptTag({content:axe});
      const result=await page.evaluate(async()=>{
        const {violations,incomplete}=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
        return {violations:violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),manualChecks:incomplete.map(v=>v.id)};
      });
      report.push({width,route,...result});
    }
    await page.close();
  }
  console.log(JSON.stringify(report.filter(r=>r.violations.length),null,2));
  console.log(`Audited ${report.length} page/viewport combinations; violations: ${report.reduce((s,r)=>s+r.violations.length,0)}`);
}finally{await fs.writeFile('review/accessibility-results.json',JSON.stringify(report,null,2));await browser.close()}
