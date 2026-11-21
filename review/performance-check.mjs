import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/steph/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
  const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
  await page.addInitScript(()=>{
    window.qualityMetrics={lcp:0,cls:0};
    new PerformanceObserver(list=>{for(const entry of list.getEntries())window.qualityMetrics.lcp=entry.startTime}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.qualityMetrics.cls+=entry.value}).observe({type:'layout-shift',buffered:true});
  });
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  await page.waitForTimeout(2000);
  const result=await page.evaluate(()=>({simulation:'Chrome headless, 390x844, CPU 4x, 1.6 Mbps, 150ms latency, empty cache; local lab observation, not field CWV',...window.qualityMetrics,resources:performance.getEntriesByType('resource').map(r=>({url:r.name,bytes:r.transferSize})),externalRequests:performance.getEntriesByType('resource').filter(r=>!r.name.startsWith(location.origin)).map(r=>r.name)}));
  await fs.writeFile('review/performance-results.json',JSON.stringify(result,null,2));
  console.log(JSON.stringify({simulation:result.simulation,lcp:result.lcp,cls:result.cls,bytes:result.resources.reduce((s,r)=>s+r.bytes,0),externalRequests:result.externalRequests},null,2));
}finally{await browser.close()}
