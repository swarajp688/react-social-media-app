import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { FcPortraitMode } from "react-icons/fc";
import { useState , useEffect} from 'react';
import { FaSearch } from "react-icons/fa";
import { searchUsers } from '../api';
const Navbar = () => {
const auth = useAuth();
const [results , setResults]= useState([]);
const [searchText , setsearchText]= useState([]);
useEffect(()=>{
    const fetchUsers =async ()=>{
      const response = await searchUsers(searchText);
      if(response.success){
        setResults(response.data.users);
      }
    }
    if(searchText.length >2){
      fetchUsers();

    }
},[searchText]);
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
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input placeholder='Searcch users' value={searchText} onChange={(e)=> setsearchText(e.target.value)}/>
        {results.length > 0 && <div className={styles.searchResults}>
          <ul>
            {results.map(user => <li className={styles.searchResultsRow} key={`user-${user._id}`} >
              <Link to={`/user/${user._id}`}>
              <FcPortraitMode className={styles.userDp}/>
              <span>{user.name}</span>
              </Link>
            </li>)}
          </ul>
          </div>}
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