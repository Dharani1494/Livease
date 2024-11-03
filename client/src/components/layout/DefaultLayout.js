import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
import { toast, ToastContainer} from "react-toastify";

class DefaultLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            isFlatOwner: false,
            isTenant: false,
            isEmployee: false
        };
    }

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
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar isAdmin={this.state.isAdmin} isFlatOwner={this.state.isFlatOwner} isTenant={this.state.isTenant} isEmployee={this.state.isEmployee}/>
                        {this.props.children}
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

export default DefaultLayout;
