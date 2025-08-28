import React from 'react';
import HeroCard from './HeroCard';

const HeroList = ({ heroes, loading, error, searchType }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Searching for heroes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!heroes || heroes.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No heroes found</h3>
        <p>Try searching with a different name or ID</p>
      </div>
    );
  }

  // For ID search, show detailed view of single hero
  if (searchType === 'id' && heroes.length === 1) {
    return (
      <div className="hero-detail-view">
        <HeroCard hero={heroes[0]} isDetailed={true} />
      </div>
    );
  }

  // For name search, show list of heroes
  return (
    <div className="hero-list">
      <div className="results-header">
        <h2>Search Results ({heroes.length} found)</h2>
      </div>
      <div className="heroes-grid">
        {heroes.map((hero) => (
          <HeroCard 
            key={hero.id} 
            hero={hero} 
            isDetailed={false}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroList;
