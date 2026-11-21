# Prévia local — Sahium Advogados

## Como avaliar

Pasta: `C:/Users/steph/Documents/ChatGPT/sahium-redesign`.

```powershell
npm run build
npm run check
npm run preview
```

Abra `http://127.0.0.1:4173/`. O servidor atende somente esta máquina. Se a porta já estiver em uso pela prévia desta tarefa, use a instância existente.

O build usa apenas Node.js (22 ou superior), sem instalação de dependências. Os arquivos finais ficam em `dist/`. A pasta original e a branch `main` continuam com o site anterior. Esta branch local não foi enviada ao GitHub e nenhuma hospedagem foi alterada.

## O que mudou

- Nova direção editorial com a marca original e suas famílias cromáticas; duas fontes locais com licenças incluídas.
- Sete páginas: início, atuação, escritório, Carla Sahium, Jefferson Lopes, publicações e privacidade/canais digitais.
- Cabeçalho e rodapé compartilhados no gerador, menu móvel nativo, navegação por teclado e estados de foco.
- Áreas de atuação e perguntas frequentes com expansão acessível, conteúdo legível sem JavaScript, respeito a movimento reduzido.
- Contato contextual pelo WhatsApp com mensagem revisável, telefone e e-mail reais herdados do original. Nenhum envio é realizado automaticamente.
- Metadados individuais, favicon da marca, imagens WebP e fontes locais. Prévia intencionalmente bloqueada para indexação. Após aprovação, `SAHIUM_PRODUCTION=1` e `SAHIUM_SITE_URL` habilitam canonical e sitemap; isso não publica o site.

## Verificações realizadas

- `npm run build`: sete páginas geradas.
- `npm run check`: três testes passaram; cobrem semântica básica/metadados, links locais/âncoras/arquivos, preservação de conteúdo e contatos e isolamento da prévia.
- Chrome real em modo headless: sete páginas em 1440, 1024, 768, 390 e 320 px; sem overflow horizontal, arquivos quebrados ou erros JavaScript. Screenshots em desktop, tablet e celular revisadas.
- Fluxos: menu móvel, Escape e devolução do foco; accordions por mouse e teclado; links fechados fora da navegação por `inert`; contato contextual da página de atuação; opção “Já sou cliente”; movimento reduzido e alternativa sem JavaScript. Nenhuma mensagem foi enviada.
- Edge real em modo headless: smoke de sete páginas em 1440, 390 e 320 px, sem overflow ou erros de execução.
- Axe-core: varredura WCAG A/AA disponível na ferramenta, em sete páginas e duas larguras (1440 e 390 px), sem violações automáticas reportadas. A ferramenta não comprova conformidade integral nem substitui auditoria manual com tecnologias assistivas.
- Observação de performance no Chrome, viewport 390×844, cache vazio, CPU 4× mais lenta e rede simulada de 1,6 Mbps/150 ms: LCP de aproximadamente 1,88 s, CLS 0, cerca de 317 KB transferidos em recursos na observação inicial e nenhuma solicitação externa. São dados de laboratório local, sem garantia de métricas em produção; INP de campo não foi medido.

Resultados detalhados e screenshots ficam localmente em `review/`; não são incluídos no website entregue ao visitante. Os scripts de navegador usam o Playwright do runtime deste ambiente e axe-core em uma pasta temporária. Não há configuração de lint preexistente; a sintaxe JavaScript foi conferida e o build e testes foram executados. Não foi introduzido linter ou framework apenas para a tarefa.

## Limites e aprovação

Não foram avaliados Safari, Firefox ou dispositivos físicos, nem foi feito teste com leitor de tela. Não foram efetuadas chamadas, envios de e-mail ou mensagens, nem autenticação nas redes sociais; a revisão automatizada cobre os destinos locais e a composição dos links externos, sem garantir a disponibilidade de cada publicação no Instagram.

Os dados institucionais herdados precisam da confirmação final do escritório, principalmente filiações atuais, registros, contatos, horário e endereço completo. Os currículos e referências foram preservados; a designação de Carla em 2025 foi conferida na fonte da OAB Goiás. O logotipo diz “Sahium Advogados”; confirmar se a nova apresentação pública deve adotar outra denominação antes de qualquer alteração da marca.

Não foi localizado manual de cores. A paleta respeita os ativos fornecidos e os estilos originais, com cores amostradas descritas em `PROJETO.md`. A política dos canais digitais descreve esta implementação; eventual política institucional mais abrangente deve ser fornecida pelo escritório.

A publicação final aguarda aprovação. O endereço definitivo, os dados institucionais e a revisão editorial/jurídica do responsável pelo escritório devem ser confirmados antes de publicar. Esta entrega não afirma certificação WCAG, aprovação da OAB ou revisão jurídica formal.
