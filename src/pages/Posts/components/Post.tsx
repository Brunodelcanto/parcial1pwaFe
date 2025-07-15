import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomeButton } from "../../../components/HomeButton";
import styles from "./Post.module.css";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { FaPencilAlt } from "react-icons/fa";

type PostFormType = {
  _id: string;
  title: string;
  content: string;
};

const validationSchema = Joi.object<PostFormType>({
  title: Joi.string().max(100).required().messages({
    "string.empty": "Title is required ⚠️",
    "string.max": "Title must be at most 100 characters long ⚠️",
    "any.required": "Title is required ⚠️",
  }),
  content: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Content is required ⚠️",
    "string.min": "Content must be at least 3 characters long ⚠️",
    "string.max": "Content must be at most 100 characters long ⚠️",
    "any.required": "Content is required ⚠️",
  }),
})

const Post = () => {
    // Obtenemos el ID del post desde los parámetros de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
//   Definimos el estado para el post y los campos de edición

 const {
   register,
   handleSubmit,
   formState: { errors },
   setValue,
 } = useForm<PostFormType>({
   resolver: joiResolver(validationSchema),
 });

  useEffect(() => {
    // Fetch data del post al cargar el componente
    const fetchPost = async () => {
      try {
        // Hacemos una petición GET para obtener los datos del post
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const postData = response.data.data;
        // Actualizamos el estado con los datos del post
        setValue("title", postData.title);
        setValue("content", postData.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  },
);

//   Función para manejar la actualización del post
  const handleUpdate = async (data: PostFormType) => {
    try {
      await axios.patch(`http://localhost:3000/api/posts/${id}`, {
        ...data,
        edited: true,
      });
      setSuccessMessage("Post actualizado correctamente");
      setTimeout(() => { navigate("/posts");}, 2000);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };


  return (
<div className={styles.container}>
  {successMessage && <p className={styles.success}>{successMessage}</p>}
<form onSubmit={handleSubmit(handleUpdate)} className={styles.form}>
  <div className={styles.titleWithIcon}><FaPencilAlt className={styles.inlineIcon} /><h1>Edit Post</h1></div>
  <p>Please write your changes below:</p>
  <label>Title:</label>
  <input className={styles.input} {...register("title")} />
  {errors.title && <p className={styles.error}>{errors.title.message}</p>}

  <label>Content:</label>
  <textarea className={styles.textarea} {...register("content")} />
  {errors.content && <p className={styles.error}>{errors.content.message}</p>}

  <button type="submit" className={styles.saveButton}>Save Changes</button>
  <HomeButton />
</form>
</div>

  );
};

export default Post;
