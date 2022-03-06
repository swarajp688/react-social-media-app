import { createContext } from "react";
import {useProvideAuth} from '../hooks';

const initialState = {
    user:null,
    login:()=> {},
    logout:()=>{},
    loading:true,
    signup:()=>{},
    updateUser:()=>{},
    updateUserFriends:()=>{},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) =>{
    const auth = useProvideAuth();
    console.log('auth',auth)
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}