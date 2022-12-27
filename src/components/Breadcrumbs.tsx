import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const paths = location.pathname.split("/");

    function crumbs() {
        let crumbs:{}[] = []
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] === "") {
                crumbs.push({
                    path: "/home",
                    name: "Home"
                })
            }
        }
    }
    return (
        <></>
    );
}