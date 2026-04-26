export async function copiarParaClipboard(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (e) {
    console.error('Falha ao copiar para área de transferência:', e);
    return false;
  }
}
