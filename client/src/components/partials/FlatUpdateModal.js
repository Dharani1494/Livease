import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateFlat } from '../../actions/flatActions';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';
import FieldRenderer from '../common/FieldRenderer';

class FlatUpdateModal extends React.Component {

    constructor(props) {
        super(props);

        const { id, flatNumber, flatOwnerName, flatOwnerNumber, flatOwnerProfession  } = this.props.record || {};

        const metadata = props.metadata; // metadat form 
        const record = props.record || {}; // Actual Data from service
        const initState = {};

        metadata.map( field => {
            const { flatNumber } = field;
           
            initState[flatNumber] = record[flatNumber];
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
                flatNumber: nextProps.record.flatNumber,
                flatOwnerName: nextProps.record.flatOwnerName,
                flatOwnerNumber: nextProps.record.flatOwnerNumber,
                flatOwnerProfession: nextProps.record.flatOwnerProfession,
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
            $('#update-flat-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = value => {
        this.setState({ ...value });
    };

    onFlatUpdate = e => {
        e.preventDefault();

        const newFlat = {
            _id: this.state.id,
            flatNumber: this.state.flatNumber,
            flatOwnerName: this.state.flatOwnerName,
            flatOwnerNumber: this.state.flatOwnerNumber,
            flatOwnerProfession: this.state.flatOwnerProfession
        };
        this.props.updateFlat(newFlat);
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
                <div className="modal fade" id="update-flat-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Flat</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onFlatUpdate} id="update-flat">
        
                                  { this.renderFields() }
                                  
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-flat"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Flat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FlatUpdateModal.propTypes = {
    updateFlat: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateFlat }
)(withRouter(FlatUpdateModal));
