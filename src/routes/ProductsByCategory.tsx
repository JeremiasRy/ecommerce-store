import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getCategory } from "../redux/reducers/categoryReducer";
import { getProductsByCategory } from "../redux/reducers/productReducer";

export default function ProductsByCategory() {
    const products = useAppSelector(state => state.products);
    const category = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductsByCategory(Number(id)));
        dispatch(getCategory(Number(id)))
    },[dispatch, id]);

    if (products.length === 0 || category.length === 0) {
        return <></>;
    }

    return (
        <div className="products-by-category">
            <h1>{category[0].name}</h1>
            <p>Our {category[0].name} are the most prestigious of their kind</p>
            <div className="main__products-wrapper">
                {products.map(product => <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    )

}