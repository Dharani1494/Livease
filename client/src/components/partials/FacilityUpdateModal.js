import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateFacility } from '../../actions/facilityActions';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';
import FieldRenderer from '../common/FieldRenderer';

class FacilityUpdateModal extends React.Component {

    constructor(props) {
        super(props);

        const { id, facilityId, facilityName, facilityManager, facilityManagerNumber, numberofPersonsAllowed  } = this.props.record || {};

        const metadata = props.metadata; // metadat form 
        const record = props.record || {}; // Actual Data from service
        const initState = {};

        metadata.map( field => {
            const { facilityId } = field;
           
            initState[facilityId] = record[facilityId];
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
                facilityId: nextProps.record.facilityId,
                facilityName: nextProps.record.facilityName,
                facilityManager: nextProps.record.facilityManager,
                facilityManagerNumber: nextProps.record.facilityManagerNumber,
                numberofPersonsAllowed: nextProps.record.numberofPersonsAllowed,
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
            $('#update-facility-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = value => {
        this.setState({ ...value });
    };

    onFacilityUpdate = e => {
        e.preventDefault();

        const newFacility = {
            _id: this.state.id,
            facilityId: this.state.facilityId,
            facilityName: this.state.facilityName,
            facilityManager: this.state.facilityManager,
            facilityManagerNumber: this.state.facilityManagerNumber,
            numberofPersonsAllowed: this.state.numberofPersonsAllowed
        };
        this.props.updateFacility(newFacility);
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
                <div className="modal fade" id="update-facility-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Facility</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onFacilityUpdate} id="update-facility">
        
                                  { this.renderFields() }
                                  
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-facility"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Facility
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FacilityUpdateModal.propTypes = {
    updateFacility: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateFacility }
)(withRouter(FacilityUpdateModal));
