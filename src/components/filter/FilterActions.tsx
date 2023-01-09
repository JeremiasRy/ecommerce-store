import { useAppDispatch } from "../../hooks/reduxHook"
import { sortByPrice } from "../../redux/reducers/productReducer"
import { FilterProps } from "../../types/filter"
import RadioButton from "./RadioButton"

export default function FilterActions(props: FilterProps) {
    const dispatch = useAppDispatch()
    return (
        <div className="all-products__filter-actions">
                <div className="all-products__filter-actions__sort-direction">
                    <button 
                    className="button basic" 
                    onClick={() => dispatch(sortByPrice(props.direction))}>
                        Sort
                    </button>
                    <div className="sort-direction__radio-buttons">
                        <RadioButton 
                        label="ascending" 
                        value="asc" 
                        checked={props.direction === "asc"} 
                        setDirection={props.setDirection}/> 
                        <RadioButton 
                        label="Descending" 
                        value="desc" 
                        checked={props.direction === "desc"} 
                        setDirection={props.setDirection}/>
                    </div>
                </div>
                <input className="all-products__filter-actions__text" type="text" placeholder="Filter by name" value={props.find} onChange={(e) => props.setFind(e.currentTarget.value)}/>
                {props.find !== "" && <button className="button basic small wide" onClick={() => props.setFind("")}>Remove filter</button>}
                <div className="change-page-buttons">
                    <button className="button basic small" onClick={() => props.page - 1 >= 1 && props.setPage(props.page - 1)}>Prev</button> 
                    {props.page} 
                    <button className="button basic small" onClick={() => !(props.productsOnCurrentPage < 20) && props.setPage(props.page + 1)}>Next</button>
                </div>
            </div>
    )
}