import { create } from 'zustand'

type StoreHome = {


    Meeps: Meep[];


}
type Meeps = {

    Meeps: Meep[]

}
type Meep = {
    title: String,
    body: String,
    creatorId: number
}

export const useStoreHome = create<StoreHome>((set) => ({

    Meeps: [],


}))