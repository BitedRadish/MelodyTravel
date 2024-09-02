import { create } from "zustand";

interface CategoryState {
    category: string;
    setCategory: (genre: string) => void;
}
const useCategoryState = create<CategoryState>((set) => ({
    category: "hiphop",
    setCategory: (genre) => set({ category: genre }),
}));

export default useCategoryState;
