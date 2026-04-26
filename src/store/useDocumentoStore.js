import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDocumentoStore = create(
  persist(
    (set) => ({
      documentoAtivo: null,
      historicoMetadados: [],
      preferencias: {
        modoVisualizacao: 'split',
      },
      ui: {
        modalColarAberto: false,
      },
      setModoVisualizacao: (modo) =>
        set((state) => ({
          preferencias: { ...state.preferencias, modoVisualizacao: modo },
        })),
      setDocumentoAtivo: (doc) =>
        set((state) => {
          if (!doc) return { documentoAtivo: null };

          const novoHistorico = [
            {
              nome: doc.nome,
              origem: doc.origem,
              tamanho: doc.tamanho,
              dataAbertura: doc.dataAbertura,
            },
            ...state.historicoMetadados.filter((h) => h.nome !== doc.nome),
          ].slice(0, 5);

          return {
            documentoAtivo: doc,
            historicoMetadados: novoHistorico,
          };
        }),
      setModalColarAberto: (aberto) =>
        set((state) => ({
          ui: { ...state.ui, modalColarAberto: aberto },
        })),
    }),
    {
      name: 'lumark-storage',
      partialize: (state) => {
        const { ui, ...estadoPersistido } = state;

        if (estadoPersistido.documentoAtivo?.conteudo?.length > 300000) {
          return {
            ...estadoPersistido,
            documentoAtivo: { ...estadoPersistido.documentoAtivo, conteudo: '' },
          };
        }

        return estadoPersistido;
      },
    }
  )
);
