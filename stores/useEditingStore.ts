import create from "zustand";


type EditingStore = {
  editing: boolean,
  toggleEditing: (x: boolean) => void
}

export const useEditingStore = create<EditingStore>((set) => ({
  editing: false,
  toggleEditing: (x) => set({editing: !x})
}));