import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        backgroundColor: "#c1c1c1",
        padding : "5px 5px 5px 5px",
        borderRadius : "5px"

    }
})
class WeightBasedUnitCalculation extends React.PureComponent 
{
    render()
    {  
        const { UOM, weightValue, calculatedUnits, weightInKg,weightUnit,classes} = this.props;
        return(
            <div className={classes.root}>
            {/* {/* <div>{weightUnit}</div> */}
            <Typography>Weight Based Calculation</Typography>
                {UOM.label === 'Kg'?
            <Typography>
                Starting Dose Formula
                <Typography>
                            ({weightValue} Kgs)*({weightUnit} unit/Kg) = {calculatedUnits} Units
                </Typography>
            </Typography>
            :
            <Typography>
                <Typography>
                    Lbs to Kg conversion
                    <Typography>
                        ({weightValue} Lbs)*(0.453952) = {weightInKg} Kgs
                    </Typography>
                </Typography>
                <Typography>
                            Starting Dose Formula
                <Typography>
                                ({weightInKg} Kgs)*({weightUnit} unit/Kg) = {calculatedUnits} Units
                </Typography>
                </Typography>
            </Typography>}
            </div>
        )
    }
}
export default withStyles(styles)(WeightBasedUnitCalculation);