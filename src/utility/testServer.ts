import { rest } from "msw";
import { setupServer } from "msw/node"
import IProduct, { ISubmitProduct } from "../types/interfaces/product";
import {User} from "../types/user";
import dummyData from "./dummyData";

const handler = [
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json(dummyData.allProducts)
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products", async (req,res,ctx) => {
        let { title, description, price, images, categoryId } = await req.json();
        let newItem = {
            id: 4,
            category: Number(categoryId),
            title,
            description,
            price,
            images
        };
        dummyData.allProducts.push(newItem);
        return res(ctx.json(newItem));
    }),
    rest.put("https://api.escuelajs.co/api/v1/products/0", async (req,res,ctx) => {
        let { title, description, price, categoryId, images } = await req.json();
        let newProduct = {
            id: 0, 
            title,
            description,
            price,
            category: Number(categoryId),
            images
        }
        dummyData.allProducts = dummyData.allProducts.map(product => product.id === newProduct.id ? newProduct : product);
        return res(ctx.json(newProduct))
    }),
    rest.delete("https://api.escuelajs.co/api/v1/products/0", async (req,res,ctx) => {
        dummyData.allProducts = dummyData.allProducts.filter(product => product.id !== 0);
        return res(ctx.json(dummyData.allProducts))
    }),
    rest.delete("https://api.escuelajs.co/api/v1/products/4", async (req,res,ctx) => {
        return res(ctx.json(dummyData.allProducts.filter(product => product.id !== 0)))
    }),
    rest.post("https://api.escuelajs.co/api/v1/auth/login", async (req,res,ctx) => {
        let { email, password } = await req.json()
        let auth = dummyData.userAuth.find(user => user.email === email && user.password === password);
        if (!auth) {
            return res(ctx.status(401, "Invalid password or user"));
        }
        return res(ctx.json({access_token: auth.authkey}))
    }),
    rest.get("https://api.escuelajs.co/api/v1/auth/profile", async (req,res,ctx) => {
        let auth = req.headers.get("authorization");
        let userAuth = dummyData.userAuth.find(user => `Bearer ${user.authkey}` === auth)
        if (!userAuth) {
            return res(ctx.status(401));
        }
        let user = dummyData.user.find(user => user?.email === userAuth?.email);
        return res(ctx.json(user));
    }),
    rest.post("https://api.escuelajs.co/api/v1/users/is-available", async (req,res,ctx) => {
        let body = await req.json();
        let isAvailable = !dummyData.user.some(user => user?.email === body.email);
        return res(ctx.json({isAvailable}));
    }),
    rest.post("https://api.escuelajs.co/api/v1/users", async (req,res,ctx) => {
        let { name, email, password, avatar } = await req.json();
        let newUser:User = {
            id: dummyData.user.length,
            name,
            role: "customer",
            email,
            password,
            avatar
        }
        dummyData.user.push(newUser);
        dummyData.userAuth.push({email, password, authkey: "jwt2"});
        return res(ctx.status(200));
    })
]

const server = setupServer(...handler);
export default server;