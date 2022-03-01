import { useEffect ,useState} from 'react';
import styles from '../styles/home.module.css';
import propTypes from 'prop-types';
import Comments from '../components/Comments';
import { getPosts } from '../api';
import { Loader } from '../components';
import { FcPortraitMode ,FcLike,FcComments } from "react-icons/fc";
import { Link } from 'react-router-dom';



const Home = () => {

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
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
            <FcPortraitMode className={styles.image}/>

              <div>
                <Link to={`/user/${post.user._id}`} state={{user : post.user}} className={styles.postAuthor}>{post.user.name}</Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <FcLike />Like
                <span>{post.likes}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <FcComments />
                <span>5</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>
            <div className={styles.postCommentsList}>
              {post.comments.map(comment => (
                <Comments comments={comment}></Comments>
              ))}
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Home.prototype = {
  posts: propTypes.array.isRequired,
};
export default Home;
