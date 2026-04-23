import Layout from './components/Layout';
import EmptyState from './components/EmptyState';
import EditorPane from './components/EditorPane';
import PreviewPane from './components/PreviewPane';
import { useDocumentoStore } from './store/useDocumentoStore';

function App() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  const preferencias = useDocumentoStore((state) => state.preferencias);
  const modo = preferencias.modoVisualizacao;

  return (
    <Layout>
      {!documentoAtivo ? (
        <EmptyState />
      ) : (
        <div className={`workspace ${modo}`}>
          {(modo === 'edicao' || modo === 'split') && <EditorPane />}
          {(modo === 'leitura' || modo === 'split') && <PreviewPane />}
        </div>
      )}
    </Layout>
  );
}

export default App;
