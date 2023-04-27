import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { extractRecipe } from '../actions/recipeActions';

const InputForm = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const videoUrl = inputRef.current.value;
    if (videoUrl) {
      dispatch(extractRecipe(videoUrl));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder="Enter YouTube video URL" />
      <button type="submit">Generate Recipe</button>
    </form>
  );
};

export default InputForm;
