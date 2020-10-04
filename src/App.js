import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { theme, Pagehead } from '@primer/components'

import ErrorBoundary from 'components/common/ErrorBoundary';
import Navbar from 'components/containers/Navbar';
import './App.css';

const Organization = React.lazy(() => import('components/containers/Organization'));
const User = React.lazy(() => import('components/containers/User'));
const Repository = React.lazy(() => import('components/containers/Repository'));

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <NavLink to="/">
              <header className="App-header">
                <Pagehead m={2} as="h1">GH Users Explorer</Pagehead>
              </header>
            </NavLink>
            <main>
              <Navbar />
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" component={Organization} />
                  <Route path="/user/:login" component={User} />
                  <Route path="/repository/:owner/:name" component={Repository} />
                </Switch>
              </Suspense>
            </main>
          </BrowserRouter>
        </ThemeProvider>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
