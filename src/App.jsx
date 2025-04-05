import { useEffect, useState } from 'react';
import BreweryCard from './components/breweryCard';
import SearchBar from './components/searchBar';
import FilterBar from './components/filterBar';

function Home() {
  const [breweries, setBreweries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=100');
      const data = await res.json();
      setBreweries(data);
      setFiltered(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let updated = breweries.filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filterType) {
      updated = updated.filter(b => b.brewery_type === filterType);
    }
    setFiltered(updated);
  }, [search, filterType, breweries]);

  const total = breweries.length;
  const micro = breweries.filter(b => b.brewery_type === 'micro').length;
  const stateCount = new Set(breweries.map(b => b.state)).size;

  return (
    <div>
      <h1>Brewery Dashboard</h1>
      <div className="summary">
        <p>Total Breweries: {total}</p>
        <p>Micro Breweries: {micro}</p>
        <p>States Represented: {stateCount}</p>
      </div>
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar value={filterType} onChange={setFilterType} />
      <div className="brewery-list">
        {filtered.map(brewery => (
          <BreweryCard key={brewery.id} brewery={brewery} />
        ))}
      </div>
    </div>
  );
}

export default Home;
