import { rest } from "msw";
import { setupServer } from "msw/node"
import IProduct, { ISubmitProduct } from "../types/interfaces/product";
import dummyData from "./dummyData";

const handler = [
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json(dummyData.allProducts)
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products", async (req,res,ctx) => {
        let itemSubmitted:ISubmitProduct = await req.json();
        let newItem:IProduct = {
            id: 4,
            category: {id: Number(itemSubmitted.categoryId), name: "jes", image: "www.fakeimg.com"},
            title: itemSubmitted.title,
            description: itemSubmitted.description,
            price: itemSubmitted.price,
            images: itemSubmitted.images
        };
        return res(ctx.json(newItem));
    }),
    rest.put("https://api.escuelajs.co/api/v1/products/0", async (req,res,ctx) => {
        let upProduct:ISubmitProduct = await req.json();
        let newProduct:IProduct = {
            id: 0, 
            title: upProduct.title, 
            description: upProduct.description, 
            price: upProduct.price,
            category: {id: Number(upProduct.categoryId), name: "jes", image: "www.fakeimg.com"},
            images: upProduct.images
        }
        return res(ctx.json(newProduct))
    }),
    rest.delete("https://api.escuelajs.co/api/v1/products/0", async (req,res,ctx) => {
        return res(ctx.json(dummyData.allProducts.filter(product => product.id !== 0)))
    }),
    rest.delete("https://api.escuelajs.co/api/v1/products/4", async (req,res,ctx) => {
        return res(ctx.json(dummyData.allProducts.filter(product => product.id !== 0)))
    }),
    rest.post("https://api.escuelajs.co/api/v1/auth/login", async (req,res,ctx) => {
        let body = await req.json()
        if (body.password !== dummyData.userAuth[0].password) {
            return res(ctx.status(401, "invalid password"));
        }
        return res(ctx.json({access_token: dummyData.userAuth[0].authkey}))
    }),
    rest.get("https://api.escuelajs.co/api/v1/auth/profile", async (req,res,ctx) => {
        return res(ctx.json(dummyData.user[0]));
    })
]

const server = setupServer(...handler);
export default server;