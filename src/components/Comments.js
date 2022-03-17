import styles from '../styles/home.module.css';
function Comment({ comments }) {
  const timestamp=new Date(comments.createdAt).getTime();
  const todate=new Date(timestamp).getDate();
  const tomonth=new Date(timestamp).getMonth()+1;
  const toyear=new Date(timestamp).getFullYear();
  const original_date=tomonth+'/'+todate+'/'+toyear;
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comments.user.name}</span>
        <span className={styles.postCommentTime}>{original_date}</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>

      <div className={styles.postCommentContent}>{comments.content}</div>
    </div>
  );
}

export default Comment;
