import "./addProduct.css";
import { logo } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export function AddProduct({url}) {
  const [isImage, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setImage(files[0]);
    } else if (name === "price") {
      setData({
        ...data,
        [name]: Number(value),
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  }

  function handleSubmit() {
    if (!data.category || !data.name || !data.description || !data.price) {
      return toast.error("all field are compulsory");
    }
    if (data.category === "-1") {
      return alert("Please select a category");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (isImage) {
      formData.append("image", isImage); // Attach the image
    }

    axios({
      method: "post",
      url:`${url}/food/add`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData, // Use FormData here
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          setImage(false); // Reset the image
          setData({
            name: "",
            description: "",
            price: "",
            category: "",
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error("something went wrong");
      });
  }

  return (
    <div className="addproduct">
      <div>
        <form className="form" encType="multipart/form-data">
          <h1>Add Menu</h1>
          <div>
            <label htmlFor="image" className="form-label">
              <img
                src={isImage ? URL.createObjectURL(isImage) : logo.uploader}
                alt="Preview"
              />
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              required
              hidden
              id="image"
              onChange={handleChange}
            />
          </div>
          <div className="form-hritik">
            <select
              name="category"
              className="form-select"
              onChange={handleChange}
              value={data.category}
            >
              <option value="-1">Select Category</option>
              <option value="veg">Veg</option>
              <option value="biryani">Biryani</option>
              <option value="chicken">Chicken</option>
              <option value="noodles">Noodles</option>
              <option value="ice-cream">Ice-Cream</option>
              <option value="street">Street</option>
            </select>

            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Menu Price"
              required
              onChange={handleChange}
              value={data.price}
            />
          </div>

          <div>
            <label htmlFor="name" className="form-label">
              Menu Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Menu Name"
              onChange={handleChange}
              required
              value={data.name}
            />
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Menu Description
            </label>
            <textarea
              name="description"
              rows={2}
              className="form-control"
              placeholder="Description About Menu"
              onChange={handleChange}
              value={data.description}
            ></textarea>
          </div>

          <div className="form-btn">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              type="button"
            >
              Add
            </button>
            <button
              className="btn btn-danger"
              type="reset"
              onClick={() => {
                setImage(false);
                setData({
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                });
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
