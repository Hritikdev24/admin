

import { useEffect, useState } from "react";
import "./orderProduct.css";
import axios from "axios"
import{toast} from "react-toastify"
export function OrderProduct({url}){

const[data,setData]=useState([]);

  async function fetchData(){
     try{

        const  response=  await axios.get(`${url}/order/menu-list`);
        setData(response.data.message);
        console.log(response.data);

     }catch(err){
        console.log(err);
       toast.error("something went wrong")
     }  
}

  async function handleChange(e,id){
   try{

  const response=await axios.post(`${url}/order/status`,{id:id,status:e.target.value})
  toast.success(response.data.message);

   }catch(err){
    console.log(err);
    toast.error("something went wrong")
   }
}
useEffect(()=>{
fetchData()
},[])


    return(
        <div className="orderproduct w-100 ">
      <h1 className="text-center bg-light text-dark fs-1 p-4 position-sticky top-0 ">Order Page</h1>
      <div className="order w-100">
{
    data.map(item=>(
       <div className="row w-75 ms-4 bg-warning mb-2 p-2 rounded-3">
                <div className="">
                {
                item.items.map(orders=>(
                <span className="ms-2 fs-3 text-black me-3 fw-bold text-capitalize">
                    {orders.name} 
                    <i className="bi bi-x"></i>
                    {orders.quantity},
                </span>
                ))
              }
                </div>
               <div className="m-3 ">
                 <span className="bg-dark text-light fs-4 p-2">  Address:</span>
               <div className="fs-3 text-seconadry text-capitalize d-flex gap-2 mt-2 flex-wrap ">
                 <span>state:{item.address.state}</span>,
                 <span>city:{item.address.city}</span>,
                 <span>Mobile No:{item.address.pinCode}</span>,
                 <span>street: {item.address.street}</span>
               </div>
               <div className="btn btn-primary w-25 fs-4 rounded-0 m-2">
               {
    item.amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR"
    })
}
               </div>
                <select select className="btn btn-danger w-25 fs-4 rounded-0 m-2" onChange={(e)=>handleChange(e,item._id)}>
                  <option value="food-processing">food processing</option>
                  <option value="out-for-delivery">out-for-delivery</option>
                  <option value="delivered">delivered</option>

                </select>
               </div>
        </div>
    ))
}
      </div>
        </div>
    )
}