import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        baseButton: {
            width: '100%',
            height: 50,
            padding: '10px',
            marginTop: '8px',
            borderRadius: '7px',

            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
        },

        button: {
            color: 'white',
            background:
                'linear-gradient(90deg, rgba(210,91,197,1) 0%, rgba(197,71,150,1) 48%)',

            transition: 'all .2s',

            '&:hover': {
                // maxWidth: 300,
                background: `linear-gradient(to bottom,${theme.palette.primary.main} ,${theme.palette.primary.main})`,
            },
        },

        buttonDisabled: {
            backgroundColor: '#9a9a9a',
            '& p': {
                color: '#ffffffba',
            },
        },

        buttonText: {
            fontSize: 16,
            letterSpacing: 2.5,
        },
    })
);

export default useStyles;
