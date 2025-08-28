import React from 'react';

const HeroCard = ({ hero, isDetailed = false }) => {
  const {
    name,
    image,
    powerstats,
    biography,
    id
  } = hero;

  const renderPowerStats = () => {
    if (!powerstats) return null;
    
    const stats = [
      { label: 'Intelligence', value: powerstats.intelligence },
      { label: 'Strength', value: powerstats.strength },
      { label: 'Speed', value: powerstats.speed },
      { label: 'Durability', value: powerstats.durability },
      { label: 'Power', value: powerstats.power },
      { label: 'Combat', value: powerstats.combat }
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
    if (!biography) return null;

    return (
      <div className="biography">
        <h4>Biography</h4>
        <div className="bio-info">
          {biography['full-name'] && (
            <p><strong>Full Name:</strong> {biography['full-name']}</p>
          )}
          {biography.publisher && (
            <p><strong>Publisher:</strong> {biography.publisher}</p>
          )}
          {biography.alignment && (
            <p><strong>Alignment:</strong> 
              <span className={`alignment ${biography.alignment}`}>
                {biography.alignment}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`hero-card ${isDetailed ? 'detailed' : 'compact'}`}>
      <div className="hero-image-container">
        <img 
          src={image?.url || '/placeholder-hero.png'} 
          alt={name}
          className="hero-image"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
      </div>
      
      <div className="hero-content">
        <div className="hero-header">
          <h3 className="hero-name">{name}</h3>
          <span className="hero-id">ID: {id}</span>
        </div>

        {isDetailed && (
          <>
            {renderBiography()}
            {renderPowerStats()}
          </>
        )}
      </div>
    </div>
  );
};

export default HeroCard;
