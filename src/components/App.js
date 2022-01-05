import {useEffect , useState} from 'react'
import { Loader , Navbar } from '.';
import {getPosts} from '../api';
import { Home  } from '../pages';
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
      <Navbar />
      <Home posts={posts}></Home>
    </div>
  );
}

export default App;
