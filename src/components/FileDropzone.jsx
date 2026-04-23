import { useState } from 'react';
import { lerArquivoTexto, criarDocumentoAPartirDeArquivo } from '../lib/arquivo';
import { useDocumentoStore } from '../store/useDocumentoStore';
import styles from './FileDropzone.module.css';

function FileDropzone({ children }) {
  const [arrastando, setArrastando] = useState(false);
  const [erro, setErro] = useState(null);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);

  const onDragOver = (e) => {
    e.preventDefault();
    setArrastando(true);
  };

  const onDragLeave = () => {
    setArrastando(false);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    setArrastando(false);
    setErro(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const arquivo = e.dataTransfer.files[0];
      try {
        const conteudo = await lerArquivoTexto(arquivo);
        const doc = criarDocumentoAPartirDeArquivo({ nome: arquivo.name, conteudo, tamanho: arquivo.size });
        setDocumentoAtivo(doc);
      } catch (err) {
        setErro(err.message);
        setTimeout(() => setErro(null), 3000);
      }
    }
  };

  return (
    <div
      className={`${styles.dropzone} ${arrastando ? styles.ativo : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {erro && <div className={styles.erro}>{erro}</div>}
      {arrastando && (
        <div className={styles.overlay}>
          <span>Solte o arquivo para abrir</span>
        </div>
      )}
      {children}
    </div>
  );
}

export default FileDropzone;
