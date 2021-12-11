import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import { getPost } from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {

   useEffect(() => {

    getPost(match.params.id);

   }, [getPost]);

    return (
     
        loading || post === null ? <Spinner /> : (<React.Fragment>

            <Link to="/posts" className="btn btn-primary">Back To Posts</Link>

             <br />

            <PostItem className="my-1" post={post} showActions={ false } />

            <CommentForm postId={post._id} />

            <div className="comments">
                {post.comments.map(comment => (

                    <CommentItem key={comment._id} comment={ comment } postId={post._id}/>
                ))}
            </div>

        </React.Fragment>)
    )
}

Post.propTypes = {

    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired

}

const mapStateToProps = state => ({

  post: state.post
})

export default connect(mapStateToProps, { getPost }) (Post);
