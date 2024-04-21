import { Output, array, boolean, number, object, string } from "valibot";


//? schemmas
export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    price: number(),
    name:string(),
    availability: boolean()
})
export const ProductsSchema = array(ProductSchema)
//!  Types
export type Product = Output<typeof ProductSchema>