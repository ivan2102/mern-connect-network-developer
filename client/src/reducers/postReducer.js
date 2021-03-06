import {

    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    REMOVE_COMMENT,
    UPDATE_LIKES,
    ADD_COMMENT
    
    

} from '../actions/types';

const initialState = {

    posts: [],
    post: null,
    loading: false,
    error: {}
}

export default function(state = initialState, action) {

    switch(action.type) {

        case GET_POSTS:

        return {

            ...state,
            posts: action.payload,
            loading: false
        }

        case GET_POST: 

        return {

            ...state,
            post: action.payload,
            loading: false
        }

        case ADD_POST:

        return {

            ...state,
            posts: [ action.payload, ...state.posts ],
            loading: false
        }

        case ADD_COMMENT: 

        return {

            ...state,
            post: { ...state.post, comments: action.payload },
            loading: false
        }

        case UPDATE_LIKES:

        return {

            ...state,
            posts: state.posts.map(post => post._id === action.payload.id ? 
                
                {...post, likes: action.payload.likes} : post),
            loading: false
        }

        case DELETE_POST:

        return {

            ...state,
            posts: state.posts.filter(post => post._id !== action.payload.id),
            loading: false
        }

        case REMOVE_COMMENT: 

        return {

            ...state,
            post: {

                ...state.post,
                comments: state.post.comments.filter(comment => comment._id !== action.payload),
                loading: false
            }

        }


        case POST_ERROR:

        return {

            ...state,
            error: action.payload,
            loading: false
        }

        default:

        return state;
    }
}