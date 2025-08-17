import { create } from 'zustand'

type StoreAuth = {
    isLogin: boolean,
    Username: string,
    Name: string,
    Id: number | null,
    Token:string
    Email: string,
    Password: string,
    Login: (id: number,username:string) => void;
    Logout: () => void;
    setEmail: (email: string) => void;
    setId: (id: number) => void;
    setUsername: (username: string) => void;
    setName: (name: string) => void;
    setPassword: (password: string) => void;
}

export const useStoreAuth = create<StoreAuth>((set) => ({

    isLogin: false,
    Username: '',
    Name: '',
    Id: null,
    Token: '',
    Email: '',
    Password: '',

    Login: (id,username) => { set({ isLogin: true }), set({ Id: id }),set({Username:username}) },
    Logout: () => { set({ isLogin: false, Id:null,Token:'' }) },
    setId: (id) => { set({ Id: id }) },
    setName: (name) => { set({ Name: name }) },
    setUsername: (username) => { set({ Username: username }) },
    setEmail: (email) => { set({ Email: email }) },
    setPassword: (password) => { set({ Password: password }) }
}))