import React, { useState } from 'react';
import saleData from '../data/sales.json';

function SalePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = saleData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowSalesItems = saleData.filter(item => item.totalSold < 10);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Sale Items</h2>

      <input
        type="text"
        placeholder="Search sale items..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded px-3 py-1 mb-4 w-full sm:w-64"
      />

      {filteredItems.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map(item => (
            <div key={item.id} className="border rounded shadow-sm p-4 bg-white">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{item.description}</p>
              <p className="text-sm text-gray-500 italic">Category: {item.categoryName}</p>
              <p className="mt-2 font-semibold text-red-600">Sale Price: ₱{item.salePrice}</p>
              <p className="text-sm line-through text-gray-400">₱{item.price}</p>
              <p className="text-sm">
                Stock:{' '}
                <span className={item.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {item.stock > 0 ? `${item.stock} available` : 'Out of stock'}
                </span>
              </p>
              <p className="text-sm mt-1">Sold: {item.totalSold}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No sale items found.</p>
      )}

      {/* Simple Analytics */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Low Sales Analytics</h3>
        {lowSalesItems.length > 0 ? (
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {lowSalesItems.map(item => (
              <li key={item.id}>
                {item.name} — Only {item.totalSold} sold
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items with low sales.</p>
        )}
      </div>
    </div>
  );
}

export default SalePage;
