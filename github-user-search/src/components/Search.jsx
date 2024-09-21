// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

export const Search = () => {
  const [formData, setFormData] = useState({ username: '', location: '', repos: 0 });
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle basic search for specific username
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await fetchUserData(formData.username);
      setUserData(user);
      setUserList([]); // Clear advanced search results if doing basic search
    } catch (err) {
      setError("Looks like we can't find the user."); // Set error message
      setUserData(null);
    }
    setLoading(false);
  };

  // Handle form submission for advanced search
  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const users = await searchUsers(formData);
      if (users.items.length === 0) {
        setError("Looks like we can't find any users."); // Set error message for no results
        setUserList([]);
      } else {
        setUserList(users.items);
      }
    } catch (err) {
      setError("Looks like we can't find any users."); // Set error message for API error
      setUserList([]);
    }
    setLoading(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleBasicSearch}>
        <input
          type="text"
          name="username"
          placeholder="Search GitHub username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <button type="submit">Search User</button>
      </form>

      <form onSubmit={handleAdvancedSearch}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="repos"
          placeholder="Min Repositories"
          value={formData.repos}
          onChange={handleInputChange}
        />
        <button type="submit">Advanced Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      {userData && (
        <div className="user-details">
          <img src={userData.avatar_url} alt={userData.login} />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}

      {userList.length > 0 && (
        <div className="user-list">
          {userList.map((user) => (
            <div key={user.id}>
              <img src={user.avatar_url} alt={user.login} />
              <h3>{user.login}</h3>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
