import { useNavigate } from "react-router-dom";
import ICategory from "../types/interfaces/category";

export default function CategoryCard(props: {category: ICategory}) {
    const navigate = useNavigate();
    return (
        <div 
        className="category-card" 
        onClick={() => {
            navigate(`/products/category/${props.category.id}`);
        }} 
        style={{backgroundImage: `url(${props.category.image})`}}>
            <div className="category-card__overlay"></div>
            <h2>{props.category.name}</h2>
        </div>
    )
}