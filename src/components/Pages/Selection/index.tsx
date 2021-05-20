import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { formApi } from 'services';

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
        margin: '0px',
    },
    title: {
        fontSize: '2.5rem',
        textAlign: 'center',
        fontFamily: 'Bangers',
        color: 'white',
    },
    textField: {
        padding: '0px',
    },
    mainButton: {
        backgroundColor: 'green',
        color: 'white',
    },
    historyButton: {
        padding: '0px',
    },
}));

const SelectionPage: React.FC = () => {
    const classes = useStyles();
    const [numQuest, setNumQuest] = useState<string>();

    const onSubmit = async () => {
        try {
            if (numQuest) await formApi.get(parseInt(numQuest, 10));
        } catch (err) {
            // console.log(err);
        }
    };
    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={3} md={3}>
                <Grid
                    className={classes.title}
                    item
                    component={Typography}
                    md={12}
                >
                    Gerador de Perguntas
                </Grid>
                <Grid container item component={Paper} spacing={3} md={12}>
                    <Grid
                        className={classes.textField}
                        item
                        component={TextField}
                        value={numQuest}
                        placeholder="Quantidade de perguntas"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setNumQuest(event.target.value)}
                        variant="outlined"
                        md={12}
                    />
                    <Grid
                        className={classes.mainButton}
                        item
                        onClick={() => onSubmit()}
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
            </Grid>
        </div>
    );
};

export default SelectionPage;
