import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/unplugged-cerebro.png";
import { BiSolidUserAccount, BiSolidVideos } from "react-icons/bi";
import { MdPlaylistAddCheck } from "react-icons/md";
import { BsSoundwave } from "react-icons/bs";
import { GiMeditation } from "react-icons/gi";
import { RiFoldersFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import {  AiOutlineCaretDown } from "react-icons/ai";
import {IoMusicalNoteSharp} from 'react-icons/io5'

const Sidebar = () => {
  const [isBinauralDropdownOpen, setIsBinauralDropdownOpen] = useState(false);
  const [isMeditationDropdownOpen, setIsMeditationDropdownOpen] =
    useState(false);
  const navigate = useNavigate();

  const toggleBinauralDropdown = () => {
    setIsBinauralDropdownOpen(!isBinauralDropdownOpen);
    // Feche o dropdown de meditação se estiver aberto
    if (isMeditationDropdownOpen) {
      setIsMeditationDropdownOpen(false);
    }
  };

  const toggleMeditationDropdown = () => {
    setIsMeditationDropdownOpen(!isMeditationDropdownOpen);
    // Feche o dropdown binaural se estiver aberto
    if (isBinauralDropdownOpen) {
      setIsBinauralDropdownOpen(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="titlecontainer">
        <img src={Logo} alt="Logo" />
        <h1>Unplugged</h1>
      </div>

      <div className="menu">
        <Link to="/user">
          <div className="links">
            <i>
              <BiSolidUserAccount />
            </i>
            <span>User</span>
          </div>
        </Link>

        <Link to="/modules">
          <div className="links">
            <i>
              <RiFoldersFill />
            </i>
            <span>Modules</span>
          </div>
        </Link>

        <Link to="/contents">
          <div className="links">
            <i>
              <BiSolidVideos />
            </i>
            <span>Contents</span>
          </div>
        </Link>

        <div className="links" onClick={toggleBinauralDropdown}>
          <div className="ccc">
            <div className="normal">
              <i>
                <BsSoundwave />
              </i>
              <span>Binaural </span>
            </div>
            <div className="arrow">
              <span>
                <AiOutlineCaretDown />
              </span>
            </div>
          </div>
        </div>

        {isBinauralDropdownOpen && (
          <div className="binaural-dropdown">
            <Link to="/binaurals">
              <div className="links">
                <i>
                  <MdPlaylistAddCheck />
                </i>
                <span>Binaural Playlist</span>
              </div>
            </Link>

            <Link to="/binauralsound">
              <div className="links">
                <i>
                  <IoMusicalNoteSharp />
                </i>
                <span>Binaural Sound</span>
              </div>
            </Link>
          </div>
        )}

        <div className="links" onClick={toggleMeditationDropdown}>
          <div className="ccc">
            <div className="normal">
              <i>
                <GiMeditation />
              </i>
              <span>Meditation</span>
            </div>
            <div className="arrow">
              <span>
                <AiOutlineCaretDown />
              </span>
            </div>
          </div>
        </div>

        {isMeditationDropdownOpen && (
          <div className="meditation-dropdown">
            <Link to="/meditations">
              <div className="links">
                <i>
                  <MdPlaylistAddCheck />
                </i>
                <span>Meditation Playlist</span>
              </div>
            </Link>

            <Link to="/meditationsound">
              <div className="links">
                <i>
                  <IoMusicalNoteSharp />
                </i>
                <span>Meditation Sound</span>
              </div>
            </Link>
          </div>
        )}

        <div
          className="links"
          id="sair"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <i>
            <CiLogout />
          </i>
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
