

import "./navbar.css"
import { logo } from "../../assets/assets"
export function Navbar(){
    return(
        <div className="navbar">
        
          <div className="navbar-content d-flex justify-content-between w-100">
                <div className=" text-warning fw-bold fst-italic">Foodie!</div>
                <span className=" text-dark fw-bold">Admin Panel</span>
                <img src={logo.profile} alt={logo.profile} />
          </div>
        </div>
    )
}