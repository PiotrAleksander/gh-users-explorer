import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { theme, Pagehead, Box, Flex } from '@primer/components'

import { ErrorBoundary, Loader } from 'components/common';
import { Navbar, SearchInput } from 'components/containers';
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
              <Box m={2} p={4}>
                <Flex>
                  <Box>
                    <Navbar />
                  </Box>
                  <Box>
                    <SearchInput />
                  </Box></Flex>
              </Box>
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact path="/" component={Organization} />
                  <Route path="/user/:login" component={User} />
                  <Route path="/repository/:owner/:name" component={Repository} />
                  <Route path="/:organization" component={Organization} />
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
