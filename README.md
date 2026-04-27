<div align="center">
  <img src="src/assets/img/Lumark%20-%20banner%20README.webp" alt="Banner do Lumark" width="100%" />

# 📖 Lumark

![Status](https://img.shields.io/badge/status-active-success)
![Build](https://img.shields.io/badge/build-vite-646CFF)
![React](https://img.shields.io/badge/react-18.2.0-61DAFB)
![License](https://img.shields.io/badge/license-MIT-blue)

**Leitor local-first para abrir, editar, visualizar e exportar conteúdos Markdown, JSON e texto com foco total em leitura técnica.**

</div>

---

## 📌 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Demo](#-demo)
- [Funcionalidades reais](#-funcionalidades-reais)
- [Highlights técnicos](#-highlights-técnicos)
- [Stack](#-stack)
- [Arquitetura](#-arquitetura)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Fluxo da aplicação](#-fluxo-da-aplicação)
- [Segurança](#-segurança)
- [Persistência local](#-persistência-local)
- [SEO, favicon e Open Graph](#-seo-favicon-e-open-graph)
- [Scripts disponíveis](#-scripts-disponíveis)
- [Como rodar localmente](#-como-rodar-localmente)
- [Build e cache busting](#-build-e-cache-busting)
- [Deploy em subpasta Apache](#-deploy-em-subpasta-apache)
- [Testes e validação](#-testes-e-validação)
- [Licença](#-licença)

---

## 📖 Sobre o projeto

O **Lumark** é uma SPA construída com **React 18** e **Vite** para leitura e manipulação local de arquivos `.md`, `.json` e `.txt`.

A aplicação roda no navegador, sem backend e sem banco de dados. O conteúdo é carregado por upload, drag and drop ou colagem manual, renderizado no cliente e persistido parcialmente no `localStorage`.

O foco do projeto é entregar uma experiência de leitura técnica limpa, rápida e segura, com visual AMOLED, modos de visualização e utilitários para cópia/exportação.

---

## 🔗 Demo

A URL pública configurada nas metas Open Graph do projeto é:

👉 `https://dougllassillva.com.br/lumark/`

---

## ✅ Funcionalidades reais

- Abre arquivos `.md`, `.json` e `.txt`.
- Aceita upload por seletor nativo de arquivo.
- Aceita abertura por drag and drop.
- Permite colar conteúdo manualmente em modal.
- Detecta JSON colado e sugere nome `.json`.
- Renderiza Markdown com `markdown-it`.
- Sanitiza HTML renderizado com `DOMPurify`.
- Exibe JSON com syntax highlighting via `PrismJS`.
- Permite alternar entre modo leitura, edição e split view.
- Permite editar o conteúdo ativo em textarea.
- Permite copiar Markdown/JSON puro.
- Permite copiar HTML seguro gerado a partir do Markdown.
- Permite exportar Markdown como arquivo `.html` local.
- Permite formatar JSON válido.
- Mantém histórico de até 5 metadados de documentos abertos.
- Persiste preferências e documento ativo no `localStorage`.
- Limita upload a arquivos de até **2MB**.
- Evita persistir conteúdo muito grande acima de **300.000 caracteres**.
- Possui atalhos de teclado para ações principais.

---

## ⚡ Highlights técnicos

- **Local-first:** processamento no navegador, sem servidor de aplicação.
- **SPA simples:** React + Vite com entrada em `src/main.jsx`.
- **Estado centralizado:** Zustand com middleware `persist`.
- **Renderização segura:** Markdown convertido para HTML e sanitizado antes de entrar no DOM.
- **CSS modular:** componentes com CSS Modules e estilos globais separados por responsabilidade.
- **Cache busting automatizado:** build executa `versionamento/versionador.js` após `vite build`.
- **Deploy em subpasta:** Vite usa `base: './'`, útil para publicação em `/lumark/`.

---

## 🧱 Stack

| Camada                  | Tecnologia                              |
| ----------------------- | --------------------------------------- |
| Base                    | React 18.2.0                            |
| Build                   | Vite 5.2.0                              |
| Estado                  | Zustand 4.5.2                           |
| Markdown                | markdown-it 14.1.0                      |
| Sanitização             | DOMPurify 3.1.0                         |
| Highlight               | PrismJS 1.29.0                          |
| Ícones                  | lucide-react 0.368.0                    |
| Test runner configurado | Vitest 1.4.0                            |
| DOM de testes           | jsdom 24.0.0                            |
| Lint                    | ESLint 8.57.0                           |
| Estilo                  | CSS nativo, CSS Modules e variáveis CSS |

---

## 🏗️ Arquitetura

O Lumark segue uma arquitetura frontend local-first com separação simples por responsabilidade:

```text
Entrada HTML
  ↓
src/main.jsx
  ↓
src/App.jsx
  ↓
Layout + Header + Toolbar + FileDropzone + PasteModal
  ↓
EditorPane / PreviewPane
  ↓
libs puras de arquivo, markdown, sanitização, JSON, clipboard e exportação
  ↓
Zustand persistindo estado no localStorage
```

### Responsabilidades principais

| Área              | Responsabilidade                                                                 |
| ----------------- | -------------------------------------------------------------------------------- |
| `src/App.jsx`     | Orquestra documento ativo, modo de visualização e renderização principal.        |
| `src/components/` | Componentes visuais e interativos da interface.                                  |
| `src/lib/`        | Funções puras de leitura, validação, parse, sanitização, clipboard e exportação. |
| `src/store/`      | Estado global do documento, preferências, histórico e UI.                        |
| `src/hooks/`      | Atalhos globais de teclado.                                                      |
| `src/styles/`     | Tema, base visual, layout global e renderização Markdown.                        |
| `versionamento/`  | Cache busting pós-build para assets gerados em `dist/`.                          |

---

## 📂 Estrutura de pastas

```text
Lumark/
├── docs/
│   └── skills/
│       ├── commit.md
│       └── setup-estrutura.js
├── public/
│   ├── img/
│   └── .htaccess
├── src/
│   ├── assets/
│   │   └── img/
│   │       └── branding/
│   ├── components/
│   │   ├── EditorPane.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FileDropzone.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── PasteModal.jsx
│   │   ├── PreviewPane.jsx
│   │   ├── RestoreSessionBanner.jsx
│   │   ├── Toolbar.jsx
│   │   └── ViewSwitcher.jsx
│   ├── constants/
│   ├── hooks/
│   │   └── useAtalhos.js
│   ├── lib/
│   │   ├── arquivo.js
│   │   ├── clipboard.js
│   │   ├── exportacao.js
│   │   ├── json.js
│   │   ├── markdown.js
│   │   ├── sanitizacao.js
│   │   └── validacao.js
│   ├── store/
│   │   └── useDocumentoStore.js
│   ├── styles/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── markdown.css
│   │   └── theme.css
│   ├── App.jsx
│   └── main.jsx
├── versionamento/
│   └── versionador.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔄 Fluxo da aplicação

### Upload ou drag and drop

```text
Usuário seleciona/solta arquivo
  ↓
FileDropzone.jsx
  ↓
lerArquivoTexto()
  ↓
validarArquivo()
  ↓
criarDocumentoAPartirDeArquivo()
  ↓
useDocumentoStore.setDocumentoAtivo()
  ↓
EditorPane / PreviewPane
```

### Colagem manual

```text
Usuário abre modal de colagem
  ↓
PasteModal.jsx
  ↓
Conteúdo é analisado com JSON.parse()
  ↓
Nome sugerido vira .json ou .md
  ↓
Documento entra no Zustand
```

### Renderização Markdown

```text
conteúdo Markdown
  ↓
renderizarMarkdown()
  ↓
markdown-it gera HTML bruto
  ↓
sanitizarHtml()
  ↓
DOMPurify remove HTML inseguro
  ↓
PreviewPane renderiza HTML seguro
```

### Renderização JSON

```text
arquivo .json
  ↓
PreviewPane identifica extensão
  ↓
Prism.highlight()
  ↓
code recebe HTML destacado
```

---

## 🔐 Segurança

A aplicação possui proteções no lado do cliente:

| Proteção                | Implementação                                                        |
| ----------------------- | -------------------------------------------------------------------- |
| Extensões permitidas    | `validarExtensao()` aceita apenas `.md`, `.txt` e `.json`.           |
| Limite de arquivo       | `TAMANHO_MAXIMO_ARQUIVO = 2 * 1024 * 1024`.                          |
| Sanitização de Markdown | `DOMPurify.sanitize()` com perfil HTML.                              |
| Exportação segura       | HTML exportado usa conteúdo já sanitizado.                           |
| Controle de storage     | Conteúdo acima de 300.000 caracteres não é persistido integralmente. |

> Observação técnica: o projeto usa `dangerouslySetInnerHTML` em `PreviewPane.jsx`, porém o fluxo de Markdown passa por `DOMPurify` antes da renderização. No caso de JSON, o HTML é produzido pelo `PrismJS` a partir do conteúdo destacado.

---

## 💾 Persistência local

O estado persistido usa a chave:

```text
lumark-storage
```

São persistidos:

- documento ativo;
- histórico de metadados;
- preferências de visualização.

Não é persistido:

- estado temporário da UI, como abertura do modal de colagem.

Regra de contenção:

- se `documentoAtivo.conteudo.length > 300000`, o conteúdo é limpo antes de persistir para reduzir risco de travamento ou excesso de armazenamento local.

---

## 🌐 SEO, favicon e Open Graph

O `index.html` contém:

- idioma `pt-BR`;
- favicon em WebP;
- título técnico do projeto;
- descrição SEO;
- keywords;
- author;
- tags Open Graph para WhatsApp/Facebook;
- Twitter Card com imagem grande.

URLs configuradas:

```text
Favicon: /img/favicon.webp
Open Graph image: https://dougllassillva.com.br/lumark/img/social-share.webp
Open Graph URL: https://dougllassillva.com.br/lumark/
```

---

## 📜 Scripts disponíveis

| Comando           | Ação                                           |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Inicia o servidor local do Vite.               |
| `npm run build`   | Gera `dist/` com Vite e executa cache busting. |
| `npm run lint`    | Executa ESLint em arquivos JS/JSX.             |
| `npm run preview` | Sobe prévia local do build.                    |
| `npm run test`    | Executa Vitest.                                |

---

## 🚀 Como rodar localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

### 3. Abrir no navegador

O Vite exibirá a URL local no terminal, geralmente:

```text
http://localhost:5173/
```

---

## 📦 Build e cache busting

O build está configurado no `package.json` assim:

```json
{
  "scripts": {
    "build": "vite build && node versionamento/versionador.js"
  }
}
```

Fluxo:

```text
vite build
  ↓
gera dist/
  ↓
versionamento/versionador.js varre HTML/CSS/JS/JSON/PHP/PY
  ↓
assets locais recebem ?v=<hash-md5>
```

Regras do projeto:

- os caminhos locais devem ser escritos limpos no código;
- não adicionar `?v=` manualmente;
- o versionamento acontece no build, dentro da pasta `dist/`.

---

## 🧭 Deploy em subpasta Apache

O projeto está preparado para deploy em subpasta por usar:

```js
export default defineConfig({
  base: './',
  plugins: [react()],
});
```

Também existe `public/.htaccess` com fallback para `index.html`, útil para SPA em Apache.

Para gerar o build:

```bash
npm run build
```

Depois, publique o conteúdo de `dist/` no destino desejado do servidor.

Exemplo compatível com as metas atuais:

```text
https://dougllassillva.com.br/lumark/
```

---

## 🧪 Testes e validação

O projeto possui script de teste configurado:

```bash
npm run test
```

O anexo do projeto informa `has_tests: false`, então não foram detectados arquivos de teste no pacote analisado.

Validações recomendadas antes de publicar:

```bash
npm run lint
npm run test
npm run build
npm run preview
```

Checklist manual mínimo:

- abrir arquivo `.md` válido;
- abrir arquivo `.json` válido;
- tentar abrir extensão inválida;
- tentar abrir arquivo acima de 2MB;
- alternar entre leitura, edição e split;
- copiar Markdown/JSON;
- copiar HTML seguro;
- exportar HTML;
- recarregar a página e validar restauração/persistência;
- testar URL pública no WhatsApp para validar Open Graph.

---

## ⚠️ Limitações conhecidas pelo estado atual

- Não há backend.
- Não há banco de dados.
- Não há autenticação.
- Não há sincronização entre dispositivos.
- Não foram detectados arquivos de teste no anexo analisado.
- A licença do projeto não foi identificada no pacote analisado.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

Consulte o arquivo [`LICENSE`](./LICENSE) para mais detalhes.
