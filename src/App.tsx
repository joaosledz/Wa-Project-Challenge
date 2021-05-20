// import './assets/global.css';
// import './yupLocale';

import CssBaseline from '@material-ui/core/CssBaseline';
import Pages from 'components/Pages';
import React, { memo } from 'react';

const App: React.FC = memo(() => {
    return (
        <>
            <CssBaseline />
            <Pages />
        </>
    );
});

export default App;
