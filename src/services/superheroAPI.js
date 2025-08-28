const apiKey = process.env.REACT_APP_SUPERHERO_API_KEY;
console.log('apiKey',apiKey);

export const superheroAPI = {
  // Search by name - returns array of results
  searchByName: async (name) => {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://superheroapi.com/api/${apiKey}/search/${name}`)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents);
      
      return data.response === 'success' ? data.results : [];
    } catch (error) {
      console.error('Error searching by name:', error);
      throw new Error('Failed to search heroes by name');
    }
  },

  // Search by ID - returns single hero object
  searchById: async (id) => {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://superheroapi.com/api/${apiKey}/${id}`)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents);
      
      return data.response === 'success' ? data : null;
    } catch (error) {
      console.error('Error searching by ID:', error);
      throw new Error('Failed to find hero by ID');
    }
  },

  // Get all heroes list (IDs 1-731 based on SuperHero API)
  getAllHeroesList: async () => {
    try {
      const heroes = [];
      const batchSize = 10;
      const totalHeroes = 100; // Limiting to first 100 for performance
      
      for (let i = 1; i <= totalHeroes; i += batchSize) {
        const batch = [];
        for (let j = i; j < i + batchSize && j <= totalHeroes; j++) {
          batch.push(superheroAPI.searchById(j));
        }
        
        const results = await Promise.allSettled(batch);
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value) {
            heroes.push({
              id: result.value.id,
              name: result.value.name
            });
          }
        });
      }
      
      return heroes.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching heroes list:', error);
      throw new Error('Failed to fetch heroes list');
    }
  }
};
