import React from 'react'
import Select from 'react-select'
import classnames from "classnames";
import PropTypes, { object } from "prop-types";
import { connect } from "react-redux";
import { addTenant } from '../../actions/tenantActions';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class TenantAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            tenantId: "",
            tenantName: "",
            flats: [],
            phoneNumber: "",
            numberOfPeople: "",
            profession: "",
            flat: object,
            errors: {},
            records: []
        };
    }

    componentDidMount() {
        this.getTenantData();
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
            $('#add-tenant-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleChange = e => {
        console.log("selectedOption : ", e);
        this.setState({ flat : e.value});
    }

    onTenantAdd = e => {
       
        e.preventDefault();
        console.log("this.state.flat : ", this.state.flat);
        const newTenant = {
            tenantId: this.state.tenantId,
            tenantName: this.state.tenantName,
            flats: this.state.flat,
            phoneNumber: this.state.phoneNumber,
            numberOfPeople: this.state.numberOfPeople,
            profession: this.state.profession
        };
        this.props.addTenant(newTenant, this.props.history);
    };

    getTenantData() {
        axios
            .post("/api/available-flat-data")
            .then(res => {
                this.setState({ flats: res.data})
            })
    }

    render() {
        const { errors } = this.state;
        let options = this.state.flats.map(function (flat) {
            return { value: flat._id, label: flat.flatNumber };
          })
        return (
            <div>
                <div className="modal fade" id="add-tenant-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Tenant Data</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTenantAdd} id="add-tenant">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="tenantId">Tenant Id</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.tenantId}
                                                id="tenantId"
                                                type="text"
                                                error={errors.tenantId}
                                                className={classnames("form-control", {
                                                    invalid: errors.tenantId
                                                })}/>
                                            <span className="text-danger">{errors.tenantId}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="tenantName">Tenant Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.tenantName}
                                                error={errors.tenantName}
                                                id="tenantName"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.tenantName
                                                })}
                                            />
                                            <span className="text-danger">{errors.tenantName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="flats">Flats</label>
                                        </div>
                                        <div className="col-md-9">
                                            <Select options={options} onChange={this.handleChange} />
                                            <span className="text-danger">{errors.flats}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.phoneNumber}
                                                id="phoneNumber"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.phoneNumber
                                                })}
                                            />
                                            <span className="text-danger">{errors.phoneNumber}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="numberOfPeople">Number Of People</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.numberOfPeople}
                                                id="numberOfPeople"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.numberOfPeople
                                                })}
                                            />
                                            <span className="text-danger">{errors.numberOfPeople}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="profession">Profession</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.profession}
                                                id="profession"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.profession
                                                })}
                                            />
                                            <span className="text-danger">{errors.profession}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-tenant"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Tenant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TenantAddModal.propTypes = {
    addTenant: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addTenant }
)(withRouter(TenantAddModal));
