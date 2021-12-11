import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteAccount, getProfile } from "../../actions/profileAction";
import Spinner from "../Layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from './Education';

const Dashboard = ({ getProfile,  auth: { user }, profile: {profile, loading} }) => {

    useEffect(() => {

        getProfile();

    }, [getProfile]);

    return(

       loading && profile === null ? <Spinner /> : <React.Fragment>

        <h1 className="large text-primary">Dashboard</h1>
       <p className="lead_text">
           <i className="fas fa-user-alt"></i> Welcome { user && user.name}
       </p>

       {profile !== null ? (<React.Fragment>

        <DashboardActions />

        <Experience experience={ profile.experience } />

        <Education education={ profile.education } />

        {/* <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus"></i> Delete Account
            </button>
        </div> */}

       </React.Fragment>) : 
       
       (
       <React.Fragment>
        <p>You don't have your profile yet? Create your profile first</p>
        <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
       </React.Fragment>
       
       )}
       </React.Fragment>
    )
};

Dashboard.propTypes = {

    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

    profile: state.profile,
    auth: state.auth
})

    


export default connect(mapStateToProps, { getProfile, deleteAccount }) (Dashboard);