import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';
import { FcPortraitMode } from 'react-icons/fc';
const FriendsList = () => {
    const auth = useAuth();
    const {friends= []}= auth.user;
  return (
    <div className={styles.FriendList}>
      <div className={styles.header}>Friends</div>

      {friends && friends.length === 0 && (<div className={styles.noFriends}>No Friends Found</div>)}

      {friends && friends.map(friend => <div key={`friends-${friend._id}`}>
        {console.log(friend._id)}
          <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
            <div className={styles.friendsImage}>
            <FcPortraitMode/>
                </div>  
                <div className={styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>)}
    </div>
  );
};

export default FriendsList;