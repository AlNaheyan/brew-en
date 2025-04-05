import { Link } from 'react-router-dom';

function BreweryCard({ brewery }) {
  return (
    <div className="card">
      <h2><Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link></h2>
      <p>Type: {brewery.brewery_type}</p>
      <p>State: {brewery.state}</p>
    </div>
  );
}
export default BreweryCard;
