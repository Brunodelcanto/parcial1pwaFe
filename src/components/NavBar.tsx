import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

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
        <div className={styles.navBar}>
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