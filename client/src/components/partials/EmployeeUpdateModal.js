import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateEmployee } from '../../actions/employeeActions';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';
import FieldRenderer from '../common/FieldRenderer';

class EmployeeUpdateModal extends React.Component {

    constructor(props) {
        super(props);

        const { employeeId, employeeName, phoneNumber, profession  } = this.props.record || {};

        const metadata = props.metadata; // metadat form 
        const record = props.record || {}; // Actual Data from service
        const initState = {};

        metadata.map( field => {
            const { employeeId } = field;
           
            initState[employeeId] = record[employeeId];
        });

        console.log(initState);
        console.log(props);

        this.state = {
           ...initState,
            errors: {},
        };

    }

    
    componentWillReceiveProps(nextProps) {

        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                employeeId: nextProps.record.employeeId,
                employeeName: nextProps.record.employeeName,
                phoneNumber: nextProps.record.phoneNumber,
                profession: nextProps.record.profession,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined
            && nextProps.auth.user.data.success) {
            $('#update-employee-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = value => {
        this.setState({ ...value });
    };

    onEmployeeUpdate = e => {
        e.preventDefault();

        const newEmployee = {
            _id: this.state.id,
            employeeId: this.state.employeeId,
            employeeName: this.state.employeeName,
            phoneNumber: this.state.phoneNumber,
            profession: this.state.profession
        };
        this.props.updateEmployee(newEmployee);
    };

    renderFields = () => {

        const { metadata=[] } = this.props;

        return metadata.map(( field )=> {

            const { label, name, type, className=''} = field;

            return <FieldRenderer
                        changeHandler={this.onChange}
                        label={label}
                        value={this.state[name]}
                        error={this.state.errors[name]}
                        name={name}
                        type={type}
                        className={className}
                        {...field}
                    />
        });
    }
    render() {

        return (
            <div>
                <div className="modal fade" id="update-employee-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Employee</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onEmployeeUpdate} id="update-employee">
        
                                  { this.renderFields() }
                                  
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-employee"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Employee
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EmployeeUpdateModal.propTypes = {
    updateEmployee: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateEmployee }
)(withRouter(EmployeeUpdateModal));
