import { useState, useEffect } from "react";
import styles from "./meditation.module.css";
import Sidebar from "../../components/SideBar";
import Search from "../../components/Search";
import { useNavigate } from "react-router-dom";

interface Meditation {
  id: number;
  meditation_name: string;
  meditation_sound: string;
  meditation_img: string;
  meditation_duration: number;
  Meditation_autor: string;
  meditationCategoryId: number;
  meditation_category: {
    name: string;
  };
}

const MeditationSound = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    navigate("/");
  }

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [meditation, setMeditation] = useState<Meditation[]>([]);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3333/api/meditations/meditationadmin"
        );
  
        if (!response.ok) {
          throw new Error("Não foi possível buscar as meditações.");
        }
  
        const data = await response.json();
        console.log(data);
        
        if (data.meditations && Array.isArray(data.meditations)) {
          setMeditation(data.meditations); // Substitua binaurals por meditations
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
    <main className={styles.meditation}>
      <Sidebar />
      <Search onSearchChange={(query) => setSearchQuery(query)} />

      <div className={styles.meditationContainer}>
        <div className={styles.createnewplaylist}>
          <input type="button" value="Adicionar Meditação" />
        </div>

        <div className={styles.playlists}>
          <div className={styles.playliststittle}>
            <h4>Nome</h4>
            <h4>Duração</h4>
            <h4>Autor</h4>
          </div>

          <div className={styles.playlistlist}>
            {searchQuery.length > 0
              ? meditation
                  .filter((meditation) =>
                  meditation.meditation_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((meditation) => (
                    <div className="list" key={meditation.id}>
                      <div className="titlesnames">
                        <div className="modulename">
                          <p>{meditation.meditation_name}</p>
                        </div>
                        <div className="modulename">
                          <h3>{meditation.meditation_duration}</h3>
                        </div>
                        <div className="modulecoount">
                          <p>{meditation.Meditation_autor}</p>
                        </div>
                      </div>
                      <div>
                        <button type="button">Editar</button>
                      </div>
                    </div>
                  ))
              : meditation.map((meditation) => (
                <div className="list" key={meditation.id}>
                  <div className="titlesnames">
                    <div className="modulename">
                      <p>{meditation.meditation_name}</p>
                    </div>
                    <div className="modulename">
                      <h3>{meditation.meditation_duration}</h3>
                    </div>
                    <div className="modulecoount">
                      <p>{meditation.Meditation_autor}</p>
                    </div>
                  </div>
                  <div>
                    <button type="button">Editar</button>
                  </div>
                </div>
              ))}
          </div>

          
        </div>
      </div>
    </main>
  );
};

export default MeditationSound;
