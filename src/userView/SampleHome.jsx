import React, { useState } from 'react';
import { FaShoppingCart, FaSearch, FaUserCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const items = [
  { id: 1, name: 'Mountain Bike', category: 'top', image: 'https://images.unsplash.com/photo-1' },
  { id: 2, name: 'Helmet', category: 'top', image: 'https://images.unsplash.com/photo-2' },
  { id: 3, name: 'Gloves', category: 'new', image: 'https://images.unsplash.com/photo-3' },
  { id: 4, name: 'Water Bottle', category: 'new', image: 'https://images.unsplash.com/photo-4' },
];

const Header = ({ onSearch, userDropdownVisible, toggleUserDropdown }) => (
  <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md sticky top-0 z-20">
    <div className="text-2xl font-bold">Pedal Hub</div>
    <div className="flex items-center gap-2">
      <input type="text" placeholder="Search item" onChange={onSearch} className="px-3 py-1 rounded-l-md border border-gray-300 text-black" />
      <button className="bg-blue-500 px-3 py-1 rounded-r-md text-white"><FaSearch /></button>
    </div>
    <div className="flex items-center gap-4">
      <button><FaShoppingCart /></button>
      <div className="relative cursor-pointer" onClick={toggleUserDropdown}>
        <div className="flex items-center gap-1"><FaUserCircle /> Meinard</div>
        {userDropdownVisible && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black border border-gray-300 rounded shadow-lg z-10">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Account</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </div>
  </header>
);

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1601234567890',
    'https://images.unsplash.com/photo-1609876543210'
  ];

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6">
      <img src={images[index]} alt="slide" className="w-full h-64 object-cover rounded-md" />
      <button onClick={prev} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"><FaChevronLeft /></button>
      <button onClick={next} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"><FaChevronRight /></button>
    </div>
  );
};

const ProductSection = ({ title, items }) => (
  <section className="my-8 px-4">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.length > 0 ? (
        items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
            <div className="p-2">
              <h3 className="text-sm font-medium">{item.name}</h3>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">No items found.</div>
      )}
    </div>
  </section>
);

const App = () => {
  const [search, setSearch] = useState('');
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search));

  return (
    <div className="bg-gray-50 h-screen overflow-y-auto">
      <Header onSearch={handleSearch} userDropdownVisible={userDropdownVisible} toggleUserDropdown={toggleUserDropdown} />
      <main className="pb-10">
        <Carousel />
        <ProductSection title="Top Items" items={filteredItems.filter(item => item.category === 'top')} />
        <ProductSection title="New Items" items={filteredItems.filter(item => item.category === 'new')} />
      </main>
    </div>
  );
};

export default App;
