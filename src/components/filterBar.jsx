function FilterBar({ value, onChange }) {
    const options = ['micro', 'nano', 'regional', 'brewpub', 'large', 'planning'];
  
    return (
      <select value={value} onChange={e => onChange(e.target.value)}>
        <option value="">All Types</option>
        {options.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    );
  }
  export default FilterBar;
  