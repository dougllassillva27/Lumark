import { useRef, useState } from 'react';
import { FileUp, ClipboardPaste, MousePointer2 } from 'lucide-react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import { lerArquivoTexto, criarDocumentoAPartirDeArquivo } from '../lib/arquivo';
import styles from './EmptyState.module.css';

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

  const onFileInput = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    setErro(null);
    try {
      const conteudo = await lerArquivoTexto(arquivo);
      const doc = criarDocumentoAPartirDeArquivo({ nome: arquivo.name, conteudo, tamanho: arquivo.size });
      setDocumentoAtivo(doc);
    } catch (err) {
      setErro(err.message);
      setTimeout(() => setErro(null), 3000);
    }
    e.target.value = '';
  };

  return (
    <div className={styles.container}>
      {erro && <div className={styles.erro}>{erro}</div>}
      <div className={styles.conteudo}>
        <h2 className={styles.titulo}>Leitor de Markdown e Texto</h2>
        <p className={styles.subtitulo}>
          Visualize arquivos .md, .txt e .json instantaneamente. Processamento 100% local e seguro no seu navegador.
        </p>
        <input type="file" accept=".md,.txt,.json" ref={inputRef} style={{ display: 'none' }} onChange={onFileInput} />
        <div className={styles.opcoes}>
          <div className={styles.opcao} onClick={abrirArquivo}>
            <FileUp size={32} />
            <span>Abrir arquivo</span>
          </div>
          <div className={styles.opcao} title="Apenas arraste para qualquer lugar da tela">
            <MousePointer2 size={32} />
            <span>Arrastar e soltar</span>
          </div>
          <div className={styles.opcao} onClick={abrirModalColar}>
            <ClipboardPaste size={32} />
            <span>Colar texto</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
