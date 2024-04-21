export function formatCurrency(amount : number){
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    } ).format(amount);
} 
export function toBoolean(str : string) {
    return str.toLowerCase() === "true" ? true: false
}


//? -> Estilos tailwind del componente de tabla
export const TdStyle = {
    ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-2 px-3 text-lg font-medium text-white lg:py-4 lg:px-4 bg-slate-800`,
    TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-3 px-2 text-center text-base font-medium`,
    TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-3 px-2 text-center text-base font-medium`,
    TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
}