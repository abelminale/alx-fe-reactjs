// src/components/Search.jsx
import React, { useState } from 'react';
import { searchGitHubUser } from '../services/githubAPI';

export const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const user = await searchGitHubUser(username);
      setUserData(user);
      setError('');
    } catch (err) {
      setError('User not found');
      setUserData(null);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search GitHub username"
        value={username}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
      {userData && (
        <div className="user-details">
          <h2>{userData.name}</h2>
          <p>Username: {userData.login}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};
