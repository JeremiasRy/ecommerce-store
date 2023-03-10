import ICategory from "./category"

export interface ISubmitProduct {
    id: number | null,
    title:string
    price:number
    description:string
    categoryId: number | ICategory
    images:string[]
}
export default interface IProduct extends Omit<ISubmitProduct, "categoryId"> {
    id:number
    category: ICategory
}