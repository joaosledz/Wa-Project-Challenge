import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        width: '100vw',
        height: '100vh',
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
    },
}));

const SelectionPage: React.FC = () => {
    const classes = useStyles();

    return <div className={classes.root}>Cancel or Start</div>;
};

export default SelectionPage;
