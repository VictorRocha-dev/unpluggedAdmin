import { useState , useEffect } from "react";

import styles from './binauralSound.module.css'
import Sidebar from '../../components/SideBar';
import Search from '../../components/Search';
import { useNavigate } from 'react-router-dom';

interface Binaural {
  id: number;
  binaural_name: string;
  binaural_sound: string;
  binaural_img: string;
  binaural_duration: number;
  binaral_autor: string;
  binauralCategoryId: number;
  binauralCategory: {
    name: string;
    images: string;
  };
}

const BinauralSound = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [binaural, setBinaural] = useState<Binaural[]>([]);

  if (!isLoggedIn){
    navigate('/');
  }


  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/binaurals/binauraladm");

        if (!response.ok) {
          throw new Error("Não foi possível buscar os módulos.");
        }
        
        const data = await response.json(); 
        console.log(data);
        
        if (data.binaurals && Array.isArray(data.binaurals)) {
          setBinaural(data.binaurals);
        } else {
          throw new Error("Formato de dados inválido.");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchModulos();
  }, []);

  return (
    <main className={styles.binauralSound}>
      <Sidebar/>
      <Search  onSearchChange={(query) => setSearchQuery(query)}/>
      
      <div className={styles.binauralContainer}>
         <div className={styles.createnewplaylist}>
          <input type="button" value="Adicionar Binaural"/>
        </div>

        <div className={styles.playlists}>

          <div className={styles.playliststittle}>
            <h4>Nome</h4>
            <h4>Duração</h4>
            <h4>Autor</h4>
          </div>

          <div className={styles.playlistlist}>
            {searchQuery.length > 0
              ? binaural
                  .filter((binaural) =>
                  binaural.binaural_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((binaural) => (
                    <div className="list" key={binaural.id}>
                      <div className="titlesnames">
                        <div className="modulename">
                          <p>{binaural.binaural_name}</p>
                        </div>
                        <div className="modulename">
                          <h3>{binaural.binaural_duration}</h3>
                        </div>
                        <div className="modulecoount">
                          <p>{binaural.binaral_autor}</p>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  ))
              : binaural .map((binaural) => (
                <div className="list" key={binaural.id}>
                  <div className="titlesnames">
                    <div className="modulename">
                      <p>{binaural.binaural_name}</p>
                    </div>
                    <div className="modulename">
                      <p>{binaural.binaural_duration}</p>
                    </div>
                    <div className="modulecoount">
                      <p>{binaural.binaral_autor}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      
                    >
                      Editar
                    </button>
                  </div>
                </div>
                ))}
          </div>

        </div>

      </div>
    </main>
  );
}

export default BinauralSound;