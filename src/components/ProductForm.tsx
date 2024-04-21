import ErrorMessage from "./ErrorMessage"
import { Product } from "../types"

type ProductFormProps = {
    product?: Product
    errors: string[]
}

export default function ProductForm({product, errors} : ProductFormProps) {
    return (
        <>
            <div className=" mb-4">
                <label htmlFor="name" className=" text-gray-800">Nombre del producto</label>
                <input
                    id="name" 
                    type="text" 
                    name="name"
                    placeholder="Nombre del producto"
                    className=" mt-2 block w-full p-3 bg-gray-200"
                    defaultValue={product?.name}
                />
                <div className=" min-h-6 mt-2">
                    {
                        errors.length > 0 && errors.includes("name") && 
                            <ErrorMessage>El nombre del producto es obligatorio</ErrorMessage>
                    }
                </div>

            </div>

            <div className=" mb-4">
                <label htmlFor="price" className=" text-gray-800">Precio del producto</label>
                <input 
                    id="price"
                    type="number" 
                    step="any"
                    name="price"
                    placeholder="Precio del producto Ej. 399"
                    className=" mt-2 block w-full p-3 bg-gray-200 rounded-lg"
                    defaultValue={product?.price}
                />
                <div className=" min-h-6 mt-2">
                    {
                        errors.length > 0 && errors.includes("price") && 
                            <ErrorMessage>El Precio del producto es obligatorio</ErrorMessage>
                    }
                </div>
            </div>
        </>
    )
}
