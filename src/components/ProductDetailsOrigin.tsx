import { formatCurrency } from "../helpers"
import { Product } from "../types"

type ProductDetailsProps = {
    product : Product
}


export default function ProductDetails({product} : ProductDetailsProps) {
    const isAvalability = product.availability

    return (
        <>
            <tr className="border-b ">
                <td className="p-3 text-lg text-gray-800">
                    {product.name}
                </td>
                <td className="p-3 text-lg text-gray-800 text-center">
                    {formatCurrency(product.price)}
                </td>
                <td className="p-3 text-lg text-gray-800 flex justify-center">
                    <button className=" text-lg bg-green-600 px-3 rounded text-white font-bold" >
                        {isAvalability ? "Disponible" : "No disponible"}

                    </button>
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    <div className=" flex gap-2 items-center justify-center">
                        <button className=" px-4 bg-slate-600 text-white rounded font-bold hover:bg-slate-800 ">Editar</button>
                        <button className=" px-4 bg-red-600 text-white rounded font-bold hover:bg-red-800 ">Eliminar</button>
                    </div>
                </td>
            </tr> 
        </>
    )
}
