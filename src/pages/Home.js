import styles from '../styles/home.module.css';
import propTypes from 'prop-types';
import Comments from '../components/Comments';
import { CreatePost, FriendsList, Loader } from '../components';
import { FcPortraitMode ,FcLike,FcComments } from "react-icons/fc";
import { Link } from 'react-router-dom';
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
                <FcLike />{post.likes.length}
                <span>{post.likes}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <FcComments />
                <span>{post.comments.length}</span>
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
    {auth.user ? <FriendsList /> : <></>}
    </div>
  );
};

Home.prototype = {
  posts: propTypes.array.isRequired,
};
export default Home;
