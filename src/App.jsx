import React, { useEffect, useState } from 'react';
import { getPokemons } from './services/api';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemons();
        setPokemons(data);
        setFilteredPokemons(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  const allTypes = [...new Set(pokemons.flatMap(pokemon => pokemon.types))];

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter types={allTypes} selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
}

export default App;
