import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getProfiles } from '../../actions/profileAction';
import ProfileItem from './ProfileItem';


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {

        getProfiles();

    }, [getProfiles]);


    return (
        <React.Fragment>

            { loading ? <Spinner /> : <React.Fragment>

                <h1 className="large text-primary">Developers</h1>
                    {/* <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Choose your teaching developers
                    </p> */}
                      <div className="profiles">
                        { profiles.length > 0 ? (

                            profiles.map(profile => (

                                <ProfileItem key={profile._id} profile={ profile } />
                            ))
                        ) : <h3>No profiles found for this user</h3>}
                    </div>
                
            </React.Fragment> }
            
        </React.Fragment>
    )
}

Profiles.propTypes = {

    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles }) (Profiles);
