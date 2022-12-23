import { useParams } from "react-router-dom"
import { useAppSelector } from "../hooks/reduxHook";

export default function SingleProduct() {
    const { id } = useParams();
    const product = useAppSelector(state => state.products).find(product => product.id === Number(id));
    return (
        <>{product?.title}</>
    )
}