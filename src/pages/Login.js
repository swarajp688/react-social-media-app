import { useState } from 'react';
import styles from '../styles/login.module.css';

import { useToasts } from 'react-toast-notifications';
const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const handleSubmit = (e)=> {

    e.preventDefault();
    

    if(!email || !password){
        return addToast("please enter both email/password",{
            appearance:'error',

        });
    }


  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          
          value={email}
          onChange={(e) => setemail(e.target.value)}
        ></input>
        
      </div>
      <div className={styles.field}>
      <input
          type="password"
          placeholder="Password"
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className={styles.field} disabled={loggingIn}>
        <button>{loggingIn ? 'Logging In...' : 'Log In'}</button>
      </div>
    </form>
  );
};

export default Login;
