import Header from './Header';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.conteudoPrincipal}>{children}</main>
    </div>
  );
}

export default Layout;
