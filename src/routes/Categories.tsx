import { useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { getAllCategories } from "../redux/reducers/categoryReducer";

export default function Categories() {
    const categories = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getAllCategories())
    },[dispatch]);

    return (
        <>
        <h1>Categories</h1>
        <div className="main__categories-wrapper">
            {categories.map(category => <CategoryCard key={category.id} category={category}/>)}
        </div>
        </>
    )
}