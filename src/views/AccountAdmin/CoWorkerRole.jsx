import React from 'react';
import AuthenticatedPage from "../AuthenticatedPage";
import { WithAccount } from '../AccountContext';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormLabel } from '@material-ui/core';
import SelectValidator from 'react-material-ui-form-validator-vivek/lib/SelectValidator';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

const styles = theme => ({
    questionContainer: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "15px"
    },
    labelContainer: {
        marginRight: "35px",
        [theme.breakpoints.up('md')]: {
            textAlign: "right"
        }
    },
    lbltxt: {
        fontSize: "14px",
        fontFamily: "'Roboto', 'Helvetica Neue, Helvetica, Arial, sans-serif'",
    },
    inputItem: {
        width: "100%"
    },
    selectContainer: {
        width: "100%"
    },
    cardRoot: {
        "overflow": "initial"
    },
    cstmBtn:
    {
        color: "#000",
        border: "1px solid",
        borderRadius: "25px"
    },
    paperHeader: {
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "10px"
    },
    pad_15:
    {
        paddingLeft: "15%"
    }
});
class CoWorkerRole extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.initState) {
            this.state = this.props.initState;
        }
        else {
            this.state = { providerList: [], providerReadOnly: '', userid: '', checkedValue: false }
        }
    }
    //getting the Providers list 
    async componentDidMount() {
        let accountid = this.props.currentAccountId;
        let url = '/api/account/' + accountid + '/providers';
        let response = await this.props.authenticatedApiCall('get', url, null)
        if (response.data.length > 0) {
            let labelsArray = response.data.map((item) => {
                return { value: item.userid, label: item.lastname + " " + item.firstname }
            });
            this.setState({
                providerList: labelsArray
            })
        }
        if (this.props.readpermission == 1) {
            this.setState({ checkedValue: true })
        }
    };

    componentDidUpdate() {
        this.props.selectedProviders(this.state.userid);
        this.props.providerReadOnly(this.state.providerReadOnly);
    }

    //handle Checkbox
    handleCheckBox = event => {
        if (this.state.checkedValue == true) {
            this.setState({ checkedValue: false, providerReadOnly: false })
        } else { this.setState({ checkedValue: true, providerReadOnly: true }) }
    }

    //handle multiple provider selection
    handleChangeMultiple = (value) => {
        this.setState({ userid: value });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <GridContainer className={classes.questionContainer}>
                        <GridItem xs={12} sm={12} md={3} className={classes.labelContainer}>
                            <FormLabel className={classes.lbltxt} component="span"> Only Read </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <Checkbox
                                checked={this.state.checkedValue}
                                onChange={this.handleCheckBox}
                                value={this.state.checkedValue}
                                color="primary"
                            />
                        </GridItem>
                    </GridContainer>
                </div>
                {!(this.props.providerId && this.props.providerId.length > 0) &&
                    <div>
                        <div>
                            <GridContainer className={classes.questionContainer}>
                                <GridItem xs={12} sm={12} md={3} className={classes.labelContainer}>
                                    <FormLabel className={classes.lbltxt} component="span"> Providers </FormLabel>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <SelectValidator
                                        options={this.state.providerList}
                                        placeholder='Providers'
                                        onChange={this.handleChangeMultiple}
                                        value={this.state.userid}
                                        withRequiredValidator
                                        validators={['required']}
                                        checkBoxStyled={true}
                                        fullWidth
                                        isMulti
                                        errorMessages={['this field is required']}
                                    />
                                    </GridItem>
                                </GridContainer>
                        </div>
                        
                    </div>}
            </div>
        );
    }
}

CoWorkerRole.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AuthenticatedPage(["AccountAdmin", "DefaultAccountAdmin"])(WithAccount((CoWorkerRole))));