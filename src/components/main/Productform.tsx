import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getAllCategories } from "../../redux/reducers/categoryReducer";
import IProduct from "../../types/interfaces/product";

export default function ProductForm(props: {submitAction:any, update:IProduct | undefined}) {
    const categories = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [img, setImg] = useState("");
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getAllCategories());
        if (props.update !== undefined) { 
            setTitle(props.update.title);
            setPrice(props.update.price);
            setDescription(props.update.description);
            setCategoryId(props.update.category.id);
            setImages(props.update.images);
            setId(props.update.id);
        }
    }, [dispatch, props.update])

    function addUrl() {
        setImages([...images, img])
        setImg("")
    }
    function submitProduct() {
        if (props.update) {
            let upProduct = {
                id: id,
                title: title,
                price: price,
                description: description,
            }
            console.log(upProduct);
            dispatch(props.submitAction(upProduct))
            return;
        }
        dispatch(props.submitAction({title, description, price, categoryId, images}))
    }

    return (
        <div className="product-form">
            <label> 
                <p>Title</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            </label>
            <label>
                <p>Price in €</p>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.currentTarget.value))}/>
            </label>
            <label>
                <p>Description</p>
                <textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            </label>
            {!props.update && 
            <>
            <label>
                <p>Category</p>
                <select onChange={(e) => setCategoryId(Number(e.currentTarget.value))}>
                    {categories.map(category => 
                        <option value={category.id} key={category.id}>{category.name}</option>
                    )}
                </select>
            </label>
            <label>
                <p>Image</p>
                <input type="url" value={img} onChange={(e) => setImg(e.currentTarget.value)}/><br/>
                <button className="button basic" onClick={addUrl}>Add url</button>
            </label>
            <ul>
                {images.map(img => <li key={img}>{img} <button className="button small remove" onClick={() => setImages(images.filter(image => image !== img))}>Remove url</button></li>)}
            </ul></>
            }
            <button className="button basic" onClick={submitProduct}>{!props.update ? "Submit" : "Update"}</button>
        </div>
    )
}