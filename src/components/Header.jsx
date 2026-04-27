import { useDocumentoStore } from '../store/useDocumentoStore';
import ViewSwitcher from './ViewSwitcher';
import styles from './Header.module.css';

function Header() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);

  return (
    <header className={styles.cabecalho}>
      <div className={styles.espacador}></div>
      {documentoAtivo && <ViewSwitcher />}
    </header>
  );
}

export default Header;
