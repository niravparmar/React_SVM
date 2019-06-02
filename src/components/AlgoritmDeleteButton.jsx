import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        transformOrigin: 'center bottom' ,

    },
    paper: {
        marginRight: theme.spacing.unit * 2,
        backgroundColor: "#fff"
        
    },
});
class AlgorithmDelect extends React.Component {

    handleClick = event => {
        this.props.buttonfunction(this.props.Algoid)
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button
                    variant="outlined" color="inherit"
                    onClick={this.handleClick}
                    style={{ borderRadius: "50px"}}
            >
               <FontAwesomeIcon icon={faTimes} />
        </Button>
            </div>
        )
    }

}

export default withStyles(styles)(AlgorithmDelect);