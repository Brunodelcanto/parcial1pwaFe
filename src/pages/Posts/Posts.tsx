import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Posts.module.css";
import { HomeButton } from "../../components/HomeButton";
import { AiFillLike} from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { TbFileLike } from "react-icons/tb";
import { BsFilePostFill } from "react-icons/bs";

type Posts = {
    _id?: string;
    title: string;
    content: string;
    author: {username: string};
    likes: string[];
};

const Posts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const userId = localStorage.getItem("userId");

    const fetchData =  async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/posts");
            setPosts(response.data.data);
            console.log(response.data)
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error("An unknown error ocurred"));
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Función para manejar el like del post
    const handleLike = async (postId: string) => {
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }
        
        try {
            console.log(userId)
            // Enviamos el userId al endpoint de like del post
            await axios.patch(`http://localhost:3000/api/posts/${postId}/like`, {
                userId
            });
            // Actualizamos la lista de posts después de dar like
            const res = await axios.get("http://localhost:3000/api/posts");
            setPosts(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Función para redireccionar al post específico
    const goToPost = (id: string) => {
        navigate(`/post/${id}`);
    }

    // Función para redireccionar a la página de crear post
    const goToCreatePost = () =>{
        navigate("/createpost")
    }

    const username = localStorage.getItem("username");

    return(
        <div className={styles.postsPage}>
            <h1>Posts Page</h1>
            <div className={styles.iconContainer}><BsFilePostFill className={styles.icon} /></div>
            <h2>Welcome, {username}</h2>
            <p>This is the posts page where you can view all posts.</p>
            {loading && <p>Loading posts...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            {posts && (
                <ul className={styles.postsList}>
                    {posts.map((item: Posts) => (
                        <li key={item._id} className={styles.postsContainer} onClick={() => goToPost(item._id!)}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <div className={styles.textWithIcon}><FaPencilAlt className={styles.inlineIcon} /><span>{item.author.username}</span></div>
                            <div className={styles.textWithIcon}><TbFileLike className={styles.inlineIcon} /><span>{item.likes.length}</span></div>
                            <button className={styles.likeButton}
                            onClick={(e) => {
                                // Utilizamos e.stopPropagation() para evitar que el click en el botón redireccione al post
                                e.stopPropagation();
                                handleLike(item._id!);
                            }}><AiFillLike /></button>
                        </li>
                    ))}
                </ul>
            )}
            <button className={styles.createPostButton} onClick={goToCreatePost}>Create post</button>
            <HomeButton />
        </div>
    )
}

export default Posts;