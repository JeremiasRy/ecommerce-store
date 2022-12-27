import { useEffect } from "react";
import SlideShow from "../components/Slideshow";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { getAllProducts } from "../redux/reducers/productReducer";
import IProduct from "../types/interfaces/product";

export default function Home() {
    const user = useAppSelector(state => state.user);
    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (products.length <= 5) {
            dispatch(getAllProducts())
        }
    }, [products, dispatch])

    function favoriteProducts():IProduct[] {
        let favourites:IProduct[] = [];
        while (favourites.length <= 5) {
            favourites.push(products[Math.floor(Math.random() * products.length - 1)])
        }
        return favourites;
    }
    if (products.length <= 5) {
        return <></>;
    }
    return (
        <div className="home-page">
            <h1>Web store</h1>
            {user.length !== 0 && <p>Welcome back {user[0].name}</p>}
            <div className="home-page__content-wrapper">
                <div className="home-page_content-wrapper__left">
                    <h4>Our mission</h4>
                    <p>We here at web store want to give you the best products!</p>
                </div>
                <div className="home-page_content-wrapper__right">
                    <SlideShow images={favoriteProducts().map(product => product.images[0])}/>
                </div>
            </div>
        </div>
    )
}