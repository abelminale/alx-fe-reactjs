// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

export const Search = () => {
  const [formData, setFormData] = useState({ username: '', location: '', repos: 0 });
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData(null);
    setUserList([]);

    try {
      const user = await fetchUserData(formData.username);
      setUserData(user);
    } catch (err) {
      setError("Looks like we can't find the user.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserList([]);
    setUserData(null);

    try {
      const users = await searchUsers(formData);
      if (users.items.length === 0) {
        setError("Looks like we can't find any users.");
      } else {
        setUserList(users.items);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container p-4 max-w-md mx-auto">
      <form className="mb-4" onSubmit={handleBasicSearch}>
        <input
          type="text"
          name="username"
          placeholder="Search GitHub username"
          value={formData.username}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Search User
        </button>
      </form>

      <form onSubmit={handleAdvancedSearch} className="mb-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="number"
          name="repos"
          placeholder="Min Repositories"
          value={formData.repos}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Advanced Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="user-details my-4 p-4 border border-gray-300 rounded">
          <img src={userData.avatar_url} alt={userData.login} className="w-16 h-16" />
          <h2 className="text-lg">{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            View GitHub Profile
          </a>
        </div>
      )}

      {userList.length > 0 && (
        <div className="user-list my-4">
          {userList.map((user) => (
            <div key={user.id} className="user-item p-4 border border-gray-300 rounded mb-2">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 inline-block" />
              <h3 className="inline-block ml-2">{user.login}</h3>
              <p>Location: {user.location || 'N/A'}</p>
              <p>Repositories: {user.public_repos}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
