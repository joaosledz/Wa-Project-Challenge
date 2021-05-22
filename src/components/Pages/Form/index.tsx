import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Radio, FormControlLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, useField, FieldAttributes } from 'formik';
import { submitFormType, submitType, reportType } from 'interfaces/form';

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
        padding: '2rem',
        minHeight: '50vh',
        margin: '0px',
    },
    title: {
        fontSize: '2.5rem',
        textAlign: 'center',
        fontFamily: 'Bangers',
        color: 'white',
    },
    questionContainer: {
        alignSelf: 'flex-start',
        fontSize: '1.4rem',
        fontWeight: 'bold',
    },
}));

const SelectionPage: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [currentQuest, setcurrentQuest] = useState<number>(0);
    const [currentForm, setcurrentForm] = useState<submitFormType>();
    const storageForm = localStorage.getItem('currentForm');
    const handleNextQuestion = () => {
        if (currentForm) {
            if (currentQuest < currentForm.length - 1)
                setcurrentQuest(currentQuest + 1);
        }
    };
    const handlePreviousQuestion = () => {
        if (currentQuest > 0) setcurrentQuest(currentQuest - 1);
    };
    // Calcula a pontuação
    const score = (data: submitType) => {
        let correctScore = 0;
        data.questions.forEach((question, index) => {
            if (question.correct_answer === data.answers[index])
                correctScore += 1;
        });
        return correctScore;
    };
    // Criar componente para o título da pergunta
    type MyRadioProps = { label: string } & FieldAttributes<{}>;

    const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
        const [field] = useField<{}>(props);
        return (
            <Grid md={12}>
                <FormControlLabel
                    {...field}
                    control={<Radio />}
                    label={label}
                />
            </Grid>
        );
    };

    useEffect(() => {
        if (storageForm) {
            const auxValues: submitFormType = JSON.parse(storageForm);
            auxValues.forEach((option, index) => {
                auxValues[index].allAnswers = [option.correct_answer]
                    .concat(option.incorrect_answers)
                    .sort(() => Math.random() - 0.5);
            });
            setcurrentForm(auxValues);
        }
    }, [storageForm]);

    function onSubmit(values: submitType) {
        const correctAnswers = score(values);
        const report: reportType = {
            wrongAnswers: values.questions.length - correctAnswers,
            correctAnswers,
            ...values,
        };
        localStorage.setItem('report', JSON.stringify(report));
        history.push('/relatorio');
    }

    return (
        <div className={classes.root}>
            {currentForm && (
                <Grid container direction="column" spacing={3} md={6}>
                    <Grid
                        className={classes.title}
                        item
                        component={Typography}
                        md={12}
                    >
                        Gerador de Perguntas
                    </Grid>
                    <Formik
                        initialValues={{
                            questions: currentForm,
                            answers: [],
                        }}
                        onSubmit={onSubmit}
                        render={({ values }) => (
                            <Paper>
                                <Grid
                                    component={Form}
                                    className={classes.paper}
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-end"
                                    spacing={3}
                                    md={12}
                                >
                                    <>
                                        {values.questions.map((item, index) => (
                                            <>
                                                {index === currentQuest && (
                                                    <>
                                                        <Grid
                                                            container
                                                            component={
                                                                Typography
                                                            }
                                                            className={
                                                                classes.questionContainer
                                                            }
                                                        >
                                                            {`${index + 1}-${
                                                                item.question
                                                            }`}
                                                        </Grid>
                                                        <Grid container>
                                                            {item.allAnswers.map(
                                                                option => (
                                                                    <MyRadio
                                                                        name={`answers[${index}]`}
                                                                        type="radio"
                                                                        value={
                                                                            option
                                                                        }
                                                                        label={
                                                                            option
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </Grid>
                                                    </>
                                                )}
                                            </>
                                        ))}
                                        {currentQuest !== 0 ? (
                                            <Grid
                                                item
                                                md={2}
                                                component={Button}
                                                onClick={() =>
                                                    handlePreviousQuestion()
                                                }
                                            >
                                                Anterior
                                            </Grid>
                                        ) : (
                                            <Grid md={2} />
                                        )}
                                        {currentForm.length - 1 >
                                        currentQuest ? (
                                            <Grid
                                                item
                                                disabled={
                                                    !values.answers[
                                                        currentQuest
                                                    ]
                                                }
                                                md={2}
                                                component={Button}
                                                onClick={() =>
                                                    handleNextQuestion()
                                                }
                                            >
                                                Próxima
                                            </Grid>
                                        ) : (
                                            <Grid
                                                item
                                                disabled={
                                                    !values.answers[
                                                        currentQuest
                                                    ]
                                                }
                                                md={2}
                                                component={Button}
                                                type="submit"
                                            >
                                                Enviar
                                            </Grid>
                                        )}
                                    </>
                                </Grid>
                            </Paper>
                        )}
                    />
                </Grid>
            )}
        </div>
    );
};

export default SelectionPage;
