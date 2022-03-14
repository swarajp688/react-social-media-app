import styles from '../styles/home.module.css';
import propTypes from 'prop-types';
import { CreatePost, FriendsList, Loader,Post } from '../components';
import { useAuth, usePosts } from '../hooks';



const Home = () => {
  const auth= useAuth();
  const posts = usePosts();
  
  
  

  if(posts.loading) {
    return <Loader></Loader>
  }
  return (
    <div className={styles.home}>
    <div className={styles.postsList}>
      <CreatePost />
      {posts.data.map((post) => (
        <Post post={post} key={`post-${post._id}`} />
      ))}
    </div>
    {auth.user ? <FriendsList /> : <></>}
    </div>
  );
};

Home.prototype = {
  posts: propTypes.array.isRequired,
};
export default Home;
