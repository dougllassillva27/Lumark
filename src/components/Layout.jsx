import Header from './Header';
import Toolbar from './Toolbar';
import RestoreSessionBanner from './RestoreSessionBanner';
import styles from './Layout.module.css';
import { useDocumentoStore } from '../store/useDocumentoStore';

function Layout({ children }) {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  return (
    <div className={styles.container}>
      <RestoreSessionBanner />
      <Header />
      {documentoAtivo && <Toolbar />}
      <main className={styles.conteudoPrincipal}>{children}</main>
    </div>
  );
}

export default Layout;
