import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class SelectLanguage extends Component 
{
    render()
    {
        return (
            <div>
        <InputLabel htmlFor="language-selector">Languages</InputLabel>
            <Select
                value={this.props.language}
                onChange={this.props.handleLanguageChange}
                inputProps={{
                    name: 'language',
                    id: 'language-selector',
                }}
            >
                <MenuItem value='en'>English</MenuItem>
                <MenuItem value='pt'>Portuguese</MenuItem>
            </Select>
            </div>)
    }
}
export default SelectLanguage;