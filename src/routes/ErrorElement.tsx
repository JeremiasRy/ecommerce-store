import { useNavigate } from "react-router-dom"

export default function ErrorElement() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/home");
    }
    
    return (
        <div className="error-element">
            <h1>It seems that there is no page here</h1>
            <h4 onClick={handleClick}>Click me to get back to shopping!</h4>
        </div>
    )
}