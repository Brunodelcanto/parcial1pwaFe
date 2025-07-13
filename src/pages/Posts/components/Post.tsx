import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type PostType = {
  _id: string;
  title: string;
  content: string;
  author: { username: string };
  likes: string[];
  edited: boolean;
};

const Post = () => {
    // Obtenemos el ID del post desde los parámetros de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
//   Definimos el estado para el post y los campos de edición
  const [post, setPost] = useState<PostType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch data del post al cargar el componente
    const fetchPost = async () => {
      try {
        // Hacemos una petición GET para obtener los datos del post
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const postData = response.data.data;
        // Actualizamos el estado con los datos del post
        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  },
//   Dependemos del ID del post para volver a cargar los datos si cambia 
  [id]);

//   Función para manejar la actualización del post
  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/posts/${id}`, {
        title,
        content,
        edited: true,
      });
      alert("Post actualizado correctamente");
      navigate("/posts");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!post) return <p>Cargando post...</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      <p>Please write your changes below:</p>
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
};

export default Post;
