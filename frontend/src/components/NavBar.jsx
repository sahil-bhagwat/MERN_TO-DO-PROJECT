import { Link } from "react-router-dom";
import "../style/navbar.css";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";

function NavBar() {
    const [login, setLogin] = useState(localStorage.getItem("login"));


    const logout = () => {
        localStorage.clear();
        setLogin(null);
        window.location.replace("/login");
    };

    useEffect(() => {
        const handleStorage = () => {
            setLogin(localStorage.getItem("login"));
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">To Do App</div>

            {login && (
                <div className="nav-right">
                    <ul className="nav-links">
                        <li><Link to="/">List</Link></li>
                        <li><Link to="/add">Add Task</Link></li>
                        <li><Link onClick={logout}>Logout</Link></li>
                        <li>
                            <UserProfile compact />
                        </li>
                    </ul>

                    {/* User Profile shown on navbar */}
                    {/* <UserProfile compact /> */}
                </div>
            )}
        </nav>
    );
}

export default NavBar;
