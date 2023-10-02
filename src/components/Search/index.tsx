import React from 'react';

import { BiSearch } from 'react-icons/bi';
import Sidebar from '../../components/SideBar';
import './style.css'

interface SearchProps {
  onSearchChange: (query: string) => void; 
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onSearchChange(inputValue); 
  };

  return (
    <main className="search">
      <Sidebar />
      <div className="searchcontainer">
        <BiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={handleInputChange}
        />

      </div>
      <hr />
    </main>
  );
};

export default Search;
