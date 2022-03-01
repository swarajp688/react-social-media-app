import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { FcPortraitMode } from "react-icons/fc";
const Navbar = () => {
  const auth = useAuth();

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <span>{auth.user.name}</span>
            <Link to="/settings">
            <FcPortraitMode className={styles.userDp}/>
            </Link>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;