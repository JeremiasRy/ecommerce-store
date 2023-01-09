export default function RadioButton(props: {label:string, value:"asc" | "desc", setDirection:React.Dispatch<React.SetStateAction<"desc" | "asc">>, checked:boolean}) {
    return <label><input type="radio" checked={props.checked} onChange={() => props.setDirection(props.value)}/>{props.label}</label>
}