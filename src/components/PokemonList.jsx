import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  if (pokemons.length === 0) {
    return <p className="no-results">No Pokémon found!</p>;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
