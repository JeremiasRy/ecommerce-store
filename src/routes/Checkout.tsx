import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { addToCart, emptyCart, removeFromCart } from "../redux/reducers/checkoutReducer";

export default function Checkout() {
    const checkout = useAppSelector(state => state.checkout);
    const dispatch = useAppDispatch()
    const total = checkout.reduce((a, b) => a + b.product.price * b.amount, 0);

    return (
        <div className="checkout">
            <h1 className="checkout__header">Checkout</h1>
            <table className="checkout__products">
                <tbody>
                <tr>
                    <th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th>Actions</th>
                </tr>
                {checkout.map(item => 
                    <tr key={item.product.id}>
                        <td>{item.product.title}</td>
                        <td>{item.product.price}€</td>
                        <td>{item.amount}x</td>
                        <td>{item.product.price * item.amount}€</td>
                        <td>
                            <button className="button basic small" onClick={() => dispatch(addToCart(item.product))}>+</button>
                            <button className="button basic small" onClick={() => dispatch(removeFromCart(item.product))}>-</button></td>
                    </tr>)}
                    <tr>
                        <td></td><td></td><td></td><td><em>{total}€</em></td>
                        <td>
                            <button className="checkout__button button basic">Place order</button>
                            <button onClick={() => dispatch(emptyCart())}className="checkout__button button basic remove">Empty cart</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}