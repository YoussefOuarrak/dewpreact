import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Component/HeaderComponent';
import Main from './Component/MainComponent';



function App() {
  return (
    <Router>
      <div className="App">
        <Main />
        <Header />
      </div>
    </Router>
  );
}

export default App;
