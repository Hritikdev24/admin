
import { useState } from "react"
import "./sidebar.css"
import { NavLink} from "react-router-dom"
export function Sidebar(){
   
    const[isProduct,setProduct]=useState('add');
    function toggler(a){
      setProduct(a);
    }
    return(
        <div className="sidebar">
      <div className="sidebar-options">

        <NavLink to="/add"   onClick={()=>{toggler("add")}}  className={`sidebar-option ${isProduct=="add"?"active":""}`}>
        <i class="bi bi-plus-lg"></i>
            <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" onClick={()=>{toggler("list")}} className={`sidebar-option ${isProduct=="list"?"active":""}`}>
        <i class="bi bi-list"></i>
            <p>List Items</p>
        </NavLink>

        <NavLink to="/order"  onClick={()=>{toggler("order")}}  className={`sidebar-option ${isProduct=="order"?"active":""}`}>
        <i class="bi bi-bag-check-fill"></i>
            <p>Order Items</p>
        </NavLink>


      </div>
        </div>
    )
}