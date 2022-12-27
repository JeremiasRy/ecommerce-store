import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SlideShow from "../components/Slideshow";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import IProduct from "../types/interfaces/product";

export default function Home() {
    const user = useAppSelector(state => state.user);
    const products = useAppSelector(state => state.products);
    const [ forSlideShow, setSlideShow ] = useState<IProduct[]>([])
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (forSlideShow.length === 0) {
            setSlideShow([...products]);
        }
    }, [products, dispatch, forSlideShow])

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
                    {forSlideShow.length !== 0 && <SlideShow images={forSlideShow.slice(45, 50).map(product => product.images[0])}/>}
                </div>
            </div>
            <Outlet />
        </div>
    )
}