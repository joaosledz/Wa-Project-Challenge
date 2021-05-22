import React, { memo, useCallback } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ReportPage from './report';
import SelectionPage from './Selection';
import FormPage from './Form';

const Pages: React.FC = memo(() => {
    const renderRedirect = useCallback(() => <Redirect to="/selecao" />, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/relatorio" exact component={ReportPage} />
                <Route path="/formulario" exact component={FormPage} />
                <Route path="/selecao" exact component={SelectionPage} />
                <Route render={renderRedirect} />
            </Switch>
        </BrowserRouter>
    );
});

export default Pages;
