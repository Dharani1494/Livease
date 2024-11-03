import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTenant } from '../../actions/tenantActions';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';
import FieldRenderer from '../common/FieldRenderer';

class TenantUpdateModal extends React.Component {

    constructor(props) {
        super(props);

        const { id, tenantId, tenantName, flatNumber, phoneNumber, numberOfPeople, profession  } = this.props.record || {};

        const metadata = props.metadata; // metadat form 
        const record = props.record || {}; // Actual Data from service
        const initState = {};

        metadata.map( field => {
            const { tenantId } = field;
           
            initState[tenantId] = record[tenantId];
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
            console.log("nextProps.record : ", nextProps.record);
            this.setState({
                id: nextProps.record.id,
                tenantId: nextProps.record.tenantId,
                tenantName: nextProps.record.tenantName,
                flatNumber: nextProps.record.flatNumber,
                phoneNumber: nextProps.record.phoneNumber,
                numberOfPeople: nextProps.record.numberOfPeople,
                profession: nextProps.record.profession
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
            $('#update-tenant-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = value => {
        this.setState({ ...value });
    };

    onTenantUpdate = e => {
        e.preventDefault();

        const newTenant = {
            _id: this.state.id,
            tenantId: this.state.tenantId,
            tenantName: this.state.tenantName,
            flatNumber: this.state.flatNumber,
            phoneNumber: this.state.phoneNumber,
            numberOfPeople: this.state.numberOfPeople,
            profession: this.state.profession
        };
        this.props.updateTenant(newTenant);
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
                <div className="modal fade" id="update-tenant-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Tenant</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTenantUpdate} id="update-tenant">
        
                                  { this.renderFields() }
                                  
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-tenant"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Tenant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TenantUpdateModal.propTypes = {
    updateTenant: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateTenant }
)(withRouter(TenantUpdateModal));
