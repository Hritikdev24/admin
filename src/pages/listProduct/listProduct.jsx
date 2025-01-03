

import { useEffect, useState } from "react"
import "./listProduct.css"
import axios from "axios"
import { toast } from "react-toastify";
export function ListProduct({url}){

    const[product,setProduct]=useState([]);
     async function loadData(){
     try{
      const res=  await axios.get(`${url}/food/list`);
      console.log(res.data.message);
           setProduct(res.data.message)
     }catch(err){
        toast.error("something went wrong");
     }
    }

     async function handleClick(id){
       
         try{
             await  axios.post(`${url}/food/remove`,{id:id},{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            toast.success("Item removed");
            setProduct((prev)=>{
                return product.filter(item=>item._id!=id)
            })
        
         }catch(err){
            toast.error("something went wrong")
            console.log(err);
         }
      
    }

    useEffect(()=>{
  loadData();

    },[])
    return(
        <div className="productList">
           <div className="product-parent">
           <h1 className="text-center bg-warning ">All Items</h1>
          <div className="table-header">
            <span>Id</span>
            <span>Item </span>
            <span>Name</span>
            <span>price</span>
            <span>Category</span>
            <span>Description</span>
            <span>Delete</span>

         </div>
         <div >
     {
       product.map((item,idx)=>(
          <div className="table-content">
          <span>{idx+1}</span>
            <span><img src={`${url}/images/${item.image}`} alt="" /></span>
            <span>{item.name}</span>
            <span>{item.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
            <span>{item.category}</span>
            <span>{item.description}</span>
            <span  onClick={()=>{handleClick(item._id)}} className="bi  bi-trash trash"></span>
            </div>
       ))
     }
         </div>
           </div>
        </div>
    )
}