import { Link, useLoaderData, ActionFunctionArgs } from "react-router-dom"
import { getProducts, updateAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";
import { TdStyle } from "../helpers";


//*Loaders-------------------------
export async function loader(){
  const products = await getProducts()
  return products
}

// ! Actions-----------------------
export async function action({request} : ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
  await updateAvailability(+data.id)


  return {}
}
//? Componente---------------------
export default function Products() {
  const products = useLoaderData() as Product[] ;//Obtener datos del loader



  return (
    <>
        <div className=" flex justify-between">
            <h2 className=" text-4xl font-black text-slate-500">Productos</h2>
            <Link to="productos/nuevo"
                className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
            >
                Agregar Producto
            </Link>
        </div>
        <section className='bg-white dark:bg-dark py-14 lg:py-12'>
          <div className='container'>
            <div className='flex flex-wrap -mx-4'>
              <div className='w-full '>
                <div className='max-w-full overflow-x-auto'>
                  <table className='w-full table-auto'>
                    <thead className='text-center bg-primary'>
                      <tr>
                        <th className={TdStyle.ThStyle}> Producto </th>
                        <th className={TdStyle.ThStyle}> Precio </th>
                        <th className={TdStyle.ThStyle}> Disponibilidad </th>
                        <th className={TdStyle.ThStyle}> Acciones </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => <ProductDetails
                        key={product.id}
                        product={product}
                      />)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  )
}
