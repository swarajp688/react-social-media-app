import { useState } from 'react';
import styles from '../styles/home.module.css';
import { useToasts } from 'react-toast-notifications';
import { addPost } from '../api/index';
import { usePosts } from '../hooks';
const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();

  const hanndleAddPost = async () => {
    setAddingPost(true);
    if (post === '' || post === undefined) {
    setAddingPost(false);

      return addToast('Cannot Create Empty Post', {
        appearance: 'error',
      });
    }

    const response = await addPost(post);
    console.log(response);
    if (response.success) {
      posts.addPostsToState(response.data.post);
      setPost('');
      addToast('Post Created Successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setAddingPost(false);
  };
  return (
    <div className={styles.CreatePost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button className={styles.addPostBtn} onClick={hanndleAddPost}>
          {addingPost ? 'Posting' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
