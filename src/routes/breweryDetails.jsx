import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
      const data = await res.json();
      setBrewery(data);
    };
    fetchBrewery();
  }, [id]);

  if (!brewery) return <p className="loading">Loading...</p>;

  // Format phone number if available
  const formatPhone = (phone) => {
    if (!phone) return 'Not available';
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  return (
    <div className="brewery-detail">
      <div className="brewery-detail-header">
        <h1>{brewery.name}</h1>
        Type: <span className="brewery-type-badge">{brewery.brewery_type}</span>
      </div>
      
      <div className="brewery-detail-content">
        <div className="brewery-detail-section">
          <h2>Location</h2>
          <div className="brewery-info-item">
            <span className="brewery-info-label">Address:</span>
            <span className="brewery-info-value">
              {brewery.street ? brewery.street + ', ' : ''}
              {brewery.city}, {brewery.state} {brewery.postal_code}
            </span>
          </div>
          <div className="brewery-info-item">
            <span className="brewery-info-label">Country:</span>
            <span className="brewery-info-value">{brewery.country}</span>
          </div>
          
          {(brewery.latitude && brewery.longitude) && (
            <div className="brewery-map">
              Map would be displayed here
            </div>
          )}
        </div>
        
        <div className="brewery-detail-section">
          <h2>Contact</h2>
          <div className="brewery-info-item">
            <span className="brewery-info-label">Phone:</span>
            <span className="brewery-info-value">{formatPhone(brewery.phone)}</span>
          </div>
          
          {brewery.website_url && (
            <a 
              href={brewery.website_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="brewery-website"
            >
              Visit Website
            </a>
          )}
        </div>
        
        <div className="brewery-detail-section">
          <h2>Additional Info</h2>
          <div className="brewery-info-item">
            <span className="brewery-info-label">Type:</span>
            <span className="brewery-info-value">{brewery.brewery_type}</span>
          </div>
          {brewery.updated_at && (
            <div className="brewery-info-item">
              <span className="brewery-info-label">Last Updated:</span>
              <span className="brewery-info-value">
                {new Date(brewery.updated_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BreweryDetail;