import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
http.createServer(async(req,res)=>{
  try {
    const url = new URL(req.url, 'http://localhost');
    const requested = path.resolve(root, '.'+decodeURIComponent(url.pathname));
    if (requested !== root && !requested.startsWith(root+path.sep)) {res.writeHead(403);return res.end();}
    const stat = await fs.stat(requested);
    if(stat.isDirectory() && !url.pathname.endsWith('/')){res.writeHead(308,{Location:url.pathname+'/'+url.search});return res.end();}
    const file = stat.isDirectory()?path.join(requested,'index.html'):requested;
    const data = await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
    res.end(data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Página não encontrada.');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/'));
