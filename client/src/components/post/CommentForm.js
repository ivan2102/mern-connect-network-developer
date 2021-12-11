import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postAction';

const CommentForm = ({postId, addComment }) => {

    const [ text, setText ] = useState('');

    const submitHandler = event => {

        event.preventDefault();

        addComment(postId, {text});
        setText('');
    }

    return (
    
        <div className="post-form p-1">
        <div className="bg-navbar p">
          <h3>Post a comment...</h3>
        </div>
        <form onSubmit={ submitHandler } className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a comment"
            value={ text }
            onChange={event => setText(event.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-primary my-2" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {

    addComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}



export default connect(null, { addComment }) (CommentForm);
