import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

import styles from '../styles/navbar.module.css';


const Navbar = () => {
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          ></img>
        </a>
      </div>
      <div className={styles.rightDiv}>
        {auth.user && (
          <div className={styles.user}>
            <a href="/">
              <img
                alt=""
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                className={styles.userDp}
              ></img>
            </a>
            <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>
                  Log out
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>

                <li>
                  <a href="/signup">Register</a>
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
