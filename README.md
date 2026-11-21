# Sahium Advogados

Website institucional com sete páginas, conteúdo em português e identidade visual preservada a partir dos materiais do escritório.

Site: https://httpste.github.io/sahium-advogados/

## Desenvolvimento

Requer Node.js 22 ou superior. O build não exige dependências externas.

```sh
npm run build
npm run check
npm run preview
```

Prévia: http://127.0.0.1:4173/ . Os arquivos locais são gerados em dist/, com indexação bloqueada.

## Conteúdo e manutenção

- redesign/build.mjs: conteúdo e templates compartilhados.
- redesign/profiles.json: currículos migrados do projeto anterior.
- redesign/site.css e redesign/site.js: estilos e interações.
- redesign/fonts/: fontes locais e licenças.
- assets/: logotipos, fotografias e publicações do escritório.
- review/: decisões, verificações e itens para revisão institucional.

## GitHub Pages

O Pages publica a raiz da branch main. Os HTML, CSS e JS na raiz são gerados; edite os fontes em redesign/.

Após as alterações e sua revisão, execute:

```sh
npm run prepare:pages
```

Esse comando gera a versão de produção, executa os testes e atualiza a raiz com indexação, canonical e sitemap. Não realiza commit, push ou publicação. SAHIUM_SITE_URL permite definir outro endereço aprovado.

A publicação ocorre após enviar os arquivos atualizados para main. A versão anterior permanece no histórico, no commit 251c495.

Os relatórios em review/ registram a fase de prévia anterior à autorização de publicação; não são páginas do menu do site.