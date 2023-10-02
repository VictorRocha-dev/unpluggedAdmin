import React from 'react';
import './binaural.css'
import Sidebar from '../../components/SideBar';
import Search from '../../components/Search';
const Binaural = () => {

  return (
    <main className="dashboard">
      <Sidebar/>
      <Search/>
      
      <h1 className='under'>Binaural in construction</h1>
    </main>
  );
}

export default Binaural;