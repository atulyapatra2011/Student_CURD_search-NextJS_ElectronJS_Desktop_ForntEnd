"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm font-monospace">
            <div className="container">
                <Link href="/" className="navbar-brand fw-bold">
                    Student CRUD
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link
                                href="/"
                                className={`nav-link ${
                                    pathname === "/" ? "active fw-bold text-warning" : ""
                                }`}
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                href="/student"
                                className={`nav-link ${
                                    pathname === "/student"
                                        ? "active fw-bold text-warning"
                                        : ""
                                }`}
                            >
                                Students
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                href="/addStudent"
                                className={`nav-link ${
                                    pathname === "/addStudent"
                                        ? "active fw-bold text-warning"
                                        : ""
                                }`}
                            >
                                Add Student
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}