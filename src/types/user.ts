export type User = {
    id:number
    name:string
    role: "admin" | "customer"
    email:string
    password:string
    avatar:string
    refreshtoken:string
} | null