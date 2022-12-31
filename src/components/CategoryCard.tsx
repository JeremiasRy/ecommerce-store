import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHook";
import { getCategory } from "../redux/reducers/categoryReducer";
import { getProductsByCategory } from "../redux/reducers/productReducer";
import ICategory from "../types/interfaces/category";

export default function CategoryCard(props: {category: ICategory}) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <div 
        className="category-card div-bg-img" 
        onClick={() => {
            dispatch(getCategory(props.category.id));
            dispatch(getProductsByCategory(props.category.id));
            navigate(`/products`);
        }} 
        style={{backgroundImage: `url(${props.category.image})`}}>
            <div className="category-card__overlay"></div>
            <h2>{props.category.name}</h2>
        </div>
    )
}