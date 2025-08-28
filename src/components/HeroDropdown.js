import React, { useState, useEffect } from 'react';
import { superheroAPI } from '../services/superheroAPI';

const HeroDropdown = ({ onHeroSelect, loading: externalLoading }) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHeroId, setSelectedHeroId] = useState('');

  useEffect(() => {
    const fetchHeroesList = async () => {
      try {
        setLoading(true);
        setError(null);
        const heroesList = await superheroAPI.getAllHeroesList();
        setHeroes(heroesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroesList();
  }, []);

  const handleHeroChange = async (e) => {
    const heroId = e.target.value;
    setSelectedHeroId(heroId);
    
    if (heroId) {
      onHeroSelect(heroId);
    }
  };

  if (loading) {
    return (
      <div className="hero-dropdown">
        <label htmlFor="hero-select">Choose a Hero/Villain:</label>
        <div className="dropdown-loading">
          <div className="dropdown-spinner"></div>
          <span>Loading heroes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-dropdown">
        <label htmlFor="hero-select">Choose a Hero/Villain:</label>
        <div className="dropdown-error">
          <span>Failed to load heroes: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-dropdown">
      <label htmlFor="hero-select">Choose a Hero/Villain:</label>
      <select
        id="hero-select"
        value={selectedHeroId}
        onChange={handleHeroChange}
        disabled={externalLoading}
        className="hero-select"
      >
        <option value="">Select a hero...</option>
        {heroes.map((hero) => (
          <option key={hero.id} value={hero.id}>
            {hero.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeroDropdown;
