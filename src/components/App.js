import { Loader, Navbar } from '.';

import { Home, Login, Signup } from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';

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
          <Route path="userinfo" element={<UserInfo />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
