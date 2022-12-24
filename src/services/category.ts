import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

const getAllCategories = async () => {
    let result = await axios.get(`${baseUrl}/categories`);
    return result.data;
};

const getProductsByCategory = async (id:number) => {
    let result = await axios.get(`${baseUrl}/categories/${id}/products`);
    return result.data;
};

const getCategory = async (id:number) => {
    let result = await axios.get(`${baseUrl}/categories/${id}`);
    return result.data;
}

const categoryService = {
    getAllCategories,
    getProductsByCategory,
    getCategory
};

export default categoryService;