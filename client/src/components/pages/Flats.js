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
import FlatUpdateModal from "../partials/FlatUpdateModal";
import FlatAddModal from "../partials/FlatAddModal";
import { toast, ToastContainer} from "react-toastify";
import DefaultLayout from "../layout/DefaultLayout";

import flatMetadata from "./metadata/flatMetaData";

class Flats extends Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "_id",
                text: "Id",
                className: "id",
                align: "left",
                sortable: true,
            },
            {
                key: "flatNumber",
                text: "FlatNumber",
                className: "flatNumber",
                align: "left",
                sortable: true,
            },
            {
                key: "flatOwnerName",
                text: "FlatOwnerName",
                className: "flatOwnerName",
                align: "left",
                sortable: true
            },
            {
                key: "flatOwnerNumber",
                text: "FlatOwnerNumber",
                className: "flatOwnerNumber",
                align: "left",
                sortable: true
            },
            {
                key: "flatOwnerProfession",
                text: "FlatOwnerProfession",
                className: "flatOwnerProfession",
                align: "left",
                sortable: true
            },
            {
                key: "date",
                text: "Date",
                className: "date",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-flat-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Flats",
            no_data_text: 'No flat found!',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                flatNumber: '',
                flatOwnerName: '',
                flatOwnerNumber: '',
                flatOwnerProfession: '',
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/flat-data")
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }

    editRecord(record) {
        debugger;
        this.setState({ currentRecord: record});
    }

    deleteRecord(record) {
        axios
            .post("/api/flat-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
           <DefaultLayout>
                <FlatAddModal/>
                <FlatUpdateModal 
                    record={this.state.currentRecord}
                    metadata={flatMetadata}
                />
                <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-link mt-3" id="menu-toggle"><FontAwesomeIcon icon={faList}/></button>
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-flat-modal"><FontAwesomeIcon icon={faPlus}/> Add Flat</button>
                            <h1 className="mt-2 text-primary">Flat List</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                </div>
           </DefaultLayout>
        );
    }

}

Flats.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Flats);
