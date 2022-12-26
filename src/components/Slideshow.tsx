import { useEffect, useRef, useState } from "react";

export default function SlideShow(props: {images:string[]}) {
    const [index, setIndex] = useState(0);
    let timeout = useRef<ReturnType<typeof setTimeout>>();

    function resetTimeout() {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
    }

    useEffect(() => {
        resetTimeout();
        timeout.current = setTimeout(() => {
            setIndex(prevIndex => prevIndex === props.images.length - 1 ? 0 : prevIndex + 1)
        }, 2000)
    },[index, props])
    return (
        <div className="slideshow-wrapper">
            <div className="slideshow">
                <div className="slideshow__slider" style={{transform: `translateX(${-index * 100}%)`}}>
                    {props.images.map((url, index) => 
                        <div key={url + index} className="slideshow__slider__slide" style={{backgroundImage: `url(${url})`}}></div>
                    )}
                </div>
            </div>
            <div className="slideshow-buttons">
                {props.images.map((_, idx) => <button onClick={() => setIndex(idx)}>{idx + 1}</button>)}
            </div>
        </div>
    )
}