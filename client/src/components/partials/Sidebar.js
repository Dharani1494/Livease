import React, { useState } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link, useHistory} from "react-router-dom";
import classnames from "classnames";


const Sidebar = ( props ) => {

    const [menuName, setMenuName ] = useState('');

    const onLogoutClick = e => {
        e.preventDefault();
        props && props.logoutUser();
    };

    const expandMenu = (e)=> {
        const classNames= e.target.className;
        console.dir(e.target.hash)
        if( !classNames.includes("collapsed")){
            setMenuName(e.target.hash);
        }else{
            setMenuName('');
        }
        
    }

    return (
        <div className="border-right h-100" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <nav id="navbar-example3" className="navbar navbar-light bg-light">
                
                        <nav className="nav nav-pills flex-column">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            {props.isAdmin && <Link to="/users" className="nav-link">Users</Link>}
                            {(props.isAdmin || props.isFlatOwner) && <Link to="/flats" className="nav-link">Flats</Link>}
                            <Link to="/facilitys" className="nav-link">Facility</Link>
                            <Link to="/employees" className="nav-link">Employee</Link>
                            {(props.isAdmin || props.isFlatOwner || props.isTenant) && <Link to="/tenants" className="nav-link">Tenant</Link>}
                            <a href="#" className="nav-link" onClick={onLogoutClick}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></a>
                            
                        </nav>
                    </nav>
                </div>
        </div>
    );
}


Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);
