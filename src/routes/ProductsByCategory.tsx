import { useEffect } from "react";
import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getCategory } from "../redux/reducers/categoryReducer";
import { getProductsByCategory } from "../redux/reducers/productReducer";

export default function ProductsByCategory() {
    const { categoryId } = useParams();
    const products = useAppSelector(state => state.products);
    const category = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProductsByCategory(Number(categoryId)));
        dispatch(getCategory(Number(categoryId)));
    }, [dispatch, categoryId]);

    return (
        <div className="all-products">
            <h1>{category[0].name}</h1>
            <div className="main__products-wrapper">
                {products.length === 0 && <h4>There are no products here</h4>}
                {products.map(product => <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    )
}