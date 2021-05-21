// import './assets/global.css';
// import './yupLocale';

import React, { memo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { FormProvider } from 'contexts/form';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pages from 'components/Pages';
import theme from 'styles/theme';
import GlobalCss from 'styles/global';

const App: React.FC = memo(() => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <FormProvider>
                    <CssBaseline />
                    <Pages />
                    <GlobalCss />
                </FormProvider>
            </ThemeProvider>
        </div>
    );
});

export default App;
