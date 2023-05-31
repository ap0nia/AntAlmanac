import { IconButton, Popover, Theme, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ClassNameMap, Styles } from '@material-ui/core/styles/withStyles';
import { ArrowBack, MenuOpen, MoreVert, Refresh } from '@material-ui/icons';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Icon,
    Paper,
    Switch,
} from '@mui/material';
import { PureComponent, useState } from 'react';

const styles: Styles<Theme, object> = {
    buttonRow: {
        width: '100%',
        zIndex: 3,
        marginBottom: 8,
        position: 'absolute',
        pointerEvents: 'none',
    },
    button: {
        backgroundColor: 'rgba(236, 236, 236, 1)',
        marginRight: 5,
        boxShadow: '2',
        color: 'black',
        '&:hover': {
            backgroundColor: 'grey',
        },
        pointerEvents: 'auto',
    },
};

interface CoursePaneButtonRowProps {
    classes: ClassNameMap;
    showSearch: boolean;
    onDismissSearchResults: () => void;
    onRefreshSearch: () => void;
}

class CoursePaneButtonRow extends PureComponent<CoursePaneButtonRowProps> {
    state = {
        isMenuOpen: false,
        isSwitchOn: false,
    };

    handleMenuToggle = () => {
        this.setState((prevState) => ({ isMenuOpen: !this.state.isMenuOpen }));
    };

    handleSwitchToggle = () => {
        this.setState((prevState) => ({ isSwitchOn: !this.state.isSwitchOn }));
    };

    render() {
        const { classes } = this.props;
        const { isMenuOpen } = this.state;
        const { isSwitchOn } = this.state;

        console.log(isSwitchOn);

        return (
            <div className={classes.buttonRow} style={{ display: this.props.showSearch ? 'block' : 'none' }}>
                <Tooltip title="Back">
                    <IconButton onClick={this.props.onDismissSearchResults} className={classes.button}>
                        <ArrowBack />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Refresh Search Results">
                    <IconButton onClick={this.props.onRefreshSearch} className={classes.button}>
                        <Refresh />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Hide Columns">
                    <>
                        <IconButton onClick={this.handleMenuToggle} className={classes.button}>
                            <MoreVert />
                        </IconButton>
                    </>
                </Tooltip>

                {isMenuOpen && (
                    <FormControl>
                        <FormLabel>Hide Columns</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.isSwitchOn}
                                        onChange={this.handleSwitchToggle}
                                        name="sectionCode"
                                    />
                                }
                                label="Section Code"
                            />
                        </FormGroup>
                    </FormControl>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(CoursePaneButtonRow);
