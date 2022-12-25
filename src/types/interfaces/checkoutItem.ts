import IProduct from "./product";

export default interface ICheckoutItem {
    product: IProduct,
    amount: number
}