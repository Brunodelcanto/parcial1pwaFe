import { Link } from "react-router"
import styles from "./HomeButton.module.css";

export const HomeButton = () => <div className={styles.container}><Link className={styles.link} to="/home">Go back</Link></div>