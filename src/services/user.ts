import ICredentials from "../types/interfaces/credentials";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const login = async (credentials:ICredentials) => {
    let result = await axios.post(`${baseUrl}/auth/login`, credentials)
    return result.data
}
const checkEmailAvailability = async (email:string):Promise<boolean> => {
    return true
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

const userService = {
    login,
    checkEmailAvailability,
    getUser,
}

export default userService;

