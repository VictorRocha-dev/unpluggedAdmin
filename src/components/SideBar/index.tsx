import React from 'react';
import './style.css'
import { Link } from "react-router-dom";
import Logo from '../../assets/unplugged-cerebro.png'
import { BiSolidUserAccount, BiSolidVideos } from 'react-icons/bi'
import { BsSoundwave } from "react-icons/bs"
import { GiMeditation } from "react-icons/gi"
import { RiFoldersFill, RiDashboardFill } from "react-icons/ri"

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="titlecontainer">
          <img src={Logo} alt="Logo" />
          <h1>Unplugged</h1>
        </div>

      <div className="menu">
        <Link to="/"  > 
          <div className='links'>
            <i><RiDashboardFill /></i>
            <span>Dashboard</span>
          </div>
        </Link>

        <Link to="/user" > 
          <div className='links'>
            <i><BiSolidUserAccount /></i>
            <span>User</span>
          </div>
        </Link>

        <Link to="/modules" > 
          <div className='links'>
            <i><RiFoldersFill /></i>
            <span>Modules</span>
          </div>
        </Link>

        <Link to="/contents" > 
          <div className='links'>
            <i><BiSolidVideos /></i>
            <span>Contents</span>
          </div>
        </Link>

        <Link to="/binaurals" >
          <div className='links'>
            <i><BsSoundwave /></i>
            <span>Binaural</span>
          </div>
        </Link>

        <Link to="/meditations" >
          <div className='links'>
            <i><GiMeditation /></i>
            <span>Meditation</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
