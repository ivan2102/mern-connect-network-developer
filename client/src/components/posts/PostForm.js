import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postAction';

const PostForm = ({ addPost }) => {

    const [ text, setText ] = useState('');

    const submitHandler = event => {

        event.preventDefault();

        addPost({ text });
        setText('');
    }

    return (
        
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form onSubmit={ submitHandler } className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={ text }
            onChange={event => setText(event.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-primary my-2" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {

    addPost: PropTypes.func.isRequired

}

export default connect(null, { addPost }) (PostForm);
