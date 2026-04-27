export function formatarJson(texto) {
  try {
    const obj = JSON.parse(texto);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    throw new Error('JSON inválido.');
  }
}
