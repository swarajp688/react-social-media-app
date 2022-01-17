import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";
import styles from '../styles/login.module.css';
const Signup = () => {
    const [userName ,setUserName] = useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [confirmPassword ,setConfirmPassword] = useState('');
    const [signingUp,setSigningUp]=useState(false);
    const {addToast} = useToasts('');
    const auth = useAuth();
    const history = useNavigate();
    const handleFormSubmit = async(e)=> {
        e.preventDefault();
        setSigningUp(true)
        let error=false;
        if(!userName || !email || !password || !confirmPassword){
            addToast('please fill all filled',{
                appearance:"error",
                autoDismiss:true
            });
            error = true;
        }
        if(password !== confirmPassword){
            addToast('Enter Both Password Correctly',{
                autoDismiss:true,
                appearance:'error'
            });
            error = true;

        }

        if(error){
            return signingUp(false);
        }
        const response = await auth.signup(userName ,email ,password , confirmPassword);
        if(response.success){
            history('/login');
            setSigningUp(false);

            addToast('User registered successfully,please login now', {
                appearance:'success',
                autoDismiss:true
            });
        }else {
            addToast(response.message , {
                appearance:'error',
                autoDismiss:true
            })
        }
        setSigningUp(false);
        
    }
    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder=" password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder=" Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
    );
}
export default Signup;
