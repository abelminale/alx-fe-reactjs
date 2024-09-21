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
    const { name, value } = e.target; // Use target.value to capture input value
    setFormData({ ...formData, [name]: value });
  };

  // Handle basic search for specific username
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData(null); // Clear previous user data
    setUserList([]); // Clear previous search results

    try {
      const user = await fetchUserData(formData.username);
      setUserData(user);
    } catch (err) {
      setError("Looks like we can't find the user.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  // Handle form submission for advanced search
  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserList([]); // Clear previous search results
    setUserData(null); // Clear previous user data

    try {
      const users = await searchUsers(formData);
      if (users.items.length === 0) {
        setError("Looks like we cant find the user");
      } else {
        setUserList(users.items);
      }
    } catch (err) {
      setError("Looks like we can't find any users.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleBasicSearch}>
        <input
          type="text"
          name="username"
          placeholder="Search GitHub username"
          value={formData.username}
          onChange={handleInputChange} // target.value is used here
        />
        <button type="submit">Search User</button>
      </form>

      <form onSubmit={handleAdvancedSearch}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange} // target.value is used here
        />
        <input
          type="number"
          name="repos"
          placeholder="Min Repositories"
          value={formData.repos}
          onChange={handleInputChange} // target.value is used here
        />
        <button type="submit">Advanced Search</button>
      </form>

      {loading && <p>Loading...</p>} {/* Show loading message */}
      {error && <p className="text-red-500">{error}</p>} {/* Show error message */}

      {userData && ( // Conditional rendering for user data
        <div className="user-details">
          <img src={userData.avatar_url} alt={userData.login} />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}

      {userList.length > 0 && ( // Conditional rendering for advanced search results
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
