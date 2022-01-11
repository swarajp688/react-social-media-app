import {useEffect , useState} from 'react'
import { Loader , Navbar } from '.';
import {getPosts} from '../api';
import { Home ,Login } from '../pages';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

const About = ()=> {
  return <h1>About</h1>
}

const UserInfo = ()=> {
  return <h1>UserInfo</h1>
}
function App() {
  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(true);
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await getPosts();
      console.log('response', response);
      if(response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    }
    fetchPosts();
    

  },[]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      
      <Routes>
      <Route path="/" element={<Home posts={posts} />}>
      </Route>
      <Route path="/about" element={<About /> }></Route>
      <Route path="userinfo" element={<UserInfo />}></Route>
      <Route path="login" element={<Login />}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
