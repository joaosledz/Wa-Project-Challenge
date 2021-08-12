import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { reportType } from 'interfaces/form';
import Button from 'components/mainButton';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

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
        minHeight: '60vh',
        maxHeight: '90vh',
        padding: '2rem',
        margin: '0px',
        overflowY: 'auto',
    },
    title: {
        fontSize: '3rem',
        color: 'black',
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
    correctAnswer: {
        backgroundColor: 'rgba(0, 255, 0, 0.22)',
    },
    wrongAnswer: {
        backgroundColor: 'rgba(190, 0, 0, 0.295)',
    },
    answer: {
        backgroundColor: 'white',
    },
    question: {
        paddingTop: '2rem',
    },
}));

const Report: React.FC = () => {
    const classes = useStyles();
    const [report, setReport] = useState<reportType>();
    const history = useHistory();
    const storageReport = localStorage.getItem('report');

    const verifyAnswerClass = (
        answered: string,
        correct: string,
        current: string
    ) => {
        if (current === correct) return classes.correctAnswer;
        if (current === answered) return classes.wrongAnswer;
        return classes.answer;
    };

    useEffect(() => {
        if (storageReport) {
            const auxValues: reportType = JSON.parse(storageReport);
            setReport(auxValues);
        }
    }, [storageReport]);
    return (
        <div className={classes.root}>
            <Grid
                container
                component={Paper}
                className={classes.paper}
                justify="center"
                md={6}
                xs={12}
            >
                {report && (
                    <>
                        <Grid
                            className={classes.title}
                            item
                            xs={12}
                            component={Typography}
                        >
                            RELATÓRIO
                        </Grid>
                        <Grid container item xs={12} component={Typography}>
                            RESPOSTAS CORRETAS: {report.correctAnswers}
                        </Grid>
                        <Grid container item xs={12} component={Typography}>
                            RESPOSTAS INCORRETAS: {report.wrongAnswers}
                        </Grid>
                        {report.questions.map((item, index) => (
                            <Grid container className={classes.question}>
                                <FormLabel component="legend">
                                    {`${index + 1} - ${item.question}`}
                                </FormLabel>
                                <Grid
                                    style={{ paddingTop: '0.5rem' }}
                                    container
                                    xs={12}
                                    component={RadioGroup}
                                    aria-label="gender"
                                    name="gender1"
                                    value={report.answers[index]}
                                >
                                    {item.allAnswers.map(option => (
                                        <Grid
                                            item
                                            className={verifyAnswerClass(
                                                report.answers[index],
                                                item.correct_answer,
                                                option
                                            )}
                                            component={FormControlLabel}
                                            value={option}
                                            control={<Radio />}
                                            label={option}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                        <Grid
                            item
                            component={Button}
                            text="Gerar novo formulário"
                            onClick={() => history.push('/selecao')}
                        />
                    </>
                )}
            </Grid>
            <Backdrop className={classes.backdrop} open={!report}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Report;
