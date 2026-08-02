"use client"
import "../globals.css";
import { useState, useEffect } from "react";


export default function Student(){
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
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

    const pageSize = 3;

    const totalPages = Math.ceil(count / pageSize);


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "profile_pic") {
            const file = files[0];

            setFormData((prev) => ({
                ...prev,
                profile_pic: file,
            }));

            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        const fetchStudents = async (pageNumber) => {
            try {
                const response = await fetch(`https://student-curd-search-django-rest-api-19q0.onrender.com/student/?page=${pageNumber}`);

                const data = await response.json();

                if (!response.ok) {
                    setMessage(data.message || "Data not found");
                    return;
                }

                setStudents(data.results);
                setCount(data.count);
            } catch (error) {
                setMessage("Unable to connect to the server.");
            }
        };

        fetchStudents(page);
    }, [page]);


    const deleteStudent = async  (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://student-curd-search-django-rest-api-19q0.onrender.com/studentlist/${id}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Student deleted successfully.");

                // Remove deleted student from state
                setStudents((prev) => prev.filter((student) => student.id !== id));
            } else {
                alert("Failed to delete student.");
            }
        } catch (error) {
            console.error(error);
            alert("Server error.");
        }

    }

    const openEditModal = (student) => {
        // console.log(student);
        setFormData(student);
        // setPreview(student.profile_pic); // Existing image URL
        setPreview(`http://127.0.0.1:8000${student.profile_pic}`);
        setShowModal(true);
    };

    const updateStudent = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await fetch(
                `https://student-curd-search-django-rest-api-19q0.onrender.com/studentlist/${formData.id}/`,
                {
                    method: "PUT",
                    body: data, // ✅ Send FormData directly
                }
            );

            const result = await response.json();
            console.log(result);
            alert("Student updated successfully.");
            setShowModal(false);
        } catch (err) {
            console.error(err);
            alert("Server error.");
        }
    };


    return (
        <div className="container py-2 font-monospace">
            <h3 className="mb-3">Student List</h3>
            <table className="table table-striped table-hover shadow rounded">
                <thead className="table-dark">
                <tr className="text-center">
                    <th>Roll Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Picture</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {message ? (
                    <tr>
                        <td colSpan="10" className="text-center text-danger py-3">
                            {message}
                        </td>
                    </tr>
                ) : (
                    students.length > 0 ? (
                    students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.roll_number}</td>
                            <td>{student.first_name}</td>
                            <td>{student.last_name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.gender}</td>
                            <td>{student.address}</td>
                            <td>
                                <img
                                    src={`https://student-curd-search-django-rest-api-19q0.onrender.com/${student.profile_pic}`}
                                    alt={student.first_name}
                                    className="img-thumbnail"
                                    width="60"
                                    height="60"
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => openEditModal(student)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteStudent(student.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                    ):(
                        <tr>
                            <td colSpan="5" className="text-center">
                                No students found
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>

            <div className="d-flex gap-2">

                <button
                    className="btn btn-primary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span className="align-self-center">
                    Page {page} of {totalPages}
                </span>

                <button
                    className="btn btn-primary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>


            {/* edit form model use*/}

            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5>Edit Student</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <form onSubmit={updateStudent} encType="multipart/form-data">
                                <div className="modal-body">

                                    <input
                                        type="text"
                                        name="roll_number"
                                        value={formData.roll_number}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                    />
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                        placeholder="First Name"
                                    />

                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                        placeholder="Last Name"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                        placeholder="email"
                                    />

                                    <input
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="form-control  mb-3"
                                        placeholder="Phone Number"
                                    />

                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="form-select  mb-3"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="female">Other</option>
                                    </select>

                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="form-control  mb-3"
                                        placeholder="Address"
                                    />

                                    <div className="mb-3 text-center">
                                        <label className="form-label">Profile Picture</label>

                                        {preview && (
                                            <img
                                                src={preview}
                                                alt="Profile Preview"
                                                width="120"
                                                height="120"
                                                className="rounded-circle border"
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        name="profile_pic"
                                        className="form-control mb-3"
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};


