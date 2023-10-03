import React from 'react';
import styles from  './dash.module.css'
import Sidebar from '../../components/SideBar';
import Search from '../../components/Search';
const Dashboard = () => {

  return (
    <main className={styles.dashboard}>
      <Sidebar/>
      <Search/>
      
      <h1 className={styles.under}>Dashboard in construction</h1>
    </main>
  );
}

export default Dashboard;