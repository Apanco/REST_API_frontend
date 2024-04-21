import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs){
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
    await addProduct(data);//Funcion que manda peticiion a la rest api
    return redirect("/");//Redirigira al completarse la accion
}

export default function NewProduct() {
    const errors = useActionData() as Array<string> || []
    return (
        <>
            <div className=" block justify-between md:flex">
                <h2 className=" text-4xl font-black text-slate-500 mb-10">Registrar producto nuevo</h2>
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
                    errors={errors}
                />
                <input 
                    type="submit" 
                    className=" text-white p-2 bg-indigo-700 rounded w-full cursor-pointer font-bold hover:bg-indigo-900 text-lg" 
                    value="Registrar" />
            </Form>
        </>
    )
}
