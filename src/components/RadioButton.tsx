export default function RadioButton(props: {label:string, value:string, setDirection:any, checked:boolean}) {
    return <label><input type="radio" checked={props.checked} onChange={() => props.setDirection(props.value)}/>{props.label}</label>
}