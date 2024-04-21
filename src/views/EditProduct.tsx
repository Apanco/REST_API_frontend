import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({params} : LoaderFunctionArgs) {
    if(params.id !== undefined){
        const product = await getProductById(+params.id)
        if(!product){
            return redirect("/");
        }
        return product;
    }
}


export async function action({request, params} : ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData())
    const errors : string[] = [];
    if(Object.values(data).includes("")){//Si el objeto esta vacio
        for (const key in data){//Iterara el objeto por sus atributos
            if(data.hasOwnProperty(key)){//Verificara si el ojeto tiene el atributo key
                const value = data[key]
                if(value === ""){//Si lo tiene verificara no este vacio
                    errors.push(key);//Si esta vacio, lo agregara al arreglo de errores
                }
            }
        }
    }
    if(errors.length > 0){
        return errors
    }
    if(params.id !== undefined){
        await updateProduct(+params.id, data)
        return redirect("/");//Redirigira al completarse la accion
    }
}


const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]

//* -> Componente

export default function EditProduct() {
    const errors = useActionData() as Array<string> || []
    const product = useLoaderData() as Product

    return (
        <>
            <div className=" block justify-between md:flex">
                <h2 className=" text-4xl font-black text-slate-500 mb-10">Editar producto</h2>
                <Link to="/"
                    className=" w-full md:w-auto rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 h-11"
                >
                    Volver a productos
                </Link>
            </div>

            <Form 
                className=" mt-10" 
                action=""
                method="POST"
            >
                <ProductForm
                    product= {product}
                    errors = {errors}
                />
        
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-200 rounded-lg"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input 
                    type="submit" 
                    className=" text-white p-2 bg-indigo-700 rounded w-full cursor-pointer font-bold hover:bg-indigo-900 text-lg" 
                    value="Registrar cambios" />
            </Form>
        </>
    )
}
