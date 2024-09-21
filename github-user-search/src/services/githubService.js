// src/services/githubService.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Fetch user data by username
export const fetchUserData = async (username) => {
  const url = `${BASE_URL}/users/${username}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

// Advanced search for users by multiple criteria
export const searchUsers = async ({ username, location, repos }) => {
  const query = `q=${username ? `${username}+` : ''}${location ? `location:${location}+` : ''}${
    repos ? `repos:>${repos}` : ''
  }`;
  const url = `${BASE_URL}/search/users?${query}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
