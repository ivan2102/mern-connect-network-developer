import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education: {

    school,
    degree,
    fieldofstudy,
    current,
    from,
    to,
    description
}}) => {
    return (
        <div>
           <h3 className="text-dark">{ school }</h3>

           <p className="text-dark">
               <Moment format="YYYY/MM/DD">{from}</Moment> -{!to ? 'Now'  : <Moment format="YYYY/MM/DD">{to}</Moment>}
           </p>

           <p className="text-dark">
               <strong>Degree: </strong> { degree }
           </p>

           <p className="text-dark">
               <strong>Field of Study: </strong> { fieldofstudy }
           </p>

           <p className="text-dark">
               <strong>Description: </strong> { description }
           </p>
        </div>
    )
}

ProfileEducation.propTypes = {

    education: PropTypes.array.isRequired
}

export default ProfileEducation;
