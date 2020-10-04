import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { theme, Pagehead, SubNav } from '@primer/components'

import ErrorBoundary from 'components/common/ErrorBoundary';
import Organization from 'components/containers/Organization';
import User from 'components/containers/User';
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <header className="App-header">
            <Pagehead m={2} as="h1">GH Users Explorer</Pagehead>
          </header>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <BrowserRouter>
                <SubNav m={2} p={4} aria-label="Main">
                  <SubNav.Links>
                    <SubNav.Link to="/" as={NavLink}>
                      Home
                  </SubNav.Link>
                  </SubNav.Links>
                </SubNav>
                <Switch>
                  <Route exact path="/">
                    <Organization />
                  </Route>
                  <Route path="/user/:login">
                    <User />
                  </Route>
                </Switch>
              </BrowserRouter>
            </Suspense>
          </main>
        </ThemeProvider>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
