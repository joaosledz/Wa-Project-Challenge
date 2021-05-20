import React, { useState, useCallback } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { formApi, formType } from 'services';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple',
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        position: 'relative',
        display: 'flex',
        padding: '4rem',
    },
    title: {
        fontSize: '2rem',
        textAlign: 'center',
        fontFamily: 'Bangers',
    },
    textField: {
        padding: '0px',
    },
    mainButton: {
        color: 'green',
    },
    historyButton: {
        padding: '0px',
    },
}));

const SelectionPage: React.FC = () => {
    const classes = useStyles();
    const [numQuest, setNumQuest] = useState<string>();

    const onSubmit = useCallback(
        async (data: formType) => {
            console.log('Entrou');
            try {
                await formApi.get(parseInt(numQuest!, 10));
            } catch (err) {
                console.log(err);
            }
        },
        [numQuest]
    );
    return (
        <div className={classes.root}>
            <Grid container component={Paper} md={3} spacing={3}>
                <Grid
                    className={classes.title}
                    item
                    component={Typography}
                    md={12}
                >
                    Quantidade de perguntas
                </Grid>
                <Grid
                    className={classes.textField}
                    item
                    component={TextField}
                    value={numQuest}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setNumQuest(event.target.value)
                    }
                    variant="outlined"
                    md={12}
                />
                <Grid
                    className={classes.mainButton}
                    item
                    onClick={() => onSubmit}
                    component={Button}
                    md={12}
                >
                    Iniciar
                </Grid>
                <Grid
                    disabled
                    className={classes.historyButton}
                    item
                    component={Button}
                    md={12}
                >
                    Histórico de resultados
                </Grid>
            </Grid>
        </div>
    );
};

export default SelectionPage;
