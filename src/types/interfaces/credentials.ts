export default interface ICredentials {
    email:string
    password:string
}
export interface IRegister extends ICredentials {
    name: string,
    avatar: string
}