import axios from "axios";
import {server} from "../store.js";
export const loadUser=()=>async(dispatch)=>{
    try {
        const {data} =await axios.get(`${server}/user/me/profile`,{
            withCredentials:true,
        });

        dispatch({
            type:"setLoggedIn",
        });

    } catch (error) {
        console.log("Login failed");
        

    }
}
