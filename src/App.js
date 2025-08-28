import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import HeroList from './components/HeroList';
import HeroDropdown from './components/HeroDropdown';
import HeroPreview from './components/HeroPreview';
import { superheroAPI } from './services/superheroAPI';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('name');
  
  // New state for dropdown functionality
  const [selectedHero, setSelectedHero] = useState(null);
  const [heroLoading, setHeroLoading] = useState(false);

  const handleSearch = async (query, type) => {
    setLoading(true);
    setError(null);
    setSearchType(type);

    try {
      let results;
      if (type === 'id') {
        const hero = await superheroAPI.searchById(query);
        results = hero ? [hero] : [];
      } else {
        results = await superheroAPI.searchByName(query);
      }
      setHeroes(results);
    } catch (err) {
      setError(err.message);
      setHeroes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroSelect = async (heroId) => {
    setHeroLoading(true);
    try {
      const hero = await superheroAPI.searchById(heroId);
      setSelectedHero(hero);
    } catch (err) {
      console.error('Error fetching hero:', err);
      setSelectedHero(null);
    } finally {
      setHeroLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🦸 Superhero Search</h1>
        <p>Search for your favorite superheroes and villains</p>
      </header>
      
      <main className="app-main">
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {/* <div className="dropdown-section">
          <HeroDropdown onHeroSelect={handleHeroSelect} loading={heroLoading} />
          <HeroPreview hero={selectedHero} loading={heroLoading} />
        </div> */}
        
        <HeroList 
          heroes={heroes} 
          loading={loading} 
          error={error}
          searchType={searchType}
        />
      </main>
    </div>
  );
}

export default App;
