// src/services/githubService.js
import axios from 'axios';

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const searchUsers = async ({ username, location, repos }) => {
  const queryParts = [];
  if (username) queryParts.push(username);
  if (location) queryParts.push(`location:${location}`);
  if (repos) queryParts.push(`repos:>${repos}`);
  
  const query = queryParts.join(' ');
  const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
  return response.data;
};
