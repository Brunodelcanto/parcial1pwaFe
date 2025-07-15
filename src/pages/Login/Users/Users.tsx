import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Users.module.css";
import { HomeButton } from "../../../components/HomeButton";
import { FaUser } from "react-icons/fa";


type User = {
    _id?: string;
    username: string;
    email: string;
    isActive: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Función para obtener los usuarios
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/users");
            setUsers(response.data.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error("An unknown error occurred"));
            }
        } finally {
            setLoading(false);
        }
    }

    // 
    useEffect(() => {
        fetchData();
    }, []);
    
    // Funcion para activar usuario
    const handleActive = async (userId: string) => {
        try {
            await axios.patch(`http://localhost:3000/api/users/${userId}/activate`);
            // Actualizamos la lista de usuarios después de cambiar el estado
            const res = await axios.get("http://localhost:3000/api/users");
            setUsers(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    // Funcion para desactivar usuario
    const handleDeactivate = async (userId: string) => {
        try {
            await axios.patch(`http://localhost:3000/api/users/${userId}/deactivate`);
            // Actualizamos la lista de usuarios después de cambiar el estado
            const res = await axios.get("http://localhost:3000/api/users");
            setUsers(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const username = localStorage.getItem("username");
    
    return (
        <div className={styles.container}>
            <h1>Users list</h1>
            <div className={styles.iconContainer}><FaUser className={styles.icon} /></div>
            <h2>Welcome, {username}</h2>
            <p>This is the users page where you can view all and manage users.</p>
            {loading && <p>Loading users...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            {users && (
                <ul className={styles.usersList}>
                    {users.map((item: User) => (
                        <li key={item._id} className={`${styles.userContainer} ${!item.isActive ? styles.inactiveUser : ''}`}>
                             <div className={styles.iconContainer}><FaUser className={styles.icon} /></div>
                            <h2>{item.username}</h2>
                            <p>Email: {item.email}</p>
                            <p>Status: {item.isActive ? "Active" : "Inactive"}</p>
                            <button
                                // OnClick con dos condiciones: si el usuario está activo, desactivarlo; si no, activarlo
                                onClick={() => item.isActive ? handleDeactivate(item._id!) : handleActive(item._id!)} className={styles.actDesButton}>
                                {/* Texto del botón segun su condicion */}
                                {item.isActive ? "Deactivate" : "Activate"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <HomeButton />
        </div>
    )
}

export default Users;
