// Prepare tracked production files. Publishing remains an explicit Git operation.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const env={...process.env,SAHIUM_PRODUCTION:'1',SAHIUM_SITE_URL:process.env.SAHIUM_SITE_URL||'https://httpste.github.io/sahium-advogados/'};
for(const args of [['redesign/build.mjs'],['--test','redesign/check.test.mjs']]){
  const result=spawnSync(process.execPath,args,{cwd:root,env,stdio:'inherit'});
  if(result.status!==0)process.exit(result.status||1);
}
for(const entry of await fs.readdir(path.join(root,'dist'))){
  await fs.cp(path.join(root,'dist',entry),path.join(root,entry),{recursive:true});
}
console.log('Production files prepared at repository root; no publication performed.');
