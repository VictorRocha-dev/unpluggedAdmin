import { useState, useEffect } from 'react';
import './modules.css';
import Sidebar from '../../components/SideBar';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import Search from '../../components/Search';

interface Modulo {
  id: number;
  module_name: string;
  module_description: string;
  content_count: number;
}


const Module = () => {
  const [modulos, setModulos] = useState<Modulo[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newModule, setNewModule] = useState({
    module_name: '',
    module_description: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModule, setEditModule] = useState<Modulo>({
    id: 0,
    module_name: '',
    module_description: '',
    content_count: 0,
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/modules');
        if (!response.ok) {
          throw new Error('Não foi possível buscar os módulos.');
        }
        const data = await response.json();
        if (data.modules && Array.isArray(data.modules)) {
          setModulos(data.modules);
        } else {
          throw new Error('Formato de dados inválido.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchModulos();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newModule),
      });

      if (!response.ok) {
        throw new Error('Não foi possível adicionar o módulo.');
      }
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/modules/${editModule.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            module_name: editModule.module_name,
            module_description: editModule.module_description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Não foi possível atualizar o módulo.');
      }
      window.location.reload();
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWithConfirmation = async () => {
    const adminPassword = prompt('Digite a senha de administrador:');
  
    if (adminPassword === null) {
      return;
    }
    try {
      const isAdminPasswordCorrect = '123456789';
  
      if (adminPassword === isAdminPasswordCorrect) {
        const response = await fetch(
          `http://localhost:3333/api/modules/${editModule.id}`,
          {
            method: 'DELETE',
          }
        );
    
        if (!response.ok) {
          throw new Error('Não foi possível deletar o módulo.');
        }
        
        alert('Modulo e os Conteudos relacionados Excluido com Sucesso ')
        window.location.reload();
        closeEditModal();
      }
      else{
        alert('Senha de administrador incorreta.');
        return;
      }

    } catch (error) {
      console.error(error);
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (module: Modulo) => {
    setIsEditModalOpen(true);
    setEditModule(module);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditModule({
      id: 0,
      module_name: '',
      module_description: '',
      content_count: 0,
    });
  };

  return (
    <main className={`page ${isModalOpen || isEditModalOpen ? 'page-background' : ''}`}>
      <Sidebar />
      <Search onSearchChange={(query) => setSearchQuery(query)} /> {/* Passa a função de callback para o componente Search */}

      <div className="module-container">
        <div className="createnewmodule">
          <input type="button" value="Adicionar Módulo" onClick={openModal} />
        </div>

        <div className="modulos-lista">

          <div className="moduleslisttitle">
            <h4>Módulo</h4>
            <h4>Nome</h4>
            <h4>Aulas</h4>
          </div>

          <div className="moduleslist">
            {searchQuery.length > 0 ? (
              modulos
                .filter((modulo) =>
                  modulo.module_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((modulo) => (
                  <div className="list" key={modulo.id}>
                    <div className="titlesnames">
                      <div className="modulename">
                        <h3>Módulo {modulo.id}</h3>
                      </div>
                      <div className="modulename">
                        <h3>{modulo.module_name}</h3>
                      </div>
                      <div className="modulecoount">
                        <p>{modulo.content_count}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => openEditModal(modulo)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              modulos.map((modulo) => (
                <div className="list" key={modulo.id}>
                  <div className="titlesnames">
                    <div className="modulename">
                      <p>Módulo {modulo.id}</p>
                    </div>
                    <div className="modulename">
                      <p>{modulo.module_name}</p>
                    </div>
                    <div className="modulecoount">
                      <p>{modulo.content_count}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => openEditModal(modulo)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>


      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Adicionar Módulo Modal"
        className="custom-modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0 ,0, 0.8)'
          },

        }}
      >
        <div className="addmodules">
          <button className="close-button" onClick={closeModal}>
            <AiOutlineClose />
          </button>
          <h1>Adicionar Módulo</h1>
          <div>
            <label htmlFor="moduleName">Nome do Módulo:</label>
            <input
              type="text"
              id="moduleName"
              placeholder="Digite o nome do módulo"
              value={newModule.module_name}
              onChange={(e) =>
                setNewModule({ ...newModule, module_name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="moduleDescription">Descrição do Módulo:</label>
            <textarea
              id="moduleDescription"
              placeholder="Digite a descrição do módulo"
              value={newModule.module_description}
              onChange={(e) =>
                setNewModule({
                  ...newModule,
                  module_description: e.target.value,
                })
              }
            />
          </div>

          <button onClick={handleSubmit} className="submit-new">
            Adicionar
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Editar Módulo Modal"
        className="custom-modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0 ,0, 0.8)'
          },

        }}
      >
        <div className="editmodule">
          <button className="close-button" onClick={closeEditModal}>
            <AiOutlineClose />
          </button>
          <h1>Editar Módulo</h1>
          <div>
            <label htmlFor="editModuleName">Nome do Módulo:</label>
            <input
              type="text"
              id="editModuleName"
              placeholder="Digite o nome do módulo"
              value={editModule.module_name}
              onChange={(e) =>
                setEditModule({ ...editModule, module_name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="editModuleDescription">Descrição do Módulo:</label>
            <textarea
              id="editModuleDescription"
              placeholder="Digite a descrição do módulo"
              value={editModule.module_description}
              onChange={(e) =>
                setEditModule({
                  ...editModule,
                  module_description: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="buttons">
          <button onClick={handleEditSubmit} className="submit">
            Salvar
          </button>

          <button onClick={handleDeleteWithConfirmation} className="delete">
            Deletar
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default Module;
