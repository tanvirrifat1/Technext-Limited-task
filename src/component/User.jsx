import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const User = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const data = localStorage.getItem("booking");
  const parsedData = JSON.parse(data);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
  };

  const uploadImage = async (formData) => {
    const url =
      "https://api.imgbb.com/1/upload?key=c71fd21009b2244466212ed88a7ea531";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data.display_url;
    } else {
      console.error(
        "Failed to upload image:",
        response.status,
        response.statusText
      );
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const email = form.elements.email.value;
    const address = form.elements.address.value;
    const company = form.elements.company.value;
    const city = form.elements.city.value;

    if (!image) {
      console.log("Please select image!");

      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const imageUrl = await uploadImage(formData);

    const booking = {
      firstName,
      lastName,
      email,
      address,
      company,
      city,
      imageUrl,
    };

    if (parsedData) {
      localStorage.setItem("booking", JSON.stringify([...parsedData, booking]));
    } else {
      localStorage.setItem("booking", JSON.stringify([booking]));
    }
    Swal.fire("User added successfully!");
    navigate("/");
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content lg:w-[700px] flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">FistName</span>
                </label>
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder="FistName"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">LastName</span>
                </label>
                <input
                  required
                  name="lastName"
                  type="text"
                  placeholder="ListName"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="col-span-2">
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  required
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  required
                  name="address"
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  required
                  name="city"
                  type="text"
                  placeholder="City"
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">CompanyName</span>
                </label>
                <input
                  required
                  name="company"
                  type="text"
                  placeholder="CompanyName"
                  className="input input-bordered w-full "
                />
              </div>

              <div type="submit" className="form-control mt-6">
                <button className="btn btn-outline">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
