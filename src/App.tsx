// import './assets/global.css';
// import './yupLocale';

import React, { memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pages from 'components/Pages';

const App: React.FC = memo(() => {
    return (
        <>
            <CssBaseline />
            <Pages />
        </>
    );
});

export default App;
