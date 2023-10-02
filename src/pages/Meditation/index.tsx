import React from 'react';
import './meditation.css'
import Sidebar from '../../components/SideBar';
import Search from '../../components/Search';

const Meditation = () => {

  return (
    <main className="dashboard">
      <Sidebar/>
      <Search/>
      
      <h1 className='under'>Meditation in construction</h1>
    </main>
  );
}

export default Meditation;