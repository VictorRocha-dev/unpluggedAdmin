import { useState, useEffect } from "react";
import styles from './binaural.module.css'
import Sidebar from '../../components/SideBar';
import Search from '../../components/Search';
import { useNavigate } from 'react-router-dom';

interface Binaral{
  id: number;
  name: string;
  binaural: number;
}



const Binaural = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn){
    navigate('/');
  }

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [binaural, setBinaural] = useState<Binaral[]>([]);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/binaurals/listCategoryAdm");
        
        if (!response.ok) {
          throw new Error("Não foi possível buscar os módulos.");
        }
        
        const data = await response.json(); // Aguarde a resolução da promessa aqui
  
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
    <main className={styles.binaural}>
      <Sidebar/>
      <Search  onSearchChange={(query) => setSearchQuery(query)}/>

      <div className={styles.binauralContainer}>
         <div className={styles.createnewplaylist}>
          <input type="button" value="Adicionar Playlist"/>
        </div>

        <div className={styles.playlists}>

          <div className={styles.playliststittle}>
            <h4>Playlist</h4>
            <h4>Nome</h4>
            <h4>Sons</h4>
          </div>

          <div className={styles.playlistlist}>
            {searchQuery.length > 0
              ? binaural
                  .filter((binaural) =>
                  binaural.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((binaural, index) => (
                    <div className="list" key={binaural.id}>
                      <div className="titlesnames">
                        <div className="modulename">
                          <p>Playlist {index + 1}</p>
                        </div>
                        <div className="modulename">
                          <h3>{binaural.name}</h3>
                        </div>
                        <div className="modulecoount">
                          <p>{binaural.binaural}</p>
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
              : binaural .map((binaural, index) => (
                <div className="list" key={binaural.id}>
                  <div className="titlesnames">
                    <div className="modulename">
                      <p>Playlist {index + 1}</p>
                    </div>
                    <div className="modulename">
                      <p>{binaural.name}</p>
                    </div>
                    <div className="modulecoount">
                      <p>{binaural.binaural}</p>
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

export default Binaural;