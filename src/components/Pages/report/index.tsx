import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button';
import {
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { reportType } from 'interfaces/form';

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
    const storageReport = localStorage.getItem('report');

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
                        <Grid item xs={12} component={Typography}>
                            RESPOSTAS CORRETAS: {report.correctAnswers}
                        </Grid>
                        <Grid item xs={12} component={Typography}>
                            RESPOSTAS INCORRETAS: {report.wrongAnswers}
                        </Grid>
                        {report.questions.map((item, index) => (
                            <Grid container className={classes.question}>
                                <FormLabel component="legend">
                                    {`${index + 1} - ${item.question}`}
                                </FormLabel>
                                <Grid
                                    container
                                    component={RadioGroup}
                                    aria-label="gender"
                                    name="gender1"
                                    value={report.answers[index]}
                                >
                                    {item.allAnswers.map((option, index2) => (
                                        <Grid
                                            item
                                            xs={12}
                                            className={
                                                option === item.correct_answer
                                                    ? classes.correctAnswer
                                                    : report.answers[index2] !==
                                                          item.correct_answer &&
                                                      report.answers[index2] ===
                                                          option
                                                    ? classes.wrongAnswer
                                                    : classes.answer
                                            }
                                            component={FormControlLabel}
                                            value={option}
                                            control={<Radio />}
                                            label={option}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
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
