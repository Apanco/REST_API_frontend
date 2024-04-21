import { TdStyle, formatCurrency } from "../helpers"
import { deleteProduct } from "../services/ProductService"
import { Product } from "../types"
import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"

type ProductDetailsProps = {
    product : Product
}


export async function action({params}: ActionFunctionArgs){
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect("/");
    }
}


//!Componente------------------

export default function ProductDetails({product} : ProductDetailsProps) {
    const isAvalability = product.availability
    const navigate = useNavigate()
    const fetcher = useFetcher()
    return (
        <>
           <tr>
                <td className={TdStyle.TdStyle}>
                    {product.name}
                </td>

                <td className={TdStyle.TdStyle2}>
                    {formatCurrency(product.price)}
                </td>

                <td className={TdStyle.TdStyle}>
                    <fetcher.Form method="POST">
                        <button
                            type="submit"
                            name="id"
                            value={product.id}
                            className={`${isAvalability ?" text-black border-black" : "text-red-600 border-red-600"} rounded-lg p-2 text-xs font-black w-full border-solid border-2 uppercase`}
                        >
                            {isAvalability ? "Disponible" : "No disponible"}
                        </button>

                    </fetcher.Form>
                </td>

                <td className={TdStyle.TdStyle2}>
                    <div className=" flex gap-2 items-center justify-center">
                        <button 
                            className=" p-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-800 w-full text-xs text-center cursor-pointer"
                            onClick={() => navigate(`productos/${product.id}/editar`)}
                        >Editar</button>

                        <Form
                            className=" w-full"   
                            method="POST"
                            action={`productos/${+product.id}/eliminar`}
                        >
                            <input
                                className=" p-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-800 w-full text-xs text-center cursor-pointer" 
                                type="submit" 
                                value={"Eliminar"}/>

                        </Form>
                    </div>
                </td>
            </tr>
        </>
    )
}
