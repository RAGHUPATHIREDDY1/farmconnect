import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import './index.css';

function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://www.jsonkeeper.com/b/0MMMD');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Data fetched from API:', data);
        
        const itemsData = Array.isArray(data) ? data : (data[Object.keys(data)[0]] || []);
        setItems(itemsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="products-container" style={{ marginTop: '40px' }}>
      <h2>Other Farm Products</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <ClipLoader color="#e67e22" size={50} />
        </div>
      ) : null}

      {error ? <p style={{ color: 'red' }}>Error: {error}</p> : null}

      {!loading && !error && (
        <div className="products-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {items.map((item) => (
            <div key={item.id} className="product-card" style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', width: '250px' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3>
                {item.name} {item.organic ? <span title="Organic">🌿</span> : null}
              </h3>
              <p style={{ margin: '5px 0' }}><strong>Price:</strong> ₹{item.price} / {item.unit}</p>
              <p style={{ margin: '5px 0' }}><strong>Origin:</strong> {item.origin}</p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;