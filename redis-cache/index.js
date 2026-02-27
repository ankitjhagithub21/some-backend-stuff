import express from "express"
import {getRedisValue, setRedisValue} from "./redis/index.js"

const app = express()

const port = process.env.PORT || 8000

app.get("/",(req,res)=>{
    return res.json({message:"Hello world"})
})


app.get("/products",async(req,res)=>{
    try{
        const products = await getRedisValue('products') 

        if(products){
            return res.status(200).json({success:true, message:"Get products from the redis.", data:JSON.parse(products)});
        }

        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();


        await setRedisValue('products', JSON.stringify(data.products))

        res.status(200).json({
            success:true,
            products:data.products
        });

    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"Failed to get products."})
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})