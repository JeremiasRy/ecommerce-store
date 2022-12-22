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
const productService = {
    getProducts,
    getProduct
};

export default productService;