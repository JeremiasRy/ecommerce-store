import CheckoutTable from "../components/main/CheckoutTable";

export default function Checkout() {
    return (
        <div className="checkout">
            <h1 className="checkout__header">Checkout</h1>
            <table className="checkout__products">
                <CheckoutTable />
            </table>
        </div>
    )
}