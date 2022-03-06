import styles from '../styles/settings.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FcPortraitMode } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { userInfo, fetchFriends, addFriend, removeFriend } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const { addToast } = useToasts();
  const history = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [progress, setProgress] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    console.log('user profile useEffect');
    const getUser = async () => {
      const response = await userInfo(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return history.push('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userId, history, addToast]);

  const checkIfUserIsFriend = () => {
    const friends = auth.user.friends;
    const friendsIds = friends.map((friend) => friend.to_user._id);
    const index = friendsIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleRemoveFriend = async () => {
    setProgress(true);
    const response = await removeFriend(userId);

    if (response.success) {
      const friendShip = auth.user.friends.filter(
        (friend) => friend.to_user._id == userId
      );
      auth.updateUserFriends(false, friendShip[0]);
      addToast('Friend Removed', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'errors',
      });
    }

    setProgress(false);
  };

  const handleAddFriend = async () => {
    setProgress(true);
    const response = await addFriend(userId);
    console.log(response);

    if (response.success) {
      const { friendShip } = response.data;
      console.log('friendShip', friendShip);
      auth.updateUserFriends(true, friendShip);
      addToast('Friend added succcessfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'errors',
      });
    }

    setProgress(false);
  };

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className={styles.settings}>
      <div className={styles.imageContainer}>
        <FcPortraitMode className={styles.image} />
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Email</div>
          <div className={styles.fieldValue}>{user.email}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Name</div>

          <div className={styles.fieldValue}>{user.name}</div>
        </div>

        <div className={styles.btnGrp}>
          {checkIfUserIsFriend() ? (
            <button
              className={`button ${styles.saveBtn}`}
              onClick={handleRemoveFriend}
              disabled={progress}
            >
              {progress ? 'Removing Friend...' : 'Remove Friend'}
            </button>
          ) : (
            <button
              className={`button ${styles.saveBtn}`}
              onClick={handleAddFriend}
              disabled={progress}
            >
              {progress ? 'Adding Friend...' : 'Add Friend'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
