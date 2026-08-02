"use client";

import { useEffect, useState } from "react";

export default function Student() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const getStudents = async (searchValue = "") => {
        try {
            const response = await fetch(
                `http://localhost:8000/students/?search=${searchValue}`
            );

            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        getStudents(search);
    };

    return (
        <div className="container mt-5">

            <h2 className="mb-4">Student Search</h2>

            <form onSubmit={handleSubmit} className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search First Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className="btn btn-primary">
                    Search
                </button>
            </form>

            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Roll No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                </thead>

                <tbody>

                {students.length > 0 ? (
                    students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.roll_number}</td>
                            <td>{student.first_name}</td>
                            <td>{student.last_name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                            No students found
                        </td>
                    </tr>
                )}

                </tbody>
            </table>

        </div>
    );
}