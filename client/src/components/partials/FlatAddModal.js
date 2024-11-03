import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFlat } from '../../actions/flatActions';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class FlatAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            flatNumber: "",
            flatOwnerName: "",
            flatOwnerNumber: "",
            flatOwnerProfession: "",
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
            $('#add-flat-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onFlatAdd = e => {
       
        e.preventDefault();
        const newFlat = {
            flatNumber: this.state.flatNumber,
            flatOwnerName: this.state.flatOwnerName,
            flatOwnerNumber: this.state.flatOwnerNumber,
            flatOwnerProfession: this.state.flatOwnerProfession
        };
        this.props.addFlat(newFlat, this.props.history);
    };

    render() {
        const { errors } = this.state;
        console.log("Inside flat add modal")
        return (
            <div>
                <div className="modal fade" id="add-flat-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Flat Data</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onFlatAdd} id="add-flat">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="flatNumber">Flat Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.flatNumber}
                                                id="flatNumber"
                                                type="text"
                                                error={errors.flatNumber}
                                                className={classnames("form-control", {
                                                    invalid: errors.flatNumber
                                                })}/>
                                            <span className="text-danger">{errors.flatNumber}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="flatOwnerName">Flat Owner Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.flatOwnerName}
                                                error={errors.flatOwnerName}
                                                id="flatOwnerName"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.flatOwnerName
                                                })}
                                            />
                                            <span className="text-danger">{errors.flatOwnerName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="flatOwnerNumber">Flat Owner Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.flatOwnerNumber}
                                                error={errors.flatOwnerNumber}
                                                id="flatOwnerNumber"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.flatOwnerNumber
                                                })}
                                            />
                                            <span className="text-danger">{errors.flatOwnerNumber}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="flatOwnerProfession">Flat Owner Profession</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.flatOwnerProfession}
                                                id="flatOwnerProfession"
                                                type="flat"
                                                className={classnames("form-control", {
                                                    invalid: errors.flatOwnerProfession
                                                })}
                                            />
                                            <span className="text-danger">{errors.flatOwnerProfession}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-flat"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Flat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FlatAddModal.propTypes = {
    addFlat: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addFlat }
)(withRouter(FlatAddModal));
