// Crear una segunda pantalla con un formulario que nos permita crear un post nuevo, a la cual se accede desde un botón en la vista de Posts (por ejemplo, un botón que diga “crear post”).
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";

type CreatePostFormInputs = {
    _id?: string;
    title: string;
    content: string;
    edited: boolean;
};

const validationSchema = Joi.object<CreatePostFormInputs>({
    title: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must be at most 100 characters long",
        "any.required": "Title is required",
    }),
    content: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Content is required",
        "string.min": "Content must be at least 3 characters long",
        "string.max": "Content must be at most 100 characters long",
        "any.required": "Content is required",
    }),
});

const CreatePost = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CreatePostFormInputs>({
        resolver: joiResolver(validationSchema),
    });

    const onSubmit = async (data: CreatePostFormInputs) => {
        // Obtenemos el userId del localStorage
        // y lo enviamos junto con el post
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }
        const sendData = {
            title: data.title,
            content: data.content,
            edited: false,
            author: userId 
        };
        try {
            const response = await axios.post("http://localhost:3000/api/posts", sendData);
            console.log("Post created successfully:", response.data);
            reset(); 
        } catch (err) {
            console.error("Error creating post", err);
        }
    };

    return(
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <input type="text" {...register("title")} />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div>
                    <label>Content</label>
                    <textarea {...register("content")} />
                    {errors.content && <span>{errors.content.message}</span>}
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost;