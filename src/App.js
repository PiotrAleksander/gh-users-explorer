import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { theme, Pagehead } from '@primer/components'

import ErrorBoundary from 'components/common/ErrorBoundary';
import Organization from 'components/containers/Organization';
import User from 'components/containers/User';
import './App.css';
import Repository from 'components/containers/Repository';
import Navbar from 'components/containers/Navbar';

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
              <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <Switch>
                  <Route exact path="/">
                    <Organization />
                  </Route>
                  <Route path="/user/:login">
                    <User />
                  </Route>
                  <Route path="/repository/:owner/:name">
                    <Repository />
                  </Route>
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
