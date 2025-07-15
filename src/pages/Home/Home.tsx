import { NavBar } from "../../components/NavBar";
import styles from "./Home.module.css";
import { FaHome } from "react-icons/fa";

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Home Page</h1>
            <div className={styles.iconContainer}>
                <FaHome className={styles.icon} />
            </div>
            <p>Welcome to the home page!</p>
            <p>From here you can navigate to different sections of the app.</p>
            <NavBar />
        </div>
    );
}

export default Home;