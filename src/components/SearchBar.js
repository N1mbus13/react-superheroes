import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const isNumeric = (str) => /^\d+$/.test(str);

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Auto-detect search type based on input
    if (isNumeric(value)) {
      setSearchType('id');
    } else {
      setSearchType('name');
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search by hero name or ID..."
            className="search-input"
            disabled={loading}
          />
          <div className="search-type-indicator">
            <span className={`type-badge ${searchType === 'name' ? 'active' : ''}`}>
              Name
            </span>
            <span className={`type-badge ${searchType === 'id' ? 'active' : ''}`}>
              ID
            </span>
          </div>
        </div>
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !query.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
