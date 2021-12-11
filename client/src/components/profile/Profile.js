import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import { getProfileById } from '../../actions/profileAction';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, match, profile: {profile, loading}, auth }) => {

    useEffect(() => {

        getProfileById(match.params.id);

    }, [getProfileById, match.params.id]);


return(

    <React.Fragment>
        {profile === null || loading ? <Spinner/> : (<React.Fragment>
           
         <Link className='mt-3' to='/profiles' className="btn btn-primary"> 
          Back to Profiles 
          </Link>  

         {auth.isAuth &&
          auth.loading === false &&
           auth.user._id === profile.user._id && 
           (<Link to='/edit-profile' className="btn btn-primary my-2">Edit Profile</Link>)}
            
            <div className="profile-grid my-1">

            <ProfileTop profile={ profile }/>

            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-profile p-2">
                <h2 className="text-primary">Experience</h2>

              {profile.experience.length > 0 ? (
              
              <React.Fragment>

               {profile.experience.map(experience => (

                   <ProfileExperience key={experience._id} experience={ experience }/>
               ))}

              </React.Fragment>
              
              ) : (
              
              <h4 className="text-dark">No experience found for this user</h4>
              
              )}

            </div>


            <div className="profile-edu bg-profile p-2">
                <h2 className="text-primary">Education</h2>

                {profile.education.length > 0 ? 
                
                (
                
                <React.Fragment>

                  {profile.education.map(education => (

                <ProfileEducation key={education._id} education={ education } />
                 ))}

                </React.Fragment>
                
                ) : (
                
                <h4 className="text-dark">No education found for this user</h4>
                
                )}
            </div>


             {profile.githubusername && (

                 <ProfileGithub username={ profile.githubusername }/>
             )}

            </div>   
       

        </React.Fragment>)}
    </React.Fragment>
)

    // return profile ? (


    //     <React.Fragment>
                     
    //               

    //                </React.Fragment>

    // ) : null;
       

 }
     

Profile.propTypes = {

    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

    profile: state.profile,
    auth: state.auth
})

    


export default connect(mapStateToProps, { getProfileById }) (Profile);
