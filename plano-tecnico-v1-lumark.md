# Plano Técnico V1 — Lumark

> Leitor de Markdown online, leitor-first, com visual AMOLED minimal e cara de docs moderna.

## 1. Nome do projeto

**Nome sugerido:** `Lumark`

### Racional
- **Lu** = luz, leitura, clareza
- **mark** = markdown / marcação
- curto
- profissional
- memorável
- bom para domínio, repositório e branding

### Outras opções fortes
- **NoirDocs**
- **Markveil**
- **Inkview**
- **Doclume**
- **Midark**

### Recomendação final
**Lumark**  
Melhor equilíbrio entre:
- nome bonito
- profissional
- curto
- identidade visual forte
- cara de produto real

---

## 2. Visão da V1

### Objetivo
Construir uma aplicação web estática hospedável na Netlify que permita:

- abrir arquivos `.md` e `.txt`
- arrastar e soltar arquivos
- colar texto Markdown manualmente
- visualizar o conteúdo renderizado de forma bonita
- alternar entre leitura, edição e split view
- persistir preferências e último conteúdo no `localStorage`
- exportar HTML e copiar conteúdo

### Princípios da V1
- leitor-first
- sem backend
- sem autenticação
- sem banco de dados
- sem colaboração
- sem editor complexo
- rápido
- leve
- seguro para conteúdo renderizado

---

## 3. Stack técnica

## Frontend
- **React**
- **Vite**
- **JavaScript**
- **CSS puro modularizado por responsabilidade**

## Bibliotecas
- **markdown-it** → parser Markdown
- **dompurify** → sanitização do HTML renderizado
- **lucide-react** → ícones
- **vitest** → testes
- **@testing-library/react** → testes de interface
- **@testing-library/user-event** → interações de usuário
- **jsdom** → ambiente DOM de teste

## Deploy
- **Netlify**

---

## 4. Requisitos funcionais da V1

### RF-01 — Upload de arquivo
O sistema deve permitir abrir arquivos `.md` e `.txt` por seletor de arquivos.

### RF-02 — Drag and drop
O sistema deve permitir arrastar e soltar arquivos válidos na área principal.

### RF-03 — Colar texto
O sistema deve permitir colar conteúdo Markdown diretamente em um modal ou área dedicada.

### RF-04 — Renderização Markdown
O sistema deve converter Markdown em HTML visualmente agradável.

### RF-05 — Sanitização
O HTML gerado deve ser sanitizado antes de ser renderizado.

### RF-06 — Modos de visualização
O sistema deve oferecer:
- leitura
- edição
- split view

### RF-07 — Persistência local
O sistema deve persistir no `localStorage`:
- tema
- modo de visualização
- tamanho da fonte
- largura do painel
- último conteúdo
- metadados dos últimos 5 arquivos

### RF-08 — Histórico leve
O sistema deve manter apenas metadados dos últimos 5 arquivos/documentos:
- nome
- origem
- tamanho
- data de abertura

### RF-09 — Utilitários
O sistema deve permitir:
- copiar Markdown
- copiar HTML
- exportar HTML
- limpar sessão

### RF-10 — Responsividade
O sistema deve funcionar bem em desktop e mobile.

---

## 5. Requisitos não funcionais

### RNF-01 — Performance
- primeira renderização rápida
- sem dependências pesadas desnecessárias
- build enxuta

### RNF-02 — Segurança
- sanitizar todo HTML renderizado
- bloquear execução de scripts
- validar tipo de arquivo
- validar tamanho de arquivo

### RNF-03 — Usabilidade
- tela inicial autoexplicativa
- feedback visual claro
- foco em leitura confortável

### RNF-04 — Manutenibilidade
- componentes pequenos
- utilitários isolados
- store separada
- persistência separada
- parser desacoplado

### RNF-05 — Deploy simples
- build estático
- sem serviços externos
- compatível com Netlify sem adaptações complexas

---

## 6. Arquitetura da aplicação

### Padrão
SPA client-side.

### Estratégia
Separar a aplicação em 5 camadas:

1. **UI**
2. **estado**
3. **serviços utilitários**
4. **persistência**
5. **configuração/renderização**

### Fluxo principal
1. usuário fornece conteúdo
2. store atualiza documento ativo
3. parser converte Markdown em HTML
4. sanitização limpa HTML
5. preview renderiza
6. persistência salva estado relevante

---

## 7. Estrutura de pastas

```text
lumark/
├── public/
│   ├── favicon.svg
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── Toolbar.jsx
│   │   ├── FileDropzone.jsx
│   │   ├── PasteModal.jsx
│   │   ├── EditorPane.jsx
│   │   ├── PreviewPane.jsx
│   │   ├── ViewSwitcher.jsx
│   │   ├── EmptyState.jsx
│   │   ├── SettingsDrawer.jsx
│   │   ├── ReadingStats.jsx
│   │   └── RestoreSessionBanner.jsx
│   ├── lib/
│   │   ├── markdown.js
│   │   ├── sanitizacao.js
│   │   ├── arquivo.js
│   │   ├── exportacao.js
│   │   ├── clipboard.js
│   │   └── validacao.js
│   ├── store/
│   │   ├── useDocumentoStore.js
│   │   └── persistenciaLocal.js
│   ├── constants/
│   │   ├── storageKeys.js
│   │   ├── limites.js
│   │   └── configuracoesIniciais.js
│   ├── hooks/
│   │   ├── useAtalhos.js
│   │   ├── usePersistencia.js
│   │   └── useDragAndDrop.js
│   ├── styles/
│   │   ├── base.css
│   │   ├── theme.css
│   │   ├── layout.css
│   │   └── markdown.css
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── markdown.test.js
│   ├── sanitizacao.test.js
│   ├── persistencia.test.js
│   ├── upload.test.jsx
│   ├── colar-texto.test.jsx
│   └── view-mode.test.jsx
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── README.md
```

---

## 8. Modelo de estado da aplicação

```js
{
  documentoAtivo: {
    nome: "README.md",
    origem: "upload",
    conteudo: "# Título",
    tamanho: 2450,
    dataAbertura: "2026-04-23T15:00:00.000Z"
  },
  preferencias: {
    tema: "amoled",
    modoVisualizacao: "leitura",
    tamanhoFonte: 16,
    larguraPainelEsquerdo: 42,
    quebraLinhaEditor: true
  },
  historicoMetadados: [
    {
      nome: "README.md",
      origem: "upload",
      tamanho: 2450,
      dataAbertura: "2026-04-23T15:00:00.000Z"
    }
  ],
  ui: {
    modalColarAberto: false,
    settingsAberto: false,
    arrastandoArquivo: false,
    restauracaoPendente: true
  }
}
```

---

## 9. Contratos internos

## 9.1 `arquivo.js`
Responsável por:
- ler arquivo texto
- validar extensão
- validar tamanho
- retornar objeto padronizado

### Interface esperada
```js
async function lerArquivoTexto(arquivo)
async function validarArquivoMarkdown(arquivo)
function criarDocumentoAPartirDeArquivo({ nome, conteudo, tamanho })
```

## 9.2 `markdown.js`
Responsável por:
- instanciar `markdown-it`
- renderizar Markdown em HTML
- aplicar plugins opcionais no futuro

### Interface esperada
```js
function renderizarMarkdown(conteudoMarkdown)
```

## 9.3 `sanitizacao.js`
Responsável por:
- aplicar `DOMPurify`
- devolver HTML seguro

### Interface esperada
```js
function sanitizarHtml(htmlSujo)
```

## 9.4 `persistenciaLocal.js`
Responsável por:
- salvar preferências
- salvar último conteúdo
- salvar histórico de metadados
- restaurar sessão
- limpar sessão

### Interface esperada
```js
function salvarEstadoParcial(estado)
function carregarEstadoPersistido()
function limparEstadoPersistido()
```

## 9.5 `exportacao.js`
Responsável por:
- gerar documento HTML completo
- baixar arquivo `.html`

### Interface esperada
```js
function gerarHtmlExportavel({ titulo, htmlRenderizado })
function exportarArquivoHtml({ nomeArquivo, conteudoHtml })
```

---

## 10. Componentes e responsabilidades

## 10.1 `App.jsx`
Orquestra:
- store
- layout principal
- panes
- persistência
- eventos globais

## 10.2 `Layout.jsx`
Estrutura da aplicação:
- header
- toolbar
- conteúdo principal
- rodapé leve

## 10.3 `Header.jsx`
Mostra:
- nome/logo
- abrir arquivo
- colar texto
- exportar
- limpar sessão
- tema

## 10.4 `FileDropzone.jsx`
Responsável por:
- clique para abrir arquivo
- drag-and-drop
- estados visuais de arraste
- mensagem de erro amigável

## 10.5 `PasteModal.jsx`
Responsável por:
- textarea grande
- ação “usar conteúdo”
- ação “cancelar”
- origem do documento como `colar`

## 10.6 `EditorPane.jsx`
Responsável por:
- edição simples
- textarea controlada
- atualização de conteúdo

## 10.7 `PreviewPane.jsx`
Responsável por:
- renderizar HTML sanitizado
- aplicar estilo visual de docs

## 10.8 `ViewSwitcher.jsx`
Responsável por:
- alternar entre:
  - leitura
  - edição
  - split

## 10.9 `SettingsDrawer.jsx`
Responsável por:
- tema
- fonte
- largura
- quebra de linha

## 10.10 `RestoreSessionBanner.jsx`
Responsável por:
- oferecer retomada da sessão anterior
- permitir começar do zero

---

## 11. Estratégia de layout

### Desktop
#### Modo leitura
- preview centralizado
- largura confortável de leitura
- editor oculto

#### Modo edição
- editor com largura ampla
- preview oculto

#### Modo split
- editor à esquerda
- preview à direita
- preview com peso visual maior

### Mobile
- nada de split forçado
- usar abas:
  - Conteúdo
  - Preview
  - Configurações

---

## 12. Estratégia visual

### Tema padrão
**AMOLED**

### Tokens visuais sugeridos
```css
:root {
  --cor-fundo: #000000;
  --cor-superficie: #0b0b0b;
  --cor-superficie-2: #111111;
  --cor-borda: #242424;
  --cor-texto: #f5f5f5;
  --cor-texto-suave: #b3b3b3;
  --cor-destaque: #7dd3fc;
  --cor-destaque-hover: #38bdf8;
  --cor-sucesso: #34d399;
  --cor-erro: #f87171;
}
```

### Direção tipográfica
- título: forte, limpo
- corpo: legível
- blocos de código: mono discreta
- largura máxima de leitura: confortável

---

## 13. Estratégia de persistência

## O que salvar
### Preferências
- tema
- modo
- fonte
- largura
- quebra de linha

### Sessão
- último conteúdo
- nome atual
- origem atual
- timestamp da última abertura

### Histórico
Até 5 itens:
- nome
- origem
- tamanho
- data de abertura

## O que não salvar
- arquivos binários
- múltiplos conteúdos completos históricos
- blobs
- HTML gerado

## Regra de limite
Definir um limite de caracteres para persistência do conteúdo completo.

### Sugestão
- até **300.000 caracteres**: salva conteúdo
- acima disso: salva só preferências + metadados e informa o usuário

---

## 14. Segurança

## Regras obrigatórias
- nunca renderizar HTML sem sanitização
- bloquear `<script>`
- bloquear atributos inline perigosos
- validar extensão e tamanho de arquivo
- limitar colagem muito grande se necessário
- não confiar em conteúdo vindo do usuário

## Cenários de teste
- markdown com script embutido
- markdown com HTML malicioso
- links potencialmente inseguros
- imagens remotas quebradas

---

## 15. Acessibilidade

- contraste alto
- botões com `aria-label` quando necessário
- navegação por teclado
- foco visível
- inputs com rótulos claros
- texto com tamanho legível

---

## 16. Plano de implementação por fases

## Fase 1 — Fundação
### Objetivo
Subir a base do projeto com layout inicial e estrutura.

```xml
<task>
  <name>Inicializar projeto Vite React</name>
  <files>package.json, vite.config.js, src/main.jsx, src/App.jsx</files>
  <action>Criar base do projeto e garantir build local</action>
  <verify>Projeto sobe com npm run dev e builda com npm run build</verify>
</task>

<task>
  <name>Criar estrutura de pastas e arquivos-base</name>
  <files>src/components, src/lib, src/store, src/styles, src/constants, src/hooks</files>
  <action>Organizar arquitetura inicial da aplicação</action>
  <verify>Estrutura pronta para implementação incremental</verify>
</task>

<task>
  <name>Implementar tema AMOLED base</name>
  <files>src/styles/base.css, src/styles/theme.css, src/styles/layout.css</files>
  <action>Criar tokens visuais, reset básico e layout principal</action>
  <verify>Tela inicial abre com identidade visual consistente</verify>
</task>
```

## Fase 2 — Shell do produto
### Objetivo
Montar a experiência base sem parser ainda.

```xml
<task>
  <name>Construir layout leitor-first</name>
  <files>src/components/Layout.jsx, src/components/Header.jsx, src/components/EmptyState.jsx, src/components/Toolbar.jsx</files>
  <action>Montar shell da aplicação com 3 portas de entrada claras</action>
  <verify>Tela vazia comunica abrir arquivo, arrastar e colar texto</verify>
</task>

<task>
  <name>Construir modos de visualização</name>
  <files>src/components/ViewSwitcher.jsx, src/components/EditorPane.jsx, src/components/PreviewPane.jsx</files>
  <action>Preparar estrutura de leitura, edição e split</action>
  <verify>Alternância visual funciona mesmo com conteúdo mockado</verify>
</task>
```

## Fase 3 — Entrada de conteúdo
### Objetivo
Receber arquivo e texto colado.

```xml
<task>
  <name>Implementar upload e validação de arquivo</name>
  <files>src/components/FileDropzone.jsx, src/lib/arquivo.js, src/lib/validacao.js</files>
  <action>Ler .md/.txt por seletor e drag-and-drop com validações</action>
  <verify>Arquivos válidos carregam e inválidos geram erro amigável</verify>
</task>

<task>
  <name>Implementar colar texto</name>
  <files>src/components/PasteModal.jsx, src/store/useDocumentoStore.js</files>
  <action>Criar fluxo de colagem com criação de documento sem título</action>
  <verify>Texto colado aparece no estado e na interface</verify>
</task>
```

## Fase 4 — Renderização Markdown segura
### Objetivo
Converter Markdown em preview utilizável.

```xml
<task>
  <name>Implementar parser markdown</name>
  <files>src/lib/markdown.js</files>
  <action>Configurar markdown-it para renderização base</action>
  <verify>Headings, listas, tabelas e code block renderizam corretamente</verify>
</task>

<task>
  <name>Implementar sanitização do HTML</name>
  <files>src/lib/sanitizacao.js, src/components/PreviewPane.jsx</files>
  <action>Sanitizar todo HTML antes da renderização</action>
  <verify>Conteúdo malicioso não executa</verify>
</task>

<task>
  <name>Aplicar estilo de documentação ao preview</name>
  <files>src/styles/markdown.css</files>
  <action>Estilizar headings, listas, tabelas, quotes e code blocks</action>
  <verify>Preview fica bonito, legível e coerente com a identidade</verify>
</task>
```

## Fase 5 — Estado e persistência
### Objetivo
Tornar a experiência contínua.

```xml
<task>
  <name>Implementar store do documento</name>
  <files>src/store/useDocumentoStore.js</files>
  <action>Centralizar documento ativo, preferências, ui e histórico</action>
  <verify>Estado responde corretamente às ações principais</verify>
</task>

<task>
  <name>Implementar persistência local</name>
  <files>src/store/persistenciaLocal.js, src/hooks/usePersistencia.js</files>
  <action>Salvar preferências, último conteúdo e metadados no localStorage</action>
  <verify>Refresh restaura o estado esperado</verify>
</task>

<task>
  <name>Implementar banner de restauração</name>
  <files>src/components/RestoreSessionBanner.jsx</files>
  <action>Permitir retomada da sessão anterior ou limpeza</action>
  <verify>Usuário controla a retomada sem surpresa</verify>
</task>
```

## Fase 6 — Ações utilitárias
### Objetivo
Fechar os fluxos de uso.

```xml
<task>
  <name>Implementar copiar markdown e html</name>
  <files>src/lib/clipboard.js, src/components/Toolbar.jsx</files>
  <action>Criar ações de cópia com feedback visual</action>
  <verify>Markdown bruto e HTML sanitizado podem ser copiados</verify>
</task>

<task>
  <name>Implementar exportação HTML</name>
  <files>src/lib/exportacao.js, src/components/Toolbar.jsx</files>
  <action>Gerar e baixar arquivo HTML do documento atual</action>
  <verify>Arquivo exportado abre corretamente no navegador</verify>
</task>

<task>
  <name>Implementar limpar sessão</name>
  <files>src/store/persistenciaLocal.js, src/components/Toolbar.jsx</files>
  <action>Apagar conteúdo persistido e resetar UI</action>
  <verify>Aplicação retorna ao estado inicial sem lixo residual</verify>
</task>
```

## Fase 7 — Responsividade e refinos
### Objetivo
Garantir qualidade de uso.

```xml
<task>
  <name>Adaptar experiência mobile</name>
  <files>src/components/Layout.jsx, src/styles/layout.css</files>
  <action>Trocar split por navegação em abas no mobile</action>
  <verify>Fluxos principais funcionam bem em telas pequenas</verify>
</task>

<task>
  <name>Adicionar atalhos úteis</name>
  <files>src/hooks/useAtalhos.js</files>
  <action>Adicionar atalhos como abrir colar texto ou alternar modo</action>
  <verify>Atalhos funcionam sem quebrar acessibilidade</verify>
</task>
```

## Fase 8 — Testes e deploy
### Objetivo
Validar e publicar.

```xml
<task>
  <name>Adicionar testes essenciais</name>
  <files>tests/*.test.js, tests/*.test.jsx</files>
  <action>Cobrir parser, sanitização, persistência, upload e colagem</action>
  <verify>Suite crítica passa antes do deploy</verify>
</task>

<task>
  <name>Preparar Netlify</name>
  <files>netlify.toml, public/_redirects</files>
  <action>Configurar build, publish e fallback SPA</action>
  <verify>Deploy em preview e produção funciona sem ajuste manual</verify>
</task>
```

---

## 17. Plano de testes

## Unitários
### `markdown.test.js`
Validar:
- heading
- lista
- tabela
- bloco de código
- citação

### `sanitizacao.test.js`
Validar:
- remoção de `<script>`
- remoção de handlers perigosos
- preservação de HTML seguro permitido

### `persistencia.test.js`
Validar:
- salvar preferências
- salvar último conteúdo
- recuperar estado
- limpar storage
- respeitar limite de histórico

## Interface
### `upload.test.jsx`
Validar:
- upload por input
- erro para arquivo inválido
- carregamento no preview

### `colar-texto.test.jsx`
Validar:
- abrir modal
- colar conteúdo
- salvar no estado
- renderizar preview

### `view-mode.test.jsx`
Validar:
- troca entre leitura, edição e split
- comportamento mobile simplificado quando aplicável

---

## 18. Netlify

## `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## `public/_redirects`
```txt
/* /index.html 200
```

---

## 19. Backlog pós-V1

- ToC automática
- highlight.js
- PWA
- offline mode
- múltiplos presets visuais
- exportar PDF
- abrir links externos com tratamento melhor
- modo apresentação

---

## 20. Critério de pronto da V1

A V1 está pronta quando:
- abre `.md` e `.txt`
- aceita drag-and-drop
- aceita colar texto
- renderiza Markdown bonito
- sanitiza conteúdo
- oferece 3 modos de visualização
- persiste preferências e último conteúdo
- guarda 5 metadados de histórico
- copia Markdown e HTML
- exporta HTML
- funciona em mobile
- builda e sobe na Netlify
- testes críticos passam

---

## 21. Ordem recomendada de execução na IDE

1. scaffold Vite + React
2. styles base + shell
3. store
4. upload
5. colar texto
6. parser markdown
7. sanitização
8. preview bonito
9. persistência
10. toolbar utilitária
11. mobile
12. testes
13. netlify

---

## 22. Mensagem de commit sugerida para quando essa fase virar código

```text
feat(lumark): adiciona base do leitor markdown v1
```
