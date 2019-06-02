import React, { Component } from 'react';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator-vivek';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import AuthenticatedPage from "../AuthenticatedPage";
import Avatar from 'react-avatar-edit'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPen, faReply, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';
import SuccessDialog from '../../components/SuccessDialog';
import ErrorDialog from '../../components/ErrorDialog';
import { CardContent, Card, FormLabel, CardActions } from '@material-ui/core';
import queryString from 'query-string';

const styles = theme => ({

    root: { marginLeft: "20px", marginRight: "20px", marginTop: "25px" },
    cardRoot: { "overflow": "initial" },

    primaryBtn: {
        color: "yellow",
        backgroundColor: "green",
        border: "1px solid red",
        borderRadius: "25px",
        padding: "7px 15px",
        marginLeft: "8px",
        '&:hover': {
            backgroundColor: "while",
            color: "blue",
            border: "1px solid black",
        }
    },
    layout: {
        width: 'auto',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        paddingTop: '10px',
        [theme.breakpoints.up(900 + '10px')]: {
            marginBottom: 100,
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'auto'
        },
    },
    button: {
        margin: theme.spacing.unit * 1,
    },
    input: {
        display: 'none',
    },
    inputItem: { width: "100%" },
    lightTooltip: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
    },
    successDialogOK: {
        backgroundColor: "#12b512",
        borderRadius: "25px",
        fontSize: "12px",
        color: "#fff",
        padding: "10px",
        width: "80px"
    },
    secondaryBtn: {
        backgroundColor: "green",
        color: "white",
        border: "1px solid black",
        padding: "8px 20px",
        marginLeft: "5px",
        marginTop: "0px", borderRadius: "25px" 
    },
    paperHeader: { paddingTop: "10px", paddingBottom: "10px", paddingLeft: "10px" },
    questionContainer: { alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    textRight: { textAlign: "right" },
    labelContainer: { marginRight: "35px", [theme.breakpoints.up('md')]: { textAlign: "right" } },
    pad_15: { paddingLeft: "15%" },

});

class ProviderOnBoard extends Component {

    state = {
        selectedPic: null,
        preview: null,
        email: this.props.currentUser.userDetails.email,
        firstname: this.props.currentUser.userDetails.firstname,
        lastname: this.props.currentUser.userDetails.lastname,
        nickname: null,
        checkedA: false,
        openPopOver: false,
        isError: false,
        profileUpdate: false,
        nicknameplaceholder: this.props.currentUser.userDetails.lastname,
        resetpassword: false,
        currentpassword: null,
        newpassword: '',
        confirmpassword: '',
        userError: '',
        passwordUpdate: '',
        selectPic: true,
        userPasswordError: '',
        // defaultImage : process.env.PUBLIC_URL + "/images/" + this.props.theme.custom.profilePic,
        profilePic: false,
        back: false
    }

    componentDidMount = async () => {

        try {
            let path = '/api/ProviderService/getProviderDetails'
            let response = await this.props.authenticatedApiCall('get', path, null)

            if (response.data.status == 1) {
                this.setState({ nickname: response.data.data.nickname, selectedPic:response.data.data.image?"data:image/jpeg;base64,"+response.data.data.image: process.env.PUBLIC_URL + "/images/" + this.props.theme.custom.profilePic, preview: response.data.data.image?"data:image/jpeg;base64,"+response.data.data.image:response.data.data.image, selectPic:false})
            } else { this.setState({ isError: true }) }
        } catch (err) {
            console.log(err)
        }
      
    }

    onClose = () => {
        this.setState({ preview: null })
    }

    onCrop = (preview) => {
        this.setState({ preview })
    }
    handleCheckbox = (event) => {
        this.setState({ checkedA: event.target.checked })
    }
    handleTooltipOpen = () => {
        this.setState({
            openPopOver: true,
        });
    };

    handleTooltipClose = () => {
        this.setState({
            openPopOver: false,
        });
    };
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handlePicRevert = () => {
        this.setState({ preview: null, selectedPic: null })
    }
    altSubmit = async () => {

        if(this.state.nickname == null || this.state.nickname.length===0){
            this.setState({nickname:null})
        }
        let dataToSend = { nickname: this.state.nickname ,image:this.state.preview?this.state.preview:null}
        try {
            let response = await this.props.authenticatedApiCall('post', "/api/ProviderService/updateOnboardDetails", dataToSend)
            if (response.data.status == 1)
                this.setState({ profileUpdate: true })
            else { this.setState({userError: response.data.statusDescription }) }
        } catch (err) {
            console.log(err)
        }
    }
    handleClose = () => {
        this.props.history.push('./profile')
        var parsed = {}
        parsed.reloadTo = 'profile';
        parsed.timeOut = '200';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname : `./formReloader`,
            search : "?"+stringified});
    }
    back = () => {
        var parsed = {}
        parsed.reloadTo = 'profile';
        parsed.timeOut = '200';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname : `./formReloader`,
            search : "?"+stringified});
    }
    dismissDialog = () => {
        var parsed = {}
        parsed.reloadTo = 'profile';
        parsed.timeOut = '200';
        const stringified = queryString.stringify(parsed);
        this.props.history.push({
            pathname : `./formReloader`,
            search : "?"+stringified});
    }
    handleChangePassword = () => {
        this.setState({ resetpassword: true })
    }
    handleClosePassword = () => {
        this.setState({ resetpassword: false, userPasswordError: false, currentpassword: null, newpassword: null, confirmpassword: null })
    }
    handleSubmit = async () => {
        let data = {
            currentpassword: this.state.currentpassword,
            newpassword: this.state.newpassword
        }
        try {
            let response = await this.props.authenticatedApiCall('post', "/api/ProviderService/resetPassword", data)
            if (response.data.status == 1)
                this.setState({ passwordUpdate: true, resetpassword: false })
            else {
                this.setState({ userPasswordError: response.data.statusDescription })
            }
        } catch (err) {
            console.log(err)
        }
    }
    handleEditPic = () => {
        this.setState({selectPic:true, defaultImage: null, back: true})
    }
    handleDeletePic = async () => {
        try {
            let response = await this.props.authenticatedApiCall('delete', "/api/ProviderService/deleteProfilePic", null)
            if (response.data.status == 1)
                this.setState({ profilePic: true })
            else {
                this.setState({ isError: true })
            }
        } catch (err) {
            console.log(err)
        }
    }
    handleBack = () => {
        // this.setState({selectPic:false, defaultImage: process.env.PUBLIC_URL + "/images/" + this.props.theme.custom.profilePic, preview:this.state.selectedPic, back: false})
    }
    render() {
        const { classes, t } = this.props
        console.log("ANUJ")
        console.log(this.props)
        const id = this.state.openPopOver ? 'simple-popper' : null;
        if (this.state.isError) {
            var okbutton = [<Button className={this.props.classes.successDialogOK} onClick={this.handleClose}>{this.props.t('prescribe.OK')}</Button>]
            var HeaderText = this.props.t('publicJs.P__PUBLIC__ERROR_SOMETHING_WENT_WRONG')
        } else {
            var successButton = [<Button className={classes.secondaryBtn} onClick={this.back}>{t('prescribe.OK')}</Button>]
            var HeaderText = t('publicJs.P__PUBLIC__SUCCESS')
            var ProfileUpdated = t('publicJs.P__PUBLIC__USER_HAS_UPDATED_SUCCESSFULLY')
            var PasswordUpdated = 'Password updated successfully'
            var ProfilePic = "Profile picture has been removed successfully"
        }
        var changepassword = () => {
            return (<ValidatorForm onSubmit={this.handleSubmitPassword}>
                <GridContainer className={classes.questionContainer} >
                    
                    <GridItem xs={12}  >

                        <TextValidator
                            required
                            id="currentpassword"
                            name="currentpassword"
                            label="Current Password"
                            type="password"
                            value={this.state.currentpassword}
                            className={classes.inputItem}
                            onChange={this.handleChange}
                        />
                        <p style={{ color: "red" }} >{this.state.userPasswordError}</p>
                    </GridItem>
                    <GridItem xs={12}  >

                        <TextValidator
                            required
                            id="newpassword"
                            name="newpassword"
                            label="New Password"
                            type="password"
                            value={this.state.newpassword}
                            className={classes.inputItem}
                            onChange={this.handleChange}
                            withRequiredValidator
                            validators={['required', 'maxStringLength:16']}
                            errorMessages={[t('login.L__LOGIN__LOGIN_ERROR'), t('login.L__LOGIN_FIRST_TIME_SET_PASSWORD_CONDITION')]}
                        />
                    </GridItem>
                    <GridItem xs={12}  >

                        <TextValidator
                            required
                            id="confirmpassword"
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            value={this.state.confirmpassword}
                            className={classes.inputItem}
                            onChange={this.handleChange}
                            withRequiredValidator
                            validators={['required', `isStringEqual:${this.state.newpassword}`]}
                            errorMessages={[t('login.L__LOGIN__LOGIN_ERROR'), t('superAdmin.SA_SUPER_VALUES_MUST_BE_EQUAL')]}
                        /><br /><br />
                    </GridItem>
                    <GridItem xs={12}>
                        <Button variant="contained" className={classes.primaryBtn} type="submit">{t('common.COMMON__SAVE_BUTTON')}</Button>
                        <Button variant="contained" className={classes.secondaryBtn} onClick={this.handleClosePassword}>{t('common.COMMON__CLOSE')}</Button>
                    </GridItem>
                </GridContainer>
            </ValidatorForm>)
        }
        return (
            <React.Fragment className={classes.root}>
                <main className={classes.layout}>
                    <Card className={classes.cardRoot}>
                        <Paper className={classes.paperHeader}><b>My Profile</b></Paper>
                            <ValidatorForm onSubmit={this.handleSubmit}>
                            <CardContent>
                                <GridContainer className={classes.questionContainer}>
                                    
                                    <GridItem xs={12} sm={12} md={3} className={classes.labelContainer}>
                                        <FormLabel className={classes.lbltxt} component="span"> First Name </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5} >
                                        <TextValidator
                                            required
                                            id="firstname"
                                            name="firstname"
                                            label="First Name"
                                            value={this.state.firstname}
                                            className={classes.inputItem}
                                            onChange={this.handleChange}
                                            disabled
                                            fullWidth
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer className={classes.questionContainer}>

                                    <GridItem xs={12} sm={12} md={3} className={classes.labelContainer}>
                                        <FormLabel className={classes.lbltxt} component="span"> Last Name </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5} >
                                        <TextValidator
                                            required
                                            id="lastname"
                                            name="lastname"
                                            label="Last Name"
                                            className={classes.inputItem}
                                            value={this.state.lastname}
                                            onChange={this.handleChange}
                                            disabled
                                            fullWidth
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer className={classes.questionContainer}>
                                    <GridItem xs={12} sm={12} md={3} className={classes.labelContainer}>
                                        <FormLabel className={classes.lbltxt} component="span"> Nick Name</FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5} >
                                        <TextValidator
                                            id="nickname"
                                            name="nickname"
                                            value={this.state.nickname}
                                            placeholder={this.state.nickname ? this.state.nickname : this.state.nicknameplaceholder}
                                            label="Nick Name"
                                            className={classes.inputItem}
                                            onChange={this.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                        />
                                        </GridItem>
                                    <GridItem xs={12} sm={12} md={3} >
                                        <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                            <span>
                                                <Tooltip
                                                    PopperProps={{
                                                        disablePortal: true,
                                                        className: classes.opacity
                                                    }}
                                                    onClose={this.handleTooltipClose}
                                                    open={this.state.openPopOver}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                    placement="right"
                                                    title="Nick Name Info"
                                                    classes={{ tooltip: classes.lightTooltip }}
                                                >
                                                    <FontAwesomeIcon icon={faInfoCircle} aria-describedby={id} onClick={this.handleTooltipOpen} style={{ cursor: "pointer" }} />
                                                </Tooltip>
                                            </span>
                                        </ClickAwayListener>
                                        <br /><br />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer className={classes.questionContainer}>
                                    <GridItem xs={12} sm={12} md={3} className={classes.labelContainer}>
                                        <FormLabel className={classes.lbltxt} component="span">Picture</FormLabel>
                                    </GridItem>
                                    <GridItem xs ={12} sm={12} md={5}>
                                       <div style={{display:"inline-flex",marginRight:"10px"}}>
                                        {this.state.selectPic?<Avatar
                                            // width={200}
                                            // height={200}
                                            imageWidth = {200}
                                            imageHeight = {200}
                                            onCrop={this.onCrop}
                                            onClose={this.onClose}
                                            src={this.state.preview?this.state.preview:""}
                                            cropRadius='80'
                                            minCropRadius='20'
                                            lineWidth='5'
                                            label="Choose a profile picture"
                                            mimeTypes='image/jpg'
                                            
                                        />:(<div><Tooltip title="edit" aria-label="Edit"><FontAwesomeIcon icon={faPen} aria-describedby={id} onClick={this.handleEditPic} style={{ cursor: "pointer", marginRight:10 }} /></Tooltip><Tooltip title={t('user.U__USER__DELETE')} aria-label="Delete"><FontAwesomeIcon icon={faTrashAlt} aria-describedby={id} onClick={this.handleDeletePic} style={{ cursor: "pointer" }} /></Tooltip></div>)}
                                        {this.state.back&&<Tooltip title="back" aria-label="Back"><FontAwesomeIcon icon={faReply} aria-describedby={id} onClick={this.handleBack} style={{ cursor: "pointer", marginLeft:15 }} /></Tooltip>}
                                        </div>
                                        {/* <img src={this.state.preview?this.state.preview:this.state.defaultImage} /> */}
                                        <p style={{ color: "red" }} >{this.state.userError}</p>
                                </GridItem>
                                </GridContainer>
                                <GridContainer className={classes.questionContainer}>
                                <GridItem xs={12} sm={12} md={3} className={classes.labelContainer}>
                                        <FormLabel className={classes.lbltxt} component="span">Current Password </FormLabel>
                                    </GridItem>
                                    <GridItem xs ={12} sm={12} md={3}>
                                    <Button variant="contained" className={classes.primaryBtn} onClick={this.handleChangePassword}>Change Password</Button>
                                        {this.state.resetpassword && changepassword()}<br /><br />
                                    </GridItem>
                                    
                                </GridContainer>
                                </CardContent>
                                <CardActions className={classes.pad_15}>
                                    <Button onClick={this.altSubmit} className={classes.primaryBtn}  >Submit</Button>
                                  </CardActions> 
                            </ValidatorForm>
                       
                    </Card>
                    {(this.state.passwordUpdate ? <SuccessDialog successButton={successButton} HeaderText={HeaderText} BodyText={PasswordUpdated} dismiss={this.dismissDialog} /> : "")}
                    {(this.state.profilePic ? <SuccessDialog successButton={successButton} HeaderText={HeaderText} BodyText={ProfilePic} dismiss={this.dismissDialog} /> : "")}
                    {(this.state.profileUpdate ? <SuccessDialog successButton={successButton} HeaderText={HeaderText} BodyText={ProfileUpdated} dismiss={this.dismissDialog} /> : "")}
                    {(this.state.isError ? <ErrorDialog successButton={okbutton} HeaderText={HeaderText} dismiss={this.handleClose} /> : " ")}
                </main>
            </React.Fragment>
        )
    }
}
export default withTranslation()((withStyles(styles,{ withTheme: true }))(AuthenticatedPage(["Provider", "AccountAdmin", "DefaultAccountAdmin", "CoWorker"])(ProviderOnBoard)));