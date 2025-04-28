import axios from 'axios';

export const getPokemons = async (limit = 150) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const pokemonList = response.data.results;

    const detailedData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.front_default,
          types: details.data.types.map(typeInfo => typeInfo.type.name),
        };
      })
    );

    return detailedData;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon');
  }
};
