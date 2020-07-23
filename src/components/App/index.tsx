import React from 'react';
import './App.css';
import Header from '../Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header
        onSearch={(searchPhrase) => {
          console.log(searchPhrase);
        }}
      />
      <header className="App-header" />
    </div>
  );
};

export default App;
