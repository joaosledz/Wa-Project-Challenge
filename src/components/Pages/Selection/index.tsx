import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { formApi } from 'services';
import FormContext from 'contexts/form';
import Button from 'components/mainButton';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple',
    },
    paper: {
        position: 'relative',
        display: 'flex',
        padding: '6rem',
        margin: '0px',
    },
    title: {
        fontSize: '2.5rem',
        textAlign: 'center',
        fontFamily: 'Bangers',
        color: 'white',
    },
    subtitle: {
        fontSize: '1.5rem',
        textAlign: 'center',
        fontFamily: 'Bangers',
        color: 'black',
    },
    textField: {
        padding: '0px',
    },
}));

const SelectionPage: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const { setState } = useContext(FormContext);
    const [numQuest, setNumQuest] = useState<string>();
    const [choosed, setChoosed] = useState<boolean>(false);
    const onSubmit = async () => {
        try {
            if (numQuest)
                await formApi.get(parseInt(numQuest, 10)).then(response => {
                    setState(response.data);
                    localStorage.setItem(
                        'currentForm',
                        JSON.stringify(response.data.results)
                    );
                });
            history.push('/formulario');
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
                {!choosed ? (
                    <Grid container item component={Paper} md={12}>
                        <Grid
                            className={classes.textField}
                            item
                            component={TextField}
                            value={numQuest}
                            type="number"
                            inputProps={{
                                min: 1,
                                max: 100,
                                style: {
                                    textAlign: 'center',
                                    fontWeight: 'bolder',
                                    fontSize: '1.5rem',
                                },
                            }}
                            placeholder="Quantidade de perguntas"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setNumQuest(event.target.value)}
                            variant="outlined"
                            md={12}
                        />
                        <Grid
                            item
                            onClick={() => setChoosed(true)}
                            component={Button}
                            text="Confirmar"
                            md={12}
                        />
                        <Grid
                            disabled
                            item
                            component={Button}
                            md={12}
                            text="Histórico de resultados"
                        />
                    </Grid>
                ) : (
                    <Grid container item component={Paper} spacing={3} md={12}>
                        <Grid
                            container
                            component={Typography}
                            className={classes.subtitle}
                        >
                            {`Gerar as ${numQuest} perguntas`}
                        </Grid>
                        <Grid
                            item
                            component={Button}
                            onClick={() => setChoosed(false)}
                            text="CANCEL"
                            xs={6}
                        />

                        <Grid
                            item
                            component={Button}
                            onClick={() => onSubmit()}
                            text="START"
                            xs={6}
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default SelectionPage;
