import { useParams } from "react-router-dom"

export default function SingleProduct() {
    const { id } = useParams();
    return (
        <>Single product: {id}</>
    )
}