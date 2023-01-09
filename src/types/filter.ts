export type FilterProps = {
    direction:"asc" | "desc", 
    setDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>,
    find:string,
    setFind: React.Dispatch<React.SetStateAction<string>>,
    page:number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    productsOnCurrentPage:number
}