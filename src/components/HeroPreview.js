import React from 'react';

const HeroPreview = ({ hero, loading }) => {
  // Dummy hero data for initial state
  const dummyHero = {
    id: "sample",
    name: "Sample Hero",
    image: {
      url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3NjRiYTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn6aIPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2FtcGxlIEhlcm88L3RleHQ+PC9zdmc+"
    },
    powerstats: {
      intelligence: "75",
      strength: "80",
      speed: "70",
      durability: "85",
      power: "90",
      combat: "75"
    },
    biography: {
      "full-name": "Sample Hero Name",
      publisher: "Sample Comics",
      alignment: "good"
    }
  };

  const displayHero = hero || dummyHero;
  const isPlaceholder = !hero;

  const renderPowerStats = () => {
    if (!displayHero.powerstats) return null;
    
    const stats = [
      { label: 'Intelligence', value: displayHero.powerstats.intelligence },
      { label: 'Strength', value: displayHero.powerstats.strength },
      { label: 'Speed', value: displayHero.powerstats.speed },
      { label: 'Durability', value: displayHero.powerstats.durability },
      { label: 'Power', value: displayHero.powerstats.power },
      { label: 'Combat', value: displayHero.powerstats.combat }
    ];

    return (
      <div className="power-stats">
        <h4>Power Stats</h4>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ width: `${stat.value === 'null' ? 0 : stat.value}%` }}
                ></div>
                <span className="stat-value">
                  {stat.value === 'null' ? 'N/A' : stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBiography = () => {
    if (!displayHero.biography) return null;

    return (
      <div className="biography">
        <h4>Biography</h4>
        <div className="bio-info">
          {displayHero.biography['full-name'] && (
            <p><strong>Full Name:</strong> {displayHero.biography['full-name']}</p>
          )}
          {displayHero.biography.publisher && (
            <p><strong>Publisher:</strong> {displayHero.biography.publisher}</p>
          )}
          {displayHero.biography.alignment && (
            <p><strong>Alignment:</strong> 
              <span className={`alignment ${displayHero.biography.alignment}`}>
                {displayHero.biography.alignment}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="hero-preview loading">
        <div className="hero-preview-spinner"></div>
        <p>Loading hero details...</p>
      </div>
    );
  }

  return (
    <div className={`hero-preview ${isPlaceholder ? 'placeholder' : ''}`}>
      <div className="hero-image-container">
        <img 
          src={displayHero.image?.url} 
          alt={displayHero.name}
          className="hero-image"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
        {isPlaceholder && (
          <div className="placeholder-overlay">
            <span>Select a hero to view details</span>
          </div>
        )}
      </div>
      
      <div className="hero-content">
        <div className="hero-header">
          <h3 className="hero-name">{displayHero.name}</h3>
          <span className="hero-id">ID: {displayHero.id}</span>
        </div>

        {renderBiography()}
        {renderPowerStats()}
      </div>
    </div>
  );
};

export default HeroPreview;
