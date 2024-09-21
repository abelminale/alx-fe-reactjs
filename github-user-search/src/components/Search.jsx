// src/components/Search.jsx
import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

export const Search = () => {
  const [formData, setFormData] = useState({ username: '', location: '', repos: 0 });
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; // target.value to capture input value
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // preventDefault to stop form from reloading the page
    setLoading(true);
    setError('');
    try {
      const users = await searchUsers(formData);
      setUserList(users.items);
    } catch (err) {
      setError("No users found.");
      setUserList([]);
    }
    setLoading(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}> {/* onSubmit to handle form submission */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange} // Handle changes with target.value
        />
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
        <button type="submit">Advanced Search</button> {/* Submit button */}
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
