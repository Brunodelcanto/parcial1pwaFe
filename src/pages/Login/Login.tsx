import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { useNavigate } from "react-router";


type LoginFormInputs = {
    _id?: string;
    username: string;
    email: string;
    isActive: boolean;
};

// validaciones
const validationSchema = Joi.object<LoginFormInputs>({
    username: Joi.string().min(3).max(30).required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username must be at most 30 characters long",
        "any.required": "Username is required",
    }),
    email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).min(3).max(30).required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "any.required": "Email is required",
        "string.min": "Email must be at least 3 characters long",
        "string.max": "Email must be at most 30 characters long",
        "string.pattern.base": "Email must be a valid email address",
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

const onSubmit = async (data: LoginFormInputs) => {
    const sendData = {
        username: data.username,
        email: data.email,
        isActive: true,
    };
    try {
        const response = await axios.post("http://localhost:3000/api/users", sendData);
        // almacenamiento de los datos en local storage
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        // redireccionamiento a la pantalla de post al crear el usuario
        navigate("/posts");
        console.log("User created successfully:", response.data);

     } catch (err) {
        console.error("Error creating user:", err);
        }
    };

return (
    <div>
        <h1>Login</h1>
        <p>Por favor ingrese sus datos</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Username" {...register("username")} />
            {errors.username && <span>{errors.username.message}</span>}
            <input type="text" placeholder="Email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
            <button type="submit">Crear Usuario</button>
        </form>
    </div>
    );
};

export default Login;
