import ICategory from "./category"

export default interface IProduct {
    id:number
    title:string
    price:number
    description:string
    category: ICategory
    images:string[]
}