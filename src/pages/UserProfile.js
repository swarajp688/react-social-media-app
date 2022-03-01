import styles from '../styles/settings.module.css';
import { useLocation } from 'react-router-dom';
import { FcPortraitMode } from 'react-icons/fc';

const UserProfile = () => {
  const location= useLocation();
  console.log(location);
    const {user = {}} = location.state;
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
          <button className={`button ${styles.saveBtn}`}>Add Friend</button>
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
