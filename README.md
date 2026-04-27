<div align="center">
  <img src="src/assets/img/Lumark%20-%20banner%20README.webp" alt="Lumark Banner" width="100%" />
  <h1>📖 Lumark</h1>
  <p>Leitor e visualizador de arquivos Markdown (.md), JSON (.json) e texto online. Rápido, seguro, 100% local e com modo leitura focado.</p>
</div>

---

## ✨ Funcionalidades (Features)

- **Upload Simplificado:** Suporte a arquivos `.md`, `.json` e `.txt` via Drag and Drop ou Seletor Nativo.
- **Colagem Rápida:** Modal dedicado para colar textos com auto-detecção de formato (Markdown ou JSON).
- **Suporte Avançado a JSON:** Syntax Highlighting via PrismJS, preenchimento total de tela e auto-formatação.
- **Modos de Visualização Dinâmicos:**
  - 📖 **Leitura:** Foco total no texto renderizado.
  - 📝 **Edição:** Visualização do Markdown raw.
  - 🗂️ **Split View:** Editor e Preview lado a lado.
- **Motor de Markdown Seguro:** Renderização HTML via `markdown-it` com sanitização rigorosa via `DOMPurify` para prevenção contra XSS.
- **Tipografia & Tema:** Estilo GitHub Docs-like imerso em um tema customizado **AMOLED** (alto contraste, zero distrações).
- **Persistência de Sessão:** Preferências, metadados e conteúdos recentes salvos via `localStorage` (com truncamento inteligente >300kb de memória).
- **Utilitários Essenciais:** Copiar Markdown puro, copiar HTML seguro e Exportar `.html` local.
- **Shortcuts de Produtividade:**
  - `Ctrl+Alt+C`: Copiar Markdown
  - `Ctrl+Alt+H`: Copiar HTML Seguro
  - `Ctrl+Alt+E`: Exportar Arquivo HTML

## 🛠️ Tech Stack & Arquitetura

A aplicação foi construída com o paradigma **Local-First SPA** (Single Page Application). Sem banco de dados, sem backend.

- **Core:** React 18 + Vite
- **Gerenciador de Estado:** Zustand (com middleware `persist`)
- **Segurança & Parse:** DOMPurify + markdown-it
- **Syntax Highlighting:** PrismJS
- **Ícones:** Lucide React
- **Estilização:** CSS Nativo (Modular + Variáveis Globais)
- **Build/DevOps:** Motor MD5 de Cache-busting nativo (`versionador.js`).

## 🚀 Execução e Deploy

### 1. Desenvolvimento Local

Execute o ambiente de desenvolvimento com Hot Module Replacement (HMR).

```bash
# Instala dependências
npm install

# Inicia servidor Vite
npm run dev
```

### 2. Deploy XAMPP / Apache Local

O projeto contém automação em PowerShell para geração de compilação de produção e espelhamento (Junction Link) diretamente para a pasta `htdocs` do XAMPP.

```bash
# Compila o projeto (Gera pasta dist/ e aplica hash MD5 nos assets)
npm run build

# Cria link simbólico para o Apache servir a aplicação
.\scripts\deploy-xampp.ps1
```

_Nota: O Vite está configurado com `base: './'` e inclui `.htaccess` na pasta public para o roteamento fallback do Apache._

## 📂 Estrutura do Código

```text
public/
└── .htaccess          # Regras de roteamento Apache (Fallback SPA)
src/
├── assets/            # Imagens e recursos visuais estáticos
├── components/        # Componentes UI (React) e CSS Modules isolados
├── hooks/             # Custom hooks (Ex: useAtalhos)
├── lib/               # Regras de negócio puras e utilitários
│   ├── arquivo.js     # I/O e leitura de blobs
│   ├── clipboard.js   # Acesso à área de transferência
│   ├── exportacao.js  # Conversão de MD para doc HTML auto-suficiente
│   ├── json.js        # Validador e formatador de payloads
│   ├── markdown.js    # Instância do markdown-it
│   ├── sanitizacao.js # Firewall do DOMPurify
│   └── validacao.js   # Controle de limite de peso (2MB) e extensão
├── store/             # Estado global (Zustand: useDocumentoStore.js)
├── styles/            # Design System AMOLED e Markdown CSS base
└── App.jsx            # Orquestrador da Interface
```

## 🔒 Segurança Aplicada

1. **Restrição de Peso:** Limite hard-coded de `2MB` para uploads.
2. **Sanitização Profunda:** Nenhuma tag ou atributo potencialmente malicioso (ex: `<script>`, `onload=`) sobrevive ao DOMPurify antes de atingir o DOM.
3. **Blob URLs:** O download de exportações é isolado via `URL.createObjectURL`.
4. **Limite de Storage:** A gravação contínua no `localStorage` é bloqueada para textos massivos (>300.000 chars) garantindo a estabilidade da thread principal do navegador.
