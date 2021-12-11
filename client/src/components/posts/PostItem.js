import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/postAction';
import { deletePost } from '../../actions/postAction';

const PostItem = ({auth, addLike, removeLike, deletePost, post: {

    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date
}, showActions}) => {
    return (
        
        <div className="post bg-profile p-1 my-2">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={ avatar }
                alt=""
              />
              <h4>{name  }</h4>
            </Link>
          </div>
          <div>
            <p className="my-1 text-dark">
              { text }
            </p>
             <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{ date }</Moment>
            </p>


             {showActions && <React.Fragment>

              <button onClick={event => addLike(_id)} type="button" className="btn btn-dark">
              <i className="fas fa-thumbs-up"></i>{' '}
              <span>{likes.length > 0 && <span>{ likes.length }</span>}</span>
            </button>
            <button onClick={event => removeLike(_id)} type="button" className="btn btn-dark">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">


              Discussion {comments.length > 0 && (

              <span className='comment-count'>{ comments.length }</span>
              )}
            </Link>

            { !auth.loading && user === auth.user._id && (

                <button      
                type="button"
                className="btn btn-danger"
                onClick={event =>deletePost(_id)}
                >
                <i className="fas fa-trash-alt"></i>
                </button>
            )}
               
                </React.Fragment>}

             </div>
        </div>
    )
}

PostItem.defaultProps = {

  showActions: true
}

PostItem.propTypes = {

    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired

}

const mapStateToProps = state => ({

  auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost }) (PostItem);
