import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <div id="home">
        <h1>The web store</h1>
        <Outlet />
        </div>
    )
}