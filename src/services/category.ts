import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

const getCategory = async (id:number) => {
    
};

const getAllCategories = async () => {
    let result = await axios.get(`${baseUrl}/categories`);
    return result.data
};

const getProductsByCategory = async (id:number) => {

};

const categoryService = {
    getCategory,
    getAllCategories,
    getProductsByCategory
};

export default categoryService;