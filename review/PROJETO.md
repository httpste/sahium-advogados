# Sahium — nova versão institucional

## Preservação e fontes

Desenvolvimento local na branch `codex/sahium-redesign`, em worktree separado. A versão em `main`, a pasta original em Downloads e o GitHub Pages não foram alterados. Os arquivos HTML antigos permanecem neste checkout como referência; a nova versão é gerada em `dist/` a partir de `redesign/`.

Fonte institucional: as quatro páginas do projeto antigo, commit `251c495`. Foram preservados os sete grupos de atuação, os dois profissionais, seus currículos, as publicações, as filiações e os canais de atendimento. Os dados têm origem documentada, mas isso não equivale à confirmação atual pelo escritório.

## Identidade e direção

O ativo `assets/marca.webp` contém verde próximo de `#106858` e dourado próximo de `#e09860` (amostragem dos pixels opacos); a versão anterior usa `#102a23`, `#183e32`, `#e7c690` e `#f6f3e9`. Não foi localizado manual cromático com Pantone/CMYK ou valores oficiais normativos. A composição preserva o logotipo sem alteração e usa essas famílias de verde e dourado, com marfim complementar. Os valores amostrados são uma referência digital, não uma declaração de especificação oficial.

Direção: advocacia institucional de composição editorial. Tipografia Cormorant Garamond para títulos e Manrope para leitura, hospedadas localmente com licenças OFL. Fotografia real, linhas finas, grandes campos de verde e alternância com marfim. A marca visível permanece **Sahium Advogados**, conforme o logotipo e os materiais fornecidos. A indicação do pedido como “Carla Sahium Advocacia” não autoriza redesenhar a marca ou inventar uma nova razão social.

## Diagnóstico anterior

- HTML/CSS/JS sem framework, quatro páginas e imagens WebP; arquitetura suficiente para um site institucional.
- Todas as páginas estavam com `noindex,nofollow`, inadequado a uma publicação definitiva que pretenda indexação; a prévia continua intencionalmente sem indexação.
- Fontes via CSS remoto, rodapé repetido manualmente e navegação móvel sem menu dedicado.
- Homepage extensa com sobreposição entre “A atuação na prática” e áreas; contato duplicado em widget, seção e barra fixa.
- Script da homepage assume elementos presentes e não é compartilhável com páginas internas sem proteção.
- Ausência de metadados sociais, sitemap e página explicativa sobre os canais e privacidade.

## Arquitetura nova

Homepage; áreas de atuação; escritório; perfis de Carla e Jefferson; publicações; privacidade. Templates compartilhados de cabeçalho, navegação, contato e rodapé. Conteúdo principal disponível sem JavaScript. CSS e JS locais; sem backend, analytics, cookies de rastreamento ou serviços pagos. O encaminhamento ao WhatsApp é uma saída explícita para o serviço externo, com mensagem revisável pelo visitante, sem falso formulário de envio.

## Skills e movimento

`motion-design`: personalidade premium, baixa densidade de movimento, entrada curta do hero e feedback de controles. `transitions-dev`: padrão de accordion com grid 0fr/1fr e easing suave, adaptado com `inert` para impedir foco no conteúdo fechado e fallback sem JS. Consultadas as demais skills; não há benefício concreto para React ou reconstrução 3D. As receitas restritivas do Taste foram avaliadas e não adotadas como sistema: o pedido exige marca própria, dados reais e composição autônoma.

## Pesquisa consultada

- Publicidade: [Provimento 205/2021, OAB](https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021). Conteúdo informativo, sem promessa de resultados, oferta financeira, autoengrandecimento ou comparação.
- Currículo: [designação de Carla na OAB Goiás, publicada em 2025](https://www.oabgo.org.br/carla-sahium-traboulsi-e-designada-membra-da-comissao-especial-de-arbitragem-do-cfoab/) e [perfil CAMARB](https://camarb.com.br/profissional/carla-sahium-traboulsi/).
- Referências institucionais: [Pinheiro Neto](https://www.pinheironeto.com.br/home), [Machado Meyer](https://www.machadomeyer.com.br/pt/sobre-nos). Consulta da arquitetura institucional e separação entre equipe, atuação e conteúdo; nenhum texto, ativo ou layout foi copiado.
- Princípios de implementação: semântica, teclado, contraste, movimento reduzido e performance do W3C/WCAG e web.dev, sem alegação de certificação de conformidade.

## Conferência necessária antes de publicar

Confirmar com o escritório a marca de apresentação, a denominação e registro da sociedade, CNPJ, inscrições profissionais, filiações atuais, dados curriculares, telefone, WhatsApp, e-mails e horário (todos herdados do projeto anterior). A alegação antiga de “mais de 25 anos” está documentada, mas foi substituída na apresentação por informação institucional sem contador de experiência; o histórico acadêmico foi preservado no perfil.

O endereço disponível informa apenas Condomínio Absolut Business Style, Goiânia/GO; não inventamos rua, número ou sala. Os posts são arquivo editorial herdado, não um feed atual. A política de privacidade descreve somente o comportamento desta implementação; o escritório deve fornecer a política completa do tratamento posterior nos canais externos. A publicação depende de aprovação e de domínio/canonical definitivos. Não há validação formal da OAB nem parecer jurídico automatizado.
