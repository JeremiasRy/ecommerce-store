import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

const getProducts = async () => {
    let result = await axios.get(`${baseUrl}/products`);
    return result.data;
};
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
    getProduct
};

export default productService;