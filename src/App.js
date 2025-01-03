import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Sidebar } from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import { AddProduct } from "./pages/addProduct/addProduct";
import { ListProduct } from "./pages/listProduct/listProduct";
import { OrderProduct } from "./pages/orderProduct/orderProduct";
import { ToastContainer } from 'react-toastify';
function App() {
  const  dataUrl="https://project-backend-mtja.onrender.com"
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar />
  
      <div className="hero-content">
        <Sidebar/>
        <Routes>
          <Route  path="/add" element={<AddProduct url={dataUrl}/>}></Route>
          <Route path="/list" element={<ListProduct  url={dataUrl} />}></Route>
          <Route path="/order" element={<OrderProduct url={dataUrl}/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
