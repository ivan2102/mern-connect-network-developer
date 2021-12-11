import React from "react";
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileAction';
import { connect } from 'react-redux';


const Education = ({ education, deleteEducation }) => {

    const educations= education.map(education => (

        <tr key="education.id">
            <td>{education.school}</td>
            <td className="hide-sm">{education.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{education.from}</Moment> -{' '}
                {
                education.to === null ? 
                ('Now') :
                
                (<Moment format='YYYY/MM/DD'>{education.to}</Moment>)}
            </td>
            <td>
                
             <i style={{cursor: 'pointer'}} onClick={() => deleteEducation(education._id)} className="fas fa-trash-alt text-danger"></i> Delete
             </td>
        </tr>
    ))

    return(

    <React.Fragment>
        
     <h2 className="my-2">Education</h2>
     <table className="table table-bordered table-hover table-striped">
         <thead>
             <tr>
                 <th className="bg-info">School</th>
                 <th className="hide-sm bg-info">Degree</th>
                 <th className="hide-sm bg-info">Years</th>
                 <th className="hide-sm bg-info">Delete</th>
             </tr>
         </thead>

         <tbody>
             { educations }
         </tbody>
     </table>
    </React.Fragment>

    )
}

Education.propTypes = {

    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation }) (Education);