// import './assets/global.css';
// import './yupLocale';

import React, { memo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pages from 'components/Pages';
import theme from 'styles/theme';
import GlobalCss from 'styles/global';

const App: React.FC = memo(() => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Pages />
                <GlobalCss />
            </ThemeProvider>
        </div>
    );
});

export default App;
