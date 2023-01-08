import { useNavigate } from "react-router-dom";
import ICategory from "../types/interfaces/category";

export default function CategoryCard(props: {category: ICategory}) {
    const navigate = useNavigate();

    function changeCategory() {
        navigate(`/categories/${props.category.id}`);
    }
    return (
        <div 
        className="category-card div-bg-img" 
        onClick={changeCategory} 
        style={{backgroundImage: `url(${props.category.image})`}}>
            <div className="category-card__overlay"></div>
            <h2>{props.category.name}</h2>
        </div>
    )
}