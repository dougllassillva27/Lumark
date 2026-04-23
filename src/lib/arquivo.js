import { validarArquivo } from './validacao';

export async function lerArquivoTexto(arquivo) {
  return new Promise((resolve, reject) => {
    try {
      validarArquivo(arquivo);
    } catch (erro) {
      return reject(erro);
    }

    const leitor = new FileReader();
    leitor.onload = (evento) => resolve(evento.target.result);
    leitor.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
    leitor.readAsText(arquivo);
  });
}

export function criarDocumentoAPartirDeArquivo({ nome, conteudo, tamanho }) {
  return {
    nome,
    origem: 'upload',
    conteudo,
    tamanho,
    dataAbertura: new Date().toISOString(),
  };
}
