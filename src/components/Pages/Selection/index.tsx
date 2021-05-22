import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonMT from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import { formApi } from 'services';
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
        justifyContent: 'center',
    },
    textField: {
        padding: '0px',
    },
    button: {
        minHeight: '5rem',
    },
}));

const SelectionPage: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const [numQuest, setNumQuest] = useState<number>();
    const [choosed, setChoosed] = useState<boolean>(false);
    const report = localStorage.getItem('report');
    const onSubmit = async () => {
        try {
            if (numQuest)
                await formApi.get(numQuest).then(response => {
                    const res = response.data;
                    res.results.forEach((item, index) => {
                        res.results[index].question = item.question.replace(
                            /&quot|&#039;s|&ldquo;|&rdquo;|&#039;|;/g,
                            ''
                        );
                    });
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
                            ) => setNumQuest(parseInt(event.target.value, 10))}
                            variant="outlined"
                            md={12}
                        />
                        <Grid
                            item
                            disabled={!numQuest || numQuest <= 0}
                            onClick={() => setChoosed(true)}
                            component={Button}
                            text="Confirmar"
                            md={12}
                        />
                        <Grid
                            disabled={!report}
                            item
                            component={Button}
                            md={12}
                            onClick={() => {
                                history.push('/relatorio');
                            }}
                            text="Histórico de resultados"
                        />
                    </Grid>
                ) : (
                    <Grid container item component={Paper} spacing={3} md={12}>
                        <Grid
                            container
                            item
                            component={Typography}
                            className={classes.subtitle}
                        >
                            {`Gerar as ${numQuest} perguntas`}
                        </Grid>
                        <Grid
                            container
                            item
                            component={ButtonGroup}
                            disableElevation
                            variant="contained"
                            color="primary"
                        >
                            <Grid
                                className={classes.button}
                                component={ButtonMT}
                                xs={6}
                                onClick={() => setChoosed(false)}
                            >
                                Cancel
                            </Grid>
                            <Grid
                                className={classes.button}
                                component={ButtonMT}
                                xs={6}
                                onClick={() => onSubmit()}
                            >
                                Start
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default SelectionPage;
