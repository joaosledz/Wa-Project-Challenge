import React, { useState, useContext, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormContext from 'contexts/form';
// import Button from 'components/mainButton';

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
        minHeight: '60vh',
        // minWidth: '60vw',
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
    },
    textField: {
        padding: '0px',
    },
}));

const SelectionPage: React.FC = () => {
    const classes = useStyles();
    const { state } = useContext(FormContext);
    const [presentQuest, setPresentQuest] = useState<number>(0);
    const handleNextQuestion = () => {
        if (presentQuest < state.results.length - 1)
            setPresentQuest(presentQuest + 1);
    };
    const handlePreviousQuestion = () => {
        if (presentQuest > 0) setPresentQuest(presentQuest - 1);
    };
    useEffect(() => {
        console.log(presentQuest);
    }, [presentQuest]);
    return (
        <div className={classes.root}>
            {state.results && (
                <Grid container direction="column" spacing={3} md={7}>
                    <Grid
                        className={classes.title}
                        item
                        component={Typography}
                        md={12}
                    >
                        Gerador de Perguntas
                    </Grid>
                    <Grid
                        component={Paper}
                        className={classes.paper}
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-end"
                        spacing={3}
                        md={12}
                    >
                        {state.results.map((item, index) => (
                            <>
                                {index === presentQuest && (
                                    <Grid
                                        container
                                        component={Typography}
                                        className={classes.questionContainer}
                                    >
                                        {index + 1} - {item.question}
                                    </Grid>
                                )}
                            </>
                        ))}
                        <Grid
                            item
                            md={2}
                            component={Button}
                            // text="Anterior"
                            onClick={() => handlePreviousQuestion()}
                        >
                            Anterior
                        </Grid>
                        <Grid
                            item
                            md={2}
                            component={Button}
                            // text="Próxima"
                            onClick={() => handleNextQuestion()}
                        >
                            Próxima
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default SelectionPage;
