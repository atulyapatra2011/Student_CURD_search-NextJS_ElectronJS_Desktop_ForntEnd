"use client";
import "../globals.css";
import { useState } from "react";

export default function AddStudent() {
    const [formData, setFormData] = useState({
        roll_number: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        profile_pic: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        data.append("roll_number", formData.roll_number);
        data.append("first_name", formData.first_name);
        data.append("last_name", formData.last_name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("gender", formData.gender);
        data.append("address", formData.address);

        if (formData.profile_pic) {
            data.append("profile_pic", formData.profile_pic);
        }

        try {
            const response = await fetch("http://localhost:8000/student/", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                alert("Student added successfully!");

                setFormData({
                    roll_number: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    gender: "",
                    address: "",
                    profile_pic: null,
                });
            } else {
                console.log(await response.text());
                alert("Failed to add student.");
            }
        } catch (error) {
            console.error(error);
            alert("Server error.");
        }
    };

    return (
        <div className="container py-5 font-monospace">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card shadow border-0">
                        <div className="card-header bg-dark text-white">
                            <h3 className="mb-0">Add Student</h3>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Roll Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="roll_number"
                                            value={formData.roll_number}
                                            onChange={handleChange}
                                            placeholder="Roll Number"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder="First Name"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Address</label>
                                        <textarea
                                            className="form-control"
                                            name="address"
                                            rows="3"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Address"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Profile Photo</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="profile_pic"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-12 text-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-2"
                                            onClick={() =>
                                                setFormData({
                                                    roll_number: "",
                                                    first_name: "",
                                                    last_name: "",
                                                    email: "",
                                                    phone: "",
                                                    gender: "",
                                                    address: "",
                                                    photo: null,
                                                })
                                            }
                                        >
                                            Reset
                                        </button>

                                        <button type="submit" className="btn btn-primary">
                                            Save Student
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}