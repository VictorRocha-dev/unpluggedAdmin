import React from 'react';
import './dash.css'
import Sidebar from '../../components/SideBar';
import Search from '../../components/Search';
const Dashboard = () => {

  return (
    <main className="dashboard">
      <Sidebar/>
      <Search/>
      
      <h1 className='under'>Dashboard in construction</h1>
    </main>
  );
}

export default Dashboard;