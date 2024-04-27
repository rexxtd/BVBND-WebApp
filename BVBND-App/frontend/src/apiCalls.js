import axios from "axios";

export const loginCallCustomer = async (userCredentials, dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try {
        const res = await axios.post("/api/customers/login", userCredentials);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    } catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err});
    }
}

export const loginCallDoctor = async (userCredentials, dispatch) => {
    dispatch({type:"LOGIN_START"});
    try {
        const res = await axios.post("/api/doctors/login", userCredentials);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    } catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err});
    }
}