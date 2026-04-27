import { useState, useEffect, useRef } from 'react';
import { lerArquivoTexto, criarDocumentoAPartirDeArquivo } from '../lib/arquivo';
import { useDocumentoStore } from '../store/useDocumentoStore';
import styles from './FileDropzone.module.css';

function FileDropzone({ children }) {
  const [arrastando, setArrastando] = useState(false);
  const [erro, setErro] = useState(null);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);
  const dragCounter = useRef(0);

  useEffect(() => {
    const bloquearComportamentoPadrao = (e) => e.preventDefault();
    window.addEventListener('dragover', bloquearComportamentoPadrao);
    window.addEventListener('drop', bloquearComportamentoPadrao);
    return () => {
      window.removeEventListener('dragover', bloquearComportamentoPadrao);
      window.removeEventListener('drop', bloquearComportamentoPadrao);
    };
  }, []);

  const onDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setArrastando(true);
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setArrastando(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e) => {
    e.preventDefault();
    dragCounter.current = 0;
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
      onDragEnter={onDragEnter}
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
