

export default function footer(){
    return(
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">

                <hr className="border-secondary" />

                <div className="text-center text-secondary">
                    © {new Date().getFullYear()} Student Management System. All Rights Reserved.
                </div>

            </div>
        </footer>
    )
}