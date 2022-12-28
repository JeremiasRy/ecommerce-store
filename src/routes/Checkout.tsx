import { useEffect } from "react";
import { isMetaProperty } from "typescript";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { addToCart, removeFromCart } from "../redux/reducers/checkoutReducer";

export default function Checkout() {
    const checkout = useAppSelector(state => state.checkout);
    const dispatch = useAppDispatch()
    const total = checkout.reduce((a, b) => a + b.product.price * b.amount, 0);

    return (
        <div className="checkout">
            <h1 className="checkout__header">Checkout</h1>
            <ul className="checkout__products">
                {checkout.map(item => <li key={item.product.id}>{item.product.title} {item.product.price}€ {item.amount}x <button className="button basic small" onClick={() => dispatch(addToCart(item.product))}>Add</button><button className="button remove small" onClick={() => dispatch(removeFromCart(item.product))}>Remove</button></li>)}
            </ul>
            <p>Total: {total}€</p>
            <button className="checkout__button button basic">Place order</button>
        </div>
    )
}