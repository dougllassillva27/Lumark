import { useState } from 'react';
import { useDocumentoStore } from '../store/useDocumentoStore';
import styles from './PasteModal.module.css';

function PasteModal() {
  const aberto = useDocumentoStore((state) => state.ui.modalColarAberto);
  const setModalColarAberto = useDocumentoStore((state) => state.setModalColarAberto);
  const setDocumentoAtivo = useDocumentoStore((state) => state.setDocumentoAtivo);
  const [texto, setTexto] = useState('');

  if (!aberto) return null;

  const handleConfirmar = () => {
    if (!texto.trim()) return;

    let nomeSugerido = 'Documento colado.md';
    try {
      JSON.parse(texto);
      nomeSugerido = 'Documento colado.json';
    } catch (e) {}

    setDocumentoAtivo({
      nome: nomeSugerido,
      origem: 'colar',
      conteudo: texto,
      tamanho: new Blob([texto]).size,
      dataAbertura: new Date().toISOString(),
    });
    setModalColarAberto(false);
    setTexto('');
  };

  const handleCancelar = () => {
    setModalColarAberto(false);
    setTexto('');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.titulo}>Colar Texto</h2>
        <textarea
          className={styles.textarea}
          placeholder="Cole seu conteúdo Markdown ou JSON aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          autoFocus
        />
        <div className={styles.acoes}>
          <button className={styles.botaoCancelar} onClick={handleCancelar}>
            Cancelar
          </button>
          <button className={styles.botaoConfirmar} onClick={handleConfirmar}>
            Usar conteúdo
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasteModal;
