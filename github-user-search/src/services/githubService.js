// src/services/githubService.js
import axios from 'axios';

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const searchUsers = async ({ username, location, repos }) => {
  const query = `${username} ${location ? `location:${location}` : ''} ${repos ? `repos:>${repos}` : ''}`.trim();
  const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
  return response.data;
};
