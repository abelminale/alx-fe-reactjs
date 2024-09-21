import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

export const Search = () => {
  const [formData, setFormData] = useState({ username: '', location: '', repos: 0 });
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
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
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
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
      <button onClick={handleSearch}>Advanced Search</button>

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
