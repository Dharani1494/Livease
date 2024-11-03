import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {Link} from "react-router-dom";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons/faUserAlt";
import $ from 'jquery';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isAdmin: false,
            isFlatOwner: false,
            isTenant: false,
            isEmployee: false
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        switch(localStorage.userPermission) {
            case 'Admin' : 
                this.setState({ isAdmin : true});
                break;
            case 'FlatOwners' : 
                this.setState({ isFlatOwner : true});
                break;   
            case 'Tenant' : 
                this.setState({ isTenant : true});
                break;  
            case 'Employee' : 
                this.setState({ isEmployee : true});
                break;  
        }
    }

    render() {
        //const { user } = this.props.auth;
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar isAdmin={this.state.isAdmin} isFlatOwner={this.state.isFlatOwner} isTenant={this.state.isTenant} isEmployee={this.state.isEmployee}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-link mt-2" id="menu-toggle"><FontAwesomeIcon icon={faList}/></button>
                            {this.state.isAdmin && <div>
                                <div className="row px-2">
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Users</h5>
                                                <p className="card-text">Create, Edit Delete Users.</p>
                                                <Link to="/users" className="btn btn-dark"><i class="fa fa-user" aria-hidden="true"></i> Go to Users</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Flat</h5>
                                                <p className="card-text">Add, Edit and Delete the Flat.</p>
                                                <Link to="/flats" className="btn btn-dark"><i class="fa fa-building" aria-hidden="true"></i> Flat Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Facility</h5>
                                                <p className="card-text">Add, Edit and Delete the Facility.</p>
                                                <Link to="/facilitys" className="btn btn-dark"><i class="fa fa-gamepad" aria-hidden="true"></i> Facilities</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Employee</h5>
                                                <p className="card-text">Add, Edit and Delete the Employee.</p>
                                                <Link to="/employees" className="btn btn-dark"><i class="fa fa-user" aria-hidden="true"></i> Employee Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row px-2">
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Tenant</h5>
                                                <p className="card-text">Add, Edit and Delete the Tenant.</p>
                                                <Link to="/tenants" className="btn btn-dark"><i class="fa fa-building" aria-hidden="true"></i> Tenant Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {this.state.isFlatOwner && <div>
                                <div className="row px-2">
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Flat</h5>
                                                <p className="card-text">Add, Edit and Delete the Flat.</p>
                                                <Link to="/flats" className="btn btn-dark"><i class="fa fa-building" aria-hidden="true"></i> Flat Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Facility</h5>
                                                <p className="card-text">Add, Edit and Delete the Facility.</p>
                                                <Link to="/facilitys" className="btn btn-dark"><i class="fa fa-gamepad" aria-hidden="true"></i> Facilities</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Employee</h5>
                                                <p className="card-text">Add, Edit and Delete the Employee.</p>
                                                <Link to="/employees" className="btn btn-dark"><i class="fa fa-user" aria-hidden="true"></i> Employee Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Tenant</h5>
                                                <p className="card-text">Add, Edit and Delete the Tenant.</p>
                                                <Link to="/tenants" className="btn btn-dark"><i class="fa fa-building" aria-hidden="true"></i> Tenant Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {this.state.isTenant && <div>
                                <div className="row px-2">
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Facility</h5>
                                                <p className="card-text">Add, Edit and Delete the Facility.</p>
                                                <Link to="/facilitys" className="btn btn-dark"><i class="fa fa-gamepad" aria-hidden="true"></i> Facilities</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Employee</h5>
                                                <p className="card-text">Add, Edit and Delete the Employee.</p>
                                                <Link to="/employees" className="btn btn-dark"><i class="fa fa-user" aria-hidden="true"></i> Employee Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Tenant</h5>
                                                <p className="card-text">Add, Edit and Delete the Tenant.</p>
                                                <Link to="/tenants" className="btn btn-dark"><i class="fa fa-building" aria-hidden="true"></i> Tenant Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {this.state.isEmployee && <div>
                                <div className="row px-2">
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Facility</h5>
                                                <p className="card-text">Add, Edit and Delete the Facility.</p>
                                                <Link to="/facilitys" className="btn btn-dark"><i class="fa fa-gamepad" aria-hidden="true"></i> Facilities</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-sm-2">
                                        <div className="card bg-light shadow-lg">
                                            <div className="card-body">
                                                <h5 className="card-title">Employee</h5>
                                                <p className="card-text">Add, Edit and Delete the Employee.</p>
                                                <Link to="/employees" className="btn btn-dark"><i class="fa fa-user" aria-hidden="true"></i> Employee Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
