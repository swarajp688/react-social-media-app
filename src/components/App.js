import { Loader, Navbar } from '.';

import { Home, Login, Settings, Signup, UserProfile } from '../pages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function PrivateRoute ({children}){
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}
const About = () => {
  return <h1>About</h1>;
};

const UserInfo = () => {
  return <h1>UserInfo</h1>;
};
function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/userinfo" element={<UserInfo />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/settings" element={<PrivateRoute><Settings/> </PrivateRoute>}> </Route>
          <Route path="/user/:userId" element={<PrivateRoute><UserProfile /> </PrivateRoute>}> </Route>
        
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
