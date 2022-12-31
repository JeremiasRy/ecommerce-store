const lightCss = `:root { 
    background-color: #fefefe;
    filter: invert(100%);
}
* { 
    background-color: inherit;
}
.div-bg-img {  
    filter: invert(100%);
    transition: 500ms all ease-in-out;
}
h1, h2, h3, h4, p {
    background-color: transparent;
}`;

export default lightCss;