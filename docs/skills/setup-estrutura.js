import fs from 'fs';
import path from 'path';

const diretorios = [
  'public',
  'src/components',
  'src/lib',
  'src/store',
  'src/styles',
  'src/constants',
  'src/hooks',
  'tests',
];

diretorios.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`[OK] Diretório criado: ${dir}`);
});

const arquivosParaMover = [
  { de: 'main.jsx', para: 'src/main.jsx' },
  { de: 'App.jsx', para: 'src/App.jsx' },
];

arquivosParaMover.forEach(({ de, para }) => {
  if (fs.existsSync(de)) {
    fs.renameSync(de, para);
    console.log(`[OK] Arquivo movido: ${de} -> ${para}`);
  }
});

console.log('Estrutura finalizada com sucesso. Pode excluir este script.');
