import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

// Deberá incluirse una barra de navegación que nos permita alternar entre la lista de usuarios y la lista de posts.
const sections = [
    {
        title: "Users",
        NavLink: "/users"
    },
    {
        title: "Posts",
        NavLink: "/posts"
    }
];

export const NavBar = () => {
    return (
        <div>
            {sections.map((section, index) => (
                <NavLink 
                key={index}
                 to={section.NavLink} 
                 className={styles.navLink}>
                    {section.title}
                </NavLink>
            ))}
        </div>
    )
}