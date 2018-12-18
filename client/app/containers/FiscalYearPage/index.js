import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';

// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Button from "../../components/CustomButtons/Button";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

import injectSaga from "../../utils/injectSaga";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import saga from "./saga";
import { loadAllRequest, deleteOneRequest } from "./actions";
import { makeSelectAll } from "./selectors";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
});

/* eslint-disable react/prefer-stateless-function */
export class FiscalYearPage extends React.Component {
  state = { query: {}, name: "" };
  componentDidMount() {
    this.props.loadAll();
  }

  handleQueryChange = e => {
    e.persist();
    this.setState(state => ({
      query: {
        ...state.query,
        [e.target.name]: e.target.value
      }
    }));
  };
  handleAdd = () => {
    this.props.history.push("/wt/fiscal-manage/add");
  };
  handleEdit = id => {
    this.props.history.push(`/wt/fiscal-manage/edit/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    this.props.deleteOne(id);
    // this.props.history.push(`/wt/link-manage/edit/${id}`);
  };
  handleSearch = () => {
    this.props.loadAll(this.state.query);
    this.setState({ query: {} });
  };
  render() {
    const { classes, allLinks } = this.props;
    const allLinksObj = allLinks.toJS();
    const tableData = allLinksObj.map(
      ({ _id, FiscalYear, From, To, IsCurrent, IsActive }) => [
        FiscalYear,
        moment(From).format("MMMM Do YYYY, h:mm:ss a"),
        moment(To).format("MMMM Do YYYY, h:mm:ss a"),
        "" + IsCurrent,
        "" + IsActive,

        <React.Fragment>
          <Tooltip
            id="tooltip-top"
            title="Edit Task"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              onClick={() => this.handleEdit(_id)}
            >
              <Edit
                className={classes.tableActionButtonIcon + " " + classes.edit}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleDelete(_id)}
            >
              <Close
                className={classes.tableActionButtonIcon + " " + classes.close}
              />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ]
    );
    return (
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Search and Filter</h4>
            <input
              name="fiscalyear"
              value={this.state.query.fiscalyear || ""}
              onChange={this.handleQueryChange}
              placeholder="Search By Fiscal Year"
            />


            {/* <input
              name="From"
              value={this.state.query.From || ""}
              onChange={this.handleQueryChange}
              placeholder="Search From"
            />
            <input
              name="To"
              value={this.state.query.To || ""}
              onChange={this.handleQueryChange}
              placeholder="Search To"

            /> */}

             <TextField
                id="date"
                name="from"
                label="From"
                type="date"
                value={this.state.query.from || ""}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleQueryChange}
              />
             <TextField
                id="date"
                name="to"
                label="To"
                type="date"
                value={this.state.query.to || ""}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleQueryChange}
              />

            <button onClick={this.handleSearch}>Search</button>
          </CardHeader>
        </Card>
      </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Fiscal Management</h4>
              <p className={classes.cardCategoryWhite}>
                Here are the list of fiscal
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.fiscalYear} />,
                  <FormattedMessage {...messages.rangeFrom} />,
                  <FormattedMessage {...messages.rangeTo} />,
                  <FormattedMessage {...messages.isCurrent} />,
                  <FormattedMessage {...messages.isActive} />
                ]}
                tableData={tableData}
              />
              <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                className={classes.button}
                round={true}
                onClick={this.handleAdd}
              >
                <AddIcon />
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

FiscalYearPage.propTypes = {
  loadAll: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll()
});

const mapDispatchToProps = dispatch => ({
  loadAll: query => dispatch(loadAllRequest(query)),
  deleteOne: (id) => dispatch(deleteOneRequest(id))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "fiscalYearPage", reducer });
const withSaga = injectSaga({ key: "fiscalYearPage", saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(FiscalYearPage);
