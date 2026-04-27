import { describe, it, expect } from 'vitest';
import { validarExtensao, validarTamanho, validarArquivo, TAMANHO_MAXIMO_ARQUIVO } from '../src/lib/validacao';

describe('Validação de Arquivos', () => {
  describe('validarExtensao()', () => {
    it('deve aceitar arquivos .md, .txt e .json', () => {
      expect(validarExtensao('documento.md')).toBe(true);
      expect(validarExtensao('anotacoes.txt')).toBe(true);
      expect(validarExtensao('dados.json')).toBe(true);
      expect(validarExtensao('DOCUMENTO.MD')).toBe(true); // Case insensitive
    });

    it('deve rejeitar arquivos com extensões não permitidas', () => {
      expect(validarExtensao('imagem.png')).toBe(false);
      expect(validarExtensao('script.js')).toBe(false);
      expect(validarExtensao('documento.pdf')).toBe(false);
      expect(validarExtensao('arquivo_sem_extensao')).toBe(false);
    });
  });

  describe('validarTamanho()', () => {
    it('deve aceitar arquivos dentro do limite de 2MB', () => {
      expect(validarTamanho(1024)).toBe(true); // 1KB
      expect(validarTamanho(TAMANHO_MAXIMO_ARQUIVO)).toBe(true); // Exatamente 2MB
    });

    it('deve rejeitar arquivos acima do limite de 2MB', () => {
      expect(validarTamanho(TAMANHO_MAXIMO_ARQUIVO + 1)).toBe(false);
    });
  });

  describe('validarArquivo()', () => {
    it('deve retornar true para arquivo válido', () => {
      const arquivoValido = { name: 'teste.md', size: 1024 };
      expect(validarArquivo(arquivoValido)).toBe(true);
    });

    it('deve lançar erro para extensão inválida', () => {
      const arquivoInvalido = { name: 'imagem.jpg', size: 1024 };
      expect(() => validarArquivo(arquivoInvalido)).toThrow('Apenas arquivos .md, .txt e .json são permitidos.');
    });

    it('deve lançar erro para tamanho excedido', () => {
      const arquivoGigante = { name: 'gigante.json', size: TAMANHO_MAXIMO_ARQUIVO + 1024 };
      expect(() => validarArquivo(arquivoGigante)).toThrow('O arquivo excede o limite de 2MB.');
    });
  });
});
