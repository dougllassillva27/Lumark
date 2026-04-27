import Layout from './components/Layout';
import EmptyState from './components/EmptyState';
import EditorPane from './components/EditorPane';
import PreviewPane from './components/PreviewPane';
import FileDropzone from './components/FileDropzone';
import PasteModal from './components/PasteModal';
import { useDocumentoStore } from './store/useDocumentoStore';
import { useAtalhos } from './hooks/useAtalhos';

function App() {
  const documentoAtivo = useDocumentoStore((state) => state.documentoAtivo);
  const preferencias = useDocumentoStore((state) => state.preferencias);
  const modo = preferencias.modoVisualizacao;

  useAtalhos();

  const ehJson = documentoAtivo?.nome?.toLowerCase().endsWith('.json');

  return (
    <Layout>
      <FileDropzone>
        {!documentoAtivo ? (
          <EmptyState />
        ) : (
          <div className={`workspace ${modo} ${ehJson ? 'modo-json' : ''}`}>
            {(modo === 'edicao' || modo === 'split') && <EditorPane />}
            {(modo === 'leitura' || modo === 'split') && <PreviewPane />}
          </div>
        )}
      </FileDropzone>
      <PasteModal />
    </Layout>
  );
}

export default App;
