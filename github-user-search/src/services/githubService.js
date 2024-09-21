// src/services/githubService.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users';

export const searchUsers = async ({ username, location, repos }) => {
  const query = `q=${username ? `${username}+` : ''}${location ? `location:${location}+` : ''}${repos ? `repos:>${repos}` : ''}`;
  const url = `${BASE_URL}?${query}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
