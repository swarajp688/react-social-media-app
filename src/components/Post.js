import { FcPortraitMode, FcLike, FcComments } from 'react-icons/fc';
import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePosts } from '../hooks';
import { createComment } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState(false);
  const posts = usePosts();
  const {addToast} = useToasts();

  const handleAddComment = async (e) => {
      console.log(e.key)
    if (e.key == 'Enter') {
      setAddComment(true);
      if (comment === '' || comment === undefined) {
        setAddComment(false);

        return addToast('Cannot Create Empty Post', {
          appearance: 'error',
        });
      }
      const response = await createComment(comment, post._id);
      if (response.success) {
        setComment('');
        posts.addCommentToState(response.data.comment, post._id)
        addToast('Commented Successfully', {
          appearance: 'success',
        });
      }else {
          addToast(response.message, {
              appearance:'error'
          })
      }
      setAddComment(false);

    }
  };


  
  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <FcPortraitMode className={styles.image} />
          <div>
            <Link
              to={`/user/${post.user._id}`}
              state={{ user: post.user }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <FcLike />
            {post.likes.length}
            <span>{post.likes}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <FcComments />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>
        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comments={comment}></Comment>
          ))}
        </div>
      </div>
    </div>
  );
};
Post.propTypes = {
    posts: PropTypes.object.isRequired,
  };
export default Post;
