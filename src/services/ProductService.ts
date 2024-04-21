import { coerce, number, safeParse, parse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";
type ProductData = {
    [k: string]: FormDataEntryValue;
}



export async function addProduct(dataIn : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: dataIn.name,
            price: +dataIn.price
        });
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
            return data
        }else{
            throw new Error("Datos no validos");
            
        }
    } catch (error) {
        console.log(error)
    }
}


export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        } else{
            throw new Error("Hubo un error")
        }
    } catch (error) {
        console.log(error)
    }
}
export async function getProductById(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        } else{
            throw new Error("Hubo un error")
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(id: Product['id'], product : ProductData){
    try {
        const numberSchema = coerce(number(), Number)

        const result = safeParse(ProductSchema,{
            id,
            name:product.name,
            price:parse(numberSchema, product.price),
            availability: toBoolean(product.availability.toString())
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url,result.output);
        }
    } catch (error) {
        console.log(error)
    }
} 

export async function deleteProduct(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateAvailability(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}