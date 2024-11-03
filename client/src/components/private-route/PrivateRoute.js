import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ( props ) => {
    const { component: Component, auth, path, ...rest } = props;
    const userPermission = localStorage.userPermission;
    let hasRights = false, shouldDisplayComponent;
    switch(path) {
        case '/users': 
            if(userPermission === "Admin") {
                hasRights = true;
            }
            break;
        case '/flats':
            if(userPermission === "Admin" || userPermission === "FlatOwners") {
                hasRights = true;
            }
            break;
        case '/facilitys':
            hasRights = true;
            break;
        case '/employees':
            hasRights = true;
            break;
        case '/dashboard':
            hasRights = true;
            break;
        case '/tenants':
            if(userPermission === "Admin" || userPermission === "FlatOwners" || userPermission === "Tenant") {
                hasRights = true;
            }
            break;
        default:
            hasRights = false;
    }
    shouldDisplayComponent = hasRights && auth.isAuthenticated;
    return (
        <Route
            {...rest}
            render={props =>
                shouldDisplayComponent ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
