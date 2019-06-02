// import React from 'react';
// import MUIDataTable from "mui-datatables";
// import { withTranslation } from 'react-i18next';
// import withWidth from '@material-ui/core/withWidth';
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
// import { Typography } from '@material-ui/core';


// class MuiThemeDataTable extends React.PureComponent {
//      options = {
//         filterType: 'checkbox',
//         selectableRows : false,
//         rowHover : false,
//         rowsPerPageOptions : [5,10,25],
//         responsive : "scroll",
//         print : false,
//         textLabels : {
//             body : {
//                 noMatch : "Sorry, no records to show"
//             }
//         }
//     };
//     render() {
//         let columns = this.props.columns;
//         if(this.props.width === "sm"){
//             columns = [];
//             this.props.smallScreenTableColumnDisplayIndex.forEach(element => {
//                 columns.push(this.props.columns[element])
//             });
//             this.options.expandableRows = true;
//             this.options.renderExpandableRow = (rowData, rowMeta) => {
//                 const colSpan = rowData.length + 1;
//                 return (
//                   <TableRow>              
//                         {console.log(rowData,"rowadata")  }            
//                         {rowData.forEach((i,iteam) =>{
//                             if(!rowData.includes(i)){
//                                 return (<TableCell colSpan={colSpan}><Typography>{rowData[i]}</Typography></TableCell>)
//                             }
//                         })}
//                   </TableRow>
//                 )
//             }
//         }
//         else if(this.props.width === "xs"){
//             columns = [];
//             this.props.extraSmallScreenTableColumnDisplayIndex.forEach(element => {
//                 columns.push(this.props.columns[element])
//             });
//         }
//         return (
//             <MUIDataTable
//                 title={this.props.title}
//                 data={this.props.rows}
//                 columns={this.props.columns}
//                 options= {options}
//             />

//         )
//     }
// }
// export default withWidth()(MuiThemeDataTable);

import React from 'react';
import MUIDataTable from "mui-datatables";
import { withTranslation } from 'react-i18next';
import withWidth from '@material-ui/core/withWidth';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Typography } from '@material-ui/core';
class MuiThemeDataTable extends React.PureComponent {

            options = {
            filterType: 'checkbox',
            selectableRows: false,
            rowHover: false,
            rowsPerPageOptions: [5, 10, 25],
            responsive: "scroll",
            print: false,
            customSort : this.props.customSort,
            textLabels: {
                body: {
                    noMatch : "Sorry, no records to show"
                }
            }
    }
        render() {
            let columns = this.props.columns;
            if(this.props.width === "sm"){
                columns = [];
                this.props.smallScreenTableColumnDisplayIndex.forEach(element => {
                    columns.push(this.props.columns[element])
                });
                this.options.expandableRows = true;
                this.options.renderExpandableRow = (rowData, rowMeta) => {
                    const colSpan = rowData.length + 1;
                    return (
                      <TableRow>              
                            {console.log(rowData,"rowadata")  }            
                            {rowData.forEach((i,iteam) =>{
                                if(!rowData.includes(i)){
                                    return (<TableCell colSpan={colSpan}><Typography>{rowData[i]}</Typography></TableCell>)
                                }
                            })}
                      </TableRow>
                    )
                }
            }
            else if(this.props.width === "xs"){
                columns = [];
                this.props.extraSmallScreenTableColumnDisplayIndex.forEach(element => {
                    columns.push(this.props.columns[element])
                });
            }
        return (
            <MUIDataTable
                title={this.props.title}
                data={this.props.rows}
                columns={columns}
                options= {this.options}
            />)
    }
}
export default withWidth()(MuiThemeDataTable);






