import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css"
const Navbar = ()=> {
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href='/'>
                    <img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'></img>
                </a>
            </div>
            <div className={styles.rightDiv}>
                <div className={styles.user}>
                    <a href='/'>
                        <img alt='' src='https://image.flaticon.com/icons/svg/2154/2154651.svg' className={styles.userDp}></img>
                    </a>
                    <span>Swaraj</span>
                </div>
                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
                        <li>
                            <a href='/'>Log out</a>
                        </li>
                        <li>
                            <a href='/'>Register</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    );
}

export default Navbar;