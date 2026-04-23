import { create } from 'zustand';

export const useDocumentoStore = create((set) => ({
  documentoAtivo: null,
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
  setDocumentoAtivo: (doc) => set({ documentoAtivo: doc }),
  setModalColarAberto: (aberto) =>
    set((state) => ({
      ui: { ...state.ui, modalColarAberto: aberto },
    })),
}));
