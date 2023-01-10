import { useEffect } from "react";
import { useParams } from "react-router-dom"
import SingleProductInfo from "../components/main/SingleProductInfo";
import SlideShow from "../components/Slideshow";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { getProduct } from "../redux/reducers/productReducer";

export default function SingleProduct() {
    const { id } = useParams();
    const product = useAppSelector(state => state.products);
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProduct(Number(id)))
    }, [id, dispatch])

    return (
        <div className="single-product">
            <h2>{product[0].title}</h2>    
            <div className="single-product__wrapper">
                <div className="single-product-wrapper__left-column">
                    <SlideShow images={product[0].images} />
                </div>
                <div className="single-product-wrapper__right-column">  
                    <SingleProductInfo product={product[0]} userIsAdmin={user !== null && user.role === "admin"}/>
                </div>
            </div>
        </div>
    )
}