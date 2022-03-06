import { useContext, useState ,useEffect} from "react";
import { AuthContext } from "../providers/AuthProvider";
import { editProfile, login as userLogin, register , fetchFriends} from "../api";
import { getItemFromLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, setItemInLocalStorage } from "../utils";
import jwtDecode from "jwt-decode";
export const useAuth = ()=> {
    return useContext(AuthContext);
}

export const useProvideAuth = ()=> {
    const [user , setUser] = useState(null);
    const [loading , setLoading]= useState(true);
    useEffect(() => {
        const getUser =async ()=>{
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            if(userToken){
                let friends = [];
                const user =jwtDecode(userToken);
                const response = await fetchFriends();
                
                if(response.success){
                    friends= response.data.friends;
                }
                setUser({
                    ...user,
                    friends,
                });
                
            }
            setLoading(false);
        }
        
        getUser();
    }, [])

    const login = async (email , password)=> {
        const response = await userLogin(email , password);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY ,response.data.token ? response.data.token : null);
            return {
                success:true
            }
        }else {
            return {
                success:false,
                message :response.message,
            }
        }
    }
    const updateUser = async (userId , email , password , confirmPassword) =>{
        const response = await editProfile(userId , email , password , confirmPassword);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY ,response.data.token ? response.data.token : null);

            return {
                success:true
            }
        }else {
            return {
                success:false,
                message:`${response.message}hoook error`
            }
        }
    }

    const signup = async (userName , email , password , confirmPassword) =>{
        const response = await register(userName , email , password , confirmPassword);
        if(response.success){
            return {
                success:true
            }
        }else {
            return {
                success:false,
                message:`${response.message}hoook error`
            }
        }
    }
    const logout = ()=> {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);  

    };
    const updateUserFriends = (addFriend,friend)=>{
        if(addFriend) {
            console.log('main user', user)
            setUser({
                ...user,
                friend:[...user.friends, friend]
            })
            return;
        }
        const newFriend = user.friends.filter((f)=> f.to_user._id !== friend.to_user._id);
        setUser({
            ...user,
            friends: newFriend,
        })

    }
    return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,
        updateUserFriends,
    }
}