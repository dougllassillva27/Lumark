import styles from './PreviewPane.module.css';

function PreviewPane() {
  return (
    <div className={styles.container}>
      <h1>Título Mockado</h1>
      <p>Edite este texto para testar a responsividade do painel nos 3 modos de visualização.</p>
    </div>
  );
}

export default PreviewPane;
