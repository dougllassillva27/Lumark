fix(security): contem HTML injection no preview

Achados da auditoria (run-1 sobre d69f168). O markdown era renderizado com
html: true e sanitizado por DOMPurify sem FORBID_TAGS/FORBID_ATTR, entao
<form action>, <input>, <button> e style="position:fixed;inset:0"
sobreviviam - formulario e overlay falsos dentro do app, plausiveis o
bastante para roubar digitacao.

sanitizacao.js proibe tags de formulario/controle (form, input, button,
select, option, textarea, label, style, link, meta) e atributos style,
action, formaction, method e target.

exportacao.js: o nome do documento entrava cru no <title> do HTML
exportado, permitindo fechar a tag e injetar script no arquivo que o
usuario abre depois. Agora passa por escaparHtml.

Testes: 21/21 em 4 suites (sanitizacao 7, exportacao 3 novas, validacao 7,
markdown 4). Revalidacao em run-2 (2 unidades covered, 0 findings).
