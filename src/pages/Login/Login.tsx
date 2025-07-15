import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";
import { FaUser } from "react-icons/fa";


type LoginFormInputs = {
    _id?: string;
    username: string;
    email: string;
    isActive: boolean;
};

// validaciones
const validationSchema = Joi.object<LoginFormInputs>({
    username: Joi.string().min(3).max(30).required().messages({
        "string.base": "Username must be a string ⚠️",
        "string.empty": "Username is required ⚠️",
        "string.min": "Username must be at least 3 characters long ⚠️",
        "string.max": "Username must be at most 30 characters long ⚠️",
        "any.required": "Username is required ⚠️",
    }),
    email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).min(3).max(30).required().messages({
        "string.base": "Email must be a string ⚠️",
        "string.empty": "Email is required ⚠️",
        "any.required": "Email is required ⚠️",
        "string.min": "Email must be at least 3 characters long ⚠️",
        "string.max": "Email must be at most 30 characters long ⚠️",
        "string.pattern.base": "Email must be a valid email address ⚠️",
    })
})

const Login = () => {

    // navigate para redireccionar
    const navigate = useNavigate();

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<LoginFormInputs>({
    resolver: joiResolver(validationSchema),
});

const onLogin = async (user: LoginFormInputs) => {
    const sendData = {
        username: user.username,
        email: user.email,
        isActive: true,
    };
    try {
        const response = await axios.post("http://localhost:3000/api/users", sendData);
        const user = response.data.data;
        if (user) {
               // almacenamiento de los datos en local storage
        localStorage.setItem("userId", user._id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        // redireccionamiento a la pantalla de post al crear el usuario
        navigate("/posts");
        }

     } catch (err) {
        console.error("Error creating user:", err);
        }
    };

return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
        <h1>Login</h1>
        <div className={styles.iconContainer}><FaUser className={styles.icon} /></div>
        <p>Please enter your details</p>
            <input type="text" placeholder="Username" {...register("username")} className={styles.input} />
            {errors.username && <span className={styles.error}>{errors.username.message}</span>}
            <input type="text" placeholder="Email" {...register("email")} className={styles.input} />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            <button type="submit" className={styles.button}>Create User</button>
        </form>
    </div>
    );
};

export default Login;
