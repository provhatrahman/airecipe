import React from 'react';
import './App.css';
import InputForm from './components/InputForm';
import RecipeDisplay from './components/RecipeDisplay';

function App() {
  return (
    <div className="App">
      <InputForm />
      <RecipeDisplay />
    </div>
  );
}

export default App;
