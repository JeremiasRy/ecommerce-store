import axios from "axios";
import { ISubmitProduct } from "../types/interfaces/product";

const baseUrl = process.env.REACT_APP_BASE_URL

const getProducts = async (page:number) => {
    let result = await axios.get(`${baseUrl}/products/`, {params: {offset: page * 20, limit: 20}});
    return result.data;
};
const createProduct = async (newProduct:ISubmitProduct) => {
    let result = await axios.post(`${baseUrl}/products/`, newProduct);
    return result.data;
}
const updateProduct = async (update:ISubmitProduct, id:number) => {
    console.log(update);
    let result = await axios.put(`${baseUrl}/products/${id}`, update)
    return result.data;
}
const getProduct = async (id:number) => {
    let result = await axios.get(`${baseUrl}/products/${id}`);
    return result.data;
};
const deleteProduct = async (id:number) => {
    let result = await axios.delete(`${baseUrl}/products/${id}`)
    return result
}
const productService = {
    deleteProduct,
    getProducts,
    getProduct,
    createProduct,
    updateProduct
};

export default productService;