import React from 'react';

const PokemonCard = ({ pokemon }) => (
  <div className="pokemon-card">
    <img src={pokemon.image} alt={pokemon.name} />
    <h2>{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    <div className="types">
      {pokemon.types.map((type) => (
        <span key={type} className={`type ${type}`}>
          {type}
        </span>
      ))}
    </div>
  </div>
);

export default PokemonCard;
