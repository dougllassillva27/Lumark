import { create } from 'zustand';

export const useDocumentoStore = create((set) => ({
  documentoAtivo: null,
  preferencias: {
    modoVisualizacao: 'split',
  },
  setModoVisualizacao: (modo) =>
    set((state) => ({
      preferencias: { ...state.preferencias, modoVisualizacao: modo },
    })),
  setDocumentoAtivo: (doc) => set({ documentoAtivo: doc }),
}));
