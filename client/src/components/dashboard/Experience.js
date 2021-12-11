import React from "react";
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from "../../actions/profileAction";
import { connect } from 'react-redux';

const Experience = ({experience, deleteExperience}) => {

    const experiences = experience.map(experience => (

        <tr key={experience._id}>
            <td>{experience.company}</td>
            <td className="hide-sm">{experience.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{experience.from}</Moment> -{' '}
                
                 {experience.to === null ? ('Now') :
                  (<Moment format='YYYY/MM/DD'>{experience.to}</Moment>)
                }
            </td>

        <td>
                 
        <i onClick={() => deleteExperience(experience._id)} style={{cursor: 'pointer'}} className="fas fa-trash-alt text-danger"></i> Delete
                
               
        </td>

        </tr>
        
    ))

    return(

        <React.Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th className="bg-info" >Company</th>
                        <th className="hide-sm bg-info">Title</th>
                        <th className="hide-sm bg-info">Years</th>
                        <th className="hide-sm bg-info">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {experiences}
                </tbody>
            </table>
        </React.Fragment>
    )
}

Experience.propTypes = {

  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience }) (Experience);