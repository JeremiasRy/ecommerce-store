import { useNavigate } from "react-router-dom";
import IProduct from "../types/interfaces/product";

export default function ProductCard(props: {product:IProduct}) {
    const navigate = useNavigate();
    return (
        <div className="product-card div-bg-img" key={props.product.id} onClick={() => navigate(`${props.product.id}`)} style={{backgroundImage: `url(${props.product.images[0]})`}}>
            <div className="product-card__overlay"></div>
            <h4>{props.product.title}</h4>
            <p>{props.product.price}€</p>
        </div>
    )
}