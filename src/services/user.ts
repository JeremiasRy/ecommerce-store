import ICredentials, { IRegister } from "../types/interfaces/credentials";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const login = async (credentials:ICredentials) => {
    let result = await axios.post(`${baseUrl}/auth/login`, credentials)
    return result.data
}
const checkEmailAvailability = async (email:string) => {
    let result = await axios.post(`${baseUrl}/users/is-available`, {email: email}) 
    return result.data;
}
const createNewUser = async (register:IRegister) => {
    let result = await axios.post(`${baseUrl}/users/`, register)
    return result.data;
}
const getUser = async (accessToken:string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    let result = await axios.get(`${baseUrl}/auth/profile`, config)
    return result.data
}
const refresh = async (token:string) => {
    let result = await axios.post(`${baseUrl}/auth/refresh-token`, {refreshToken: token});
    return result.data;
}

const userService = {
    login,
    checkEmailAvailability,
    getUser,
    createNewUser,
    refresh
}

export default userService;

