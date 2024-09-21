// src/services/githubAPI.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

export const searchGitHubUser = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`, {
      headers: {
        // Optionally include API key
        Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
};
