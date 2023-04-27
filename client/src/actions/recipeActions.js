import { EXTRACT_RECIPE } from './types';
import axios from 'axios';
import * as openai from 'openai';


// Set your OpenAI API key
openai.api_key = "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";

// Extract the video ID from a YouTube URL
const getVideoId = (url) => {
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regex);
  return match && match[2].length === 11 ? match[2] : null;
};


// Fetch video details and transcript, then extract recipe
export const extractRecipe = (videoUrl) => async (dispatch) => {
  try {
    const videoId = getVideoId(videoUrl);
    const videoDetails = await fetchVideoDetails(videoId);
    const transcript = await fetchTranscript(videoId);
    
    // Prepare the conversation messages for OpenAI API
    const messages = [
      { role: "system", content: "You are a helpful assistant that extracts recipes from cooking videos." },
      { role: "user", content: `Extract the recipe from this video: ${videoUrl}` },
      { role: "assistant", content: `Here is the transcript of the video: ${transcript}` },
    ];

    const openaiResponse = await openai.ChatCompletion.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const recipe = openaiResponse.choices[0].message.text;

    dispatch({
      type: EXTRACT_RECIPE,
      payload: {
        videoDetails,
        recipe,
      },
    });
  } catch (error) {
    console.error('Error in extractRecipe:', error);
  }
};

// Fetch video details
const fetchVideoDetails = async (videoId) => {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyACntE41bkl-7_ZCxtkCy0mf8ztHgSghIY`);
  const videoDetails = response.data.items[0].snippet;
  return videoDetails;
};

// Fetch video transcript
const fetchTranscript = async (videoId) => {
  const response = await fetch(`http://localhost:5000/api/transcript/${videoId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch transcript");
  }
  const transcript = await response.json();
  return transcript;
};
