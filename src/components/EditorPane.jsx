import styles from './EditorPane.module.css';

function EditorPane() {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        defaultValue="# Título Mockado&#10;&#10;Edite este texto para testar a responsividade do painel nos 3 modos de visualização."
      />
    </div>
  );
}

export default EditorPane;
