import axios from "axios";
import { setAlert } from "./alertAction";
import { 
     ACCOUNT_DELETED,
      CLEAR_PROFILE,
       GET_PROFILE,
        GET_REPOS,
         GET_PROFILES,
          PROFILE_ERROR,
           UPDATE_PROFILE
         } from "./types";

//Get current users profile
export const getProfile = () => async dispatch => {

    try {

        const res = await axios.get('/api/profile/me');

        dispatch({

            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {

        dispatch({

            type: PROFILE_ERROR,
            payload: {msg: err.response.data.message, status: err.response.status}
        })
        
    }
}


// Get all Profiles
export const  getProfiles = () => async dispatch => {

    dispatch({

        type: CLEAR_PROFILE
    })

    try {

        const res = await axios.get('/api/profile');

        dispatch({

            type: GET_PROFILES,
            payload: res.data
        })
        
    } catch (err) {

        dispatch({

            type: PROFILE_ERROR,
            payload: { msg: err.response.data.statusText, status: err.response.status }
        })
        
    }
}


// Get profile by ID
export const getProfileById = (userId) => async dispatch => {

    try {

        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({

            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {

        dispatch({

            type: PROFILE_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }
}


// Get Github ripos
export const getGithubRepos = (username) => async dispatch => {

    try {

        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({

            type: GET_REPOS,
            payload: res.data
        })
        
    } catch (err) {

        dispatch({

            type: PROFILE_ERROR,
            payload: {msg: err.response.data.statusText, status: err.response.status}
        })
        
    }
}


// Create or update user Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {

        const config = {

            headers: {

                'Content-Type': 'application/json'
            }
        }

       const body = JSON.stringify(formData)

       const res = await axios.post('/api/profile', body, config);

       dispatch({

        type: GET_PROFILE,
        payload: res.data
       })

       dispatch(setAlert(edit ? 'Your Profile has been updated successfully' : 'Your Profile has been created successfully', 'success'));

       if(!edit) {

       history.push('/dashboard');
       }
        
    } catch (err) {

        const errors = err.response.data.errors;

        if(errors) {

            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({

            type: PROFILE_ERROR,
            payload: { msg: err.response.data.message, status: err.response.status }
        })
        
    }
}


// Add Experience
export const addExperience = (formData, history) => async dispatch => {

    try {

        const config = {

            headers: {

                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(formData);

        const res = await axios.put('/api/profile/experience', body, config);

        dispatch({

            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Your Experience added successfully', 'success'));

        history.push('/dashboard');


        
    } catch (err) {

        const errors = err.response.data.errors;

        if(errors) {

            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({

            type: PROFILE_ERROR,
            payload: { msg: err.response.data.message, status: err.response.status }
        })
        
    }
}


// Add Education
export const addEducation = (formData, history) => async dispatch => {

    try {

        const config = {

            headers: {

                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(formData);

        const res = await axios.put('/api/profile/education', body, config);

        dispatch({

            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Your Education added successfully', 'success'));

        history.push('/dashboard');
        
    } catch (err) {

        const errors = err.response.data.errors;

        if(errors) {

        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        }

        dispatch({

            type: PROFILE_ERROR,
            payload: { msg: err.response.data.message, status: err.response.status }
        })
        
    }
}


// Delete experience
export const deleteExperience = id => async dispatch => {

    try {

        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({

            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('One Experience deleted successfully'));
        
    } catch (err) {

         dispatch({

            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
        
    }
}


// Delete education
export const deleteEducation = id => async dispatch => {

    try {

        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({

            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('One Education deleted successfully', 'success'));
        
    } catch (err) {

        dispatch({

            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
        
    }
}


// Delete account && profile
export const deleteAccount = () => async dispatch => {

    if(window.confirm('Are you sure you want permanently to delete your account!')) {

        try {

             await axios.delete('/api/profile');

            dispatch({

                type: CLEAR_PROFILE
            })

            dispatch({

                type: ACCOUNT_DELETED
            })

            dispatch(setAlert('Your Account has been deleted successfully', 'success'))
            
        } catch (err) {

            dispatch({

                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            })
            
        }
    }
}
