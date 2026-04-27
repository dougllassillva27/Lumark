import { useRef, useState } from 'react';
import { ClipboardPaste, FileText, FileUp, MousePointer2, Sparkles, Zap } from 'lucide-react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { criarDocumentoAPartirDeArquivo, lerArquivoTexto } from '../lib/arquivo';
import styles from './EmptyState.module.css';
import imgBanner from '../assets/img/Lumark - banner.webp';

function EmptyState() {
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);
  const setModalColarAberto = useDocumentoStore((state) => state.setModalColarAberto);
  const inputRef = useRef(null);
  const [erro, setErro] = useState(null);

  const abrirArquivo = () => {
    inputRef.current?.click();
  };

  const abrirModalColar = () => {
    setModalColarAberto(true);
  };

  const onFileInput = async (evento) => {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;

    setErro(null);

    try {
      const conteudo = await lerArquivoTexto(arquivo);
      const documento = criarDocumentoAPartirDeArquivo({
        nome: arquivo.name,
        conteudo,
        tamanho: arquivo.size,
      });

      setDocumentoAtivo(documento);
    } catch (erroCapturado) {
      setErro(erroCapturado.message);
      setTimeout(() => setErro(null), 3000);
    }

    evento.target.value = '';
  };

  return (
    <div className={styles.container}>
      {erro && <div className={styles.erro}>{erro}</div>}

      <section className={styles.hero}>
        <div className={styles.colunaTexto}>
          <div className={styles.marca}>
            <FileText size={42} />
            <span>Lumark</span>
          </div>

          <h1 className={styles.titulo}>Leitura técnica sem distrações</h1>

          <p className={styles.subtitulo}>
            Abra, edite e visualize Markdown, JSON e texto com rapidez, clareza e foco total no conteúdo.
          </p>

          <input
            type="file"
            accept=".md,.txt,.json"
            ref={inputRef}
            className={styles.inputArquivo}
            onChange={onFileInput}
          />

          <div className={styles.acoes}>
            <button type="button" className={styles.botaoPrimario} onClick={abrirArquivo}>
              <FileUp size={20} />
              <span>Abrir arquivo</span>
            </button>

            <button type="button" className={styles.botaoSecundario} onClick={abrirModalColar}>
              <ClipboardPaste size={20} />
              <span>Colar texto</span>
            </button>
          </div>

          <div className={styles.dropzone} title="Arraste um arquivo para qualquer lugar da tela">
            <MousePointer2 size={22} />
            <span>Arraste e solte arquivos em qualquer lugar da tela</span>
          </div>

          <div className={styles.recursos}>
            <div className={styles.recurso}>
              <Zap size={18} />
              <span>Rápido</span>
            </div>

            <div className={styles.recurso}>
              <Sparkles size={18} />
              <span>Foco no conteúdo</span>
            </div>
          </div>
        </div>

        <div className={styles.colunaPreview}>
          <div className={styles.previewGlow}></div>

          <div className={styles.previewCard}>
            <img src={imgBanner} alt="Banner visual do Lumark" className={styles.banner} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmptyState;
