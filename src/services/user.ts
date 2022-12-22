const baseUrl = process.env.REACT_APP_BASE_URL;
const jwtAccessToken = "";

const login = async () => {

}
const checkEmailAvailability = async (email:string):Promise<boolean> => {
    return true
}
const getUser = async () => {

}

const userService = {
    login,
    checkEmailAvailability,
    getUser,
}

export default userService;

