import ICategory from "../types/interfaces/category";

export default function CategoryCard(props: {category: ICategory}) {
    return (
        <div className="category-card" style={{backgroundImage: `url(${props.category.image})`}}>
            <div className="category-card__overlay"></div>
            <h2>{props.category.name}</h2>
        </div>
    )
}