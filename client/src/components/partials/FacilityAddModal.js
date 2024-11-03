import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFacility } from '../../actions/facilityActions';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class FacilityAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            facilityId: "",
            facilityName: "",
            facilityManager: "",
            facilityManagerNumber: "",
            numberofPersonsAllowed: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined) {
            $('#add-facility-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onFacilityAdd = e => {
       
        e.preventDefault();
        const newFacility = {
            facilityId: this.state.facilityId,
            facilityName: this.state.facilityName,
            facilityManager: this.state.facilityManager,
            facilityManagerNumber: this.state.facilityManagerNumber,
            numberofPersonsAllowed: this.state.numberofPersonsAllowed
        };
        this.props.addFacility(newFacility, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-facility-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Facility Data</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onFacilityAdd} id="add-facility">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="facilityId">Facility Id</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.facilityId}
                                                id="facilityId"
                                                type="text"
                                                error={errors.facilityId}
                                                className={classnames("form-control", {
                                                    invalid: errors.facilityId
                                                })}/>
                                            <span className="text-danger">{errors.facilityId}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="facilityName">Facility Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.facilityName}
                                                error={errors.facilityName}
                                                id="facilityName"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.facilityName
                                                })}
                                            />
                                            <span className="text-danger">{errors.facilityName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="facilityManager">facility Manager</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.facilityManager}
                                                error={errors.facilityManager}
                                                id="facilityManager"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.facilityManager
                                                })}
                                            />
                                            <span className="text-danger">{errors.facilityManager}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="facilityManagerNumber">Facility Manager Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.facilityManagerNumber}
                                                id="facilityManagerNumber"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.facilityManagerNumber
                                                })}
                                            />
                                            <span className="text-danger">{errors.facilityManagerNumber}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="numberofPersonsAllowed">Number of Persons Allowed</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.numberofPersonsAllowed}
                                                id="numberofPersonsAllowed"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.numberofPersonsAllowed
                                                })}
                                            />
                                            <span className="text-danger">{errors.numberofPersonsAllowed}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-facility"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Facility
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FacilityAddModal.propTypes = {
    addFacility: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addFacility }
)(withRouter(FacilityAddModal));
