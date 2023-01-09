import { useEffect } from "react";
import SlideShow from "../components/Slideshow";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { getProductsPage } from "../redux/reducers/productReducer";

export default function Home() {
    const user = useAppSelector(state => state.user);
    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProductsPage(0));
    }, [dispatch])

    return (
        <div className="home-page">
            <h1>Web store</h1>
            {user !== null && <p>Welcome back {user.name}</p>}
            <div className="home-page__content-wrapper">
                <div className="home-page_content-wrapper__left">
                    <h4>Our mission</h4>
                    <p>We here at web store want to give you the best products!</p>
                </div>
                <div className="home-page_content-wrapper__right">
                    <SlideShow images={products.slice(5,10).map(product => product.images[0])}/>
                </div>
            </div>
        </div>
    )
}