import IProduct, { ISubmitProduct } from "../types/interfaces/product";
import IUser from "../types/interfaces/user";

const validNewItem:ISubmitProduct = {
    title: "I added/updated this",
    price: 22,
    description: "It's a dummy product",
    categoryId: 0,
    images: ["www.fakeurl.com", "www.morefakeurls.com"]
};
const invalidNewItem:ISubmitProduct = {
    title: "I added this",
    price: -1000000,
    description: "It's an invalid product",
    categoryId: 0,
    images: ["www.fakeurl.com", "www.morefakeurls.com"]
};
const allProducts = [
    {
        id: 0,
        title: "Fake product 1",
        description: "This product does not exist",
        price: 100,
        category: 2,
        images: ["www.notAUrl.com", "www.It'sNotReal.com"]
    },
    {
        id: 1,
        title: "Search me",
        description: "JEe jeejee",
        price: 122,
        category: 1,
        images: ["www.Allright.com", "www.Hehe.com"]
    },
    {
        id: 3,
        title: "Fake product 3",
        description: "This product might exist...",
        price: 166,
        category: 0,
        images: ["www.Hahaha.com", "www.Haha.com"]
    }]
    const userAuth = [{
        email: "jes@mail.com",
        password: "qwerty",
        authkey: "jwt"
    }]
    const user:IUser[] = [{
        id: 1,
        name: "dumdum",
        password: "qwerty",
        role: "customer",
        email: "jes@mail.com"
    }]

const dummyData = { validNewItem, invalidNewItem, allProducts, userAuth, user }

export default dummyData;