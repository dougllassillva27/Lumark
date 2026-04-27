export const TAMANHO_MAXIMO_ARQUIVO = 2 * 1024 * 1024; // 2MB

export function validarExtensao(nomeArquivo) {
  return /\.(md|txt|json)$/i.test(nomeArquivo);
}

export function validarTamanho(tamanho) {
  return tamanho <= TAMANHO_MAXIMO_ARQUIVO;
}

export function validarArquivo(arquivo) {
  if (!validarExtensao(arquivo.name)) {
    throw new Error('Apenas arquivos .md, .txt e .json são permitidos.');
  }
  if (!validarTamanho(arquivo.size)) {
    throw new Error('O arquivo excede o limite de 2MB.');
  }
  return true;
}
