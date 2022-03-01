import styles from '../styles/settings.module.css';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { FcPortraitMode } from "react-icons/fc";

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingFrom] = useState(false);
  const {addToast} = useToasts();
  const clearForm=()=>{
    setPassword('');
    setConfirmPassword('');
    
  }
  const updateProfile =async () => {
    setSavingFrom(true);
    let error = false;
    if (!name || !password || !confirmPassword) {
      addToast('please fill all fields', {
        appearence: 'error',
      });
      error = true;
    }
    if (password !== confirmPassword) {
      addToast('password and confirm password does not match', {
        appearence: 'error',
      });
      error = true;
    }
    if (error) {
      return setSavingFrom(false);
    }
    const response = await auth.updateUser(
        auth.user._id,
        name,
        password,
        confirmPassword
    );
    console.log('settings',response)
    if (response.success) {
        setEditMode(false);
        setSavingFrom(false);
        clearForm();
        addToast('user updated successfully',
        {
            appearence:'success'
        })
        return
    }else {
        return addToast(response.messagge,{
            appearence:'error'
        })
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imageContainer}>
      <FcPortraitMode className={styles.image}/>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Email</div>
          <div className={styles.fieldValue}>{auth.user?.email}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Name</div>
          {editMode ? (
            <>
              <div className={styles.fieldValue}>{auth.user?.name}</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          ) : (
            <div className={styles.fieldValue}>{auth.user?.name}</div>
          )}
        </div>
        {editMode && (
          <>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Confirm Password</div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
          </>
        )}

        <div className={styles.btnGrp}>
          {editMode ? (
            <>
              <button
                className={`button ${styles.editBtn}`}
                onClick={updateProfile}
                disabled={savingForm}
              >
                {savingForm ? 'saving' : 'save'}
              </button>
              <button
                className={`button ${styles.editBtn}`}
                onClick={() => setEditMode(false)}
              >
                Go back
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className={`button ${styles.editBtn}`}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Settings;
