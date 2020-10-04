import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Organization from 'components/containers/Organization';

import './App.css';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <header className="App-header">
          <p>GH Users Explorer</p>
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
              <Switch>
                <Route path="/">
                  <Organization />
                </Route>
              </Switch>
            </BrowserRouter>
          </Suspense>
        </main>
      </div>
    </RecoilRoot>
  );
}

export default App;
