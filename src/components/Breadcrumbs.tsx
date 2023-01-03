import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const paths = location.pathname.split("/");
    const filtered = paths.slice(0, paths.length - 1);

    const Links = filtered.map(path => {
        if (path === "") {
            return <Link to="/home" className="breadcrumb">Home</Link>
        }
        return <Link to={`/${path}`} className="breadcrumb">{path}</Link>
    })
    if (paths[1] === "home" || paths[1] === "") {
        return <></>;
    }
    return (
        <div className="breadcrumbs">{Links.map((link, idx) => <div className="breadcrumb-wrap" key={link.toString() + idx}>&nbsp;/ {link}</div>)}</div>
    );
}