import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getPosts } from '../../actions/postAction';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {

     useEffect(() => {

        getPosts();

     }, [getPosts]);

    return (
        
        loading ? <Spinner /> : (<React.Fragment>


         <h1 className="large text-primary">Posts</h1>
         {/* <p className="lead">
             <i className="fas fa-user"></i> All Users
         </p> */}

         <PostForm />

         <div className="posts">
             {posts.map(post => (

                 <PostItem key={post._id} post={post} />
             ))}
         </div>

        </React.Fragment>)
    )
}

Posts.propTypes = {

    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired

}

const mapStateToProps = state => ({

    post: state.post
})

export default connect(mapStateToProps, { getPosts }) (Posts);
