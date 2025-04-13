import {create} from 'zustand'

interface pageState {
    pageNumber: number;
    increasePageNum:()=>void,
    decreasePageNum:()=>void
}


export const PageStore = create<pageState>()((set) =>({
pageNumber: 0,
increasePageNum:()=>set((state) =>({ pageNumber: state.pageNumber +1})),

decreasePageNum: () => set((state)  => ({pageNumber: state.pageNumber -1}))
      
}))