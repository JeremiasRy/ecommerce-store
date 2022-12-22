import ICredentials from "../types/interfaces/credentials";

const baseUrl = process.env.REACT_APP_BASE_URL;

const login = async (credentials:ICredentials) => {
    let result = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    })
    let json = await result.json()
    return json
}
const checkEmailAvailability = async (email:string):Promise<boolean> => {
    return true
}
const getUser = async (accessToken:string) => {
    let result = await fetch(`${baseUrl}/auth/profile`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'content-type': 'application/json'
        }
    })
    let json = await result.json();
    return json;
}

const userService = {
    login,
    checkEmailAvailability,
    getUser,
}

export default userService;

