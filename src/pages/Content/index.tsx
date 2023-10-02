import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";

import Sidebar from "../../components/SideBar";
import Search from "../../components/Search";
import './content.css'

interface Content {
  id: number;
  content_name: string;
  content_type: string;
  content_video_url: string;
  content_article: string | null;
  content_Module_id: number;
  content_Module_name?: string;
  content_comments?: number;
  contets_duration: number;
}

interface Modulo {
  id: number;
  module_name: string;
}

const Contents = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      alert('Vídeo selecionado com sucesso');
    }
  };

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/contents');
        if (!response.ok) {
          throw new Error('Não foi possível buscar os módulos.');
        }
        const data = await response.json();
        if (data.contents && Array.isArray(data.contents)) {
          setContents(data.contents);
          console.log(data.contents);
        } else {
          throw new Error('Formato de dados inválido.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchModulos();
  }, []);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [newContent, setNewContent] = useState({
    contents_name: "",
    contents_type: "",
    contents_video_url: ""  + '.mp4',
    contents_article: null,
    modulesId: 0,
    contets_duration: 0
  });

  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        console.error('Nenhum arquivo de vídeo selecionado.');
        alert('Nenhum arquivo de vídeo selecionado.')
        return;
      }
      const select1 = document.getElementById('moduleSelect');
      const select2 = document.getElementById('type');
      
      if (select1.value === '' || select2.value === '') {
        alert('Por favor, selecione uma opção em todos os campos select.');
        return false; // Impede o envio do formulário
      }

      const videoUrl = newContent.contents_video_url.replace(' ', '-');
      const fileName = videoUrl.substring(videoUrl.lastIndexOf('/') + 1);
      const renamedFileName = `${fileName}`;

      // Renomear o arquivo selecionado com o nome completo
      const renamedFile = new File([selectedFile], renamedFileName, { type: selectedFile.type });

      const formData = new FormData();
      formData.append('video', renamedFile);

      const [response1, response2] = await Promise.all([
        axios.post('http://localhost:3333/api/contents', newContent, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        axios.post('http://localhost:3333/api/contents/postvideo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      ]);

      console.log('Resposta do primeiro pedido:', response1.data);
      console.log('Resposta do segundo pedido:', response2.data);

      window.location.reload();
      closeModal();
    } catch (error) {
      console.error('Erro ao enviar arquivo de vídeo:', error);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editContent, setEditContent] = useState({
    id: 0,
    content_name: "",
    content_type: "",
    content_video_url: "",
    content_article: '',
    modulesId: 0,
    contents_duration: 0,
  });

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openEditModal = (content: Content) => {
    setIsEditModalOpen(true);
    setEditContent(content);
    console.log("Content to edit:", content);
  };
  
  const handleEditSubmit = async () => {
    try {
      const select1 = document.getElementById('moduleSelect') as HTMLSelectElement;
      const select2 = document.getElementById('type') as HTMLSelectElement;

      if (select1.value === '' || select2.value === '') {
        alert('Por favor, selecione uma opção em todos os campos select.');
        return false; // Impede o envio do formulário
      }

      console.log("Edit content to submit:", editContent);
      const response = await fetch(
        `http://localhost:3333/api/contents/${editContent.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents_name: editContent.content_name,
            contents_type: editContent.content_type,
            contents_video_url: editContent.content_video_url,
            contents_article: editContent.content_article,
            modulesId: editContent.modulesId,
            contents_duration: editContent.contents_duration,
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
          `http://localhost:3333/api/contents/${editContent.id}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Não foi possível deletar o Conteúdo.');
        }

        alert('Conteúdo Excluído com Sucesso ');
        window.location.reload();
        closeEditModal();
      } else {
        alert('Senha de administrador incorreta.');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={`page ${isModalOpen ? 'page-background' : ''}`} >
      <Sidebar />
      <Search onSearchChange={(query) => setSearchQuery(query)} />

      <div className="contentContainer">

        <div className="createnewmodule">
          <input type="button" value="Adicionar Conteudo" onClick={openModal} />
        </div>

        <div className="content-list">

          <div className="contentlisttitle">
            <h4>Nome</h4>
            <h4>Módulo</h4>
            <h4>Tipo</h4>
            <h4>Comentários</h4>
          </div>

          <div className="contentlist ">

            {searchQuery.length > 0 ? (
              contents.filter((contents) =>
                contents.content_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
                .map((contents) => (
                  <div className="list" key={contents.id}>
                    <div className="titlesnames">

                      <div className="modulename">
                        <p>{contents.content_name}</p>
                      </div>

                      <div className="modulename">
                        <p>{contents.content_Module_name}</p>
                      </div>
                      <div className="modulename">
                        <p>{contents.content_type}</p>
                      </div>
                      <div className="modulecoount">
                        <p>{contents.content_comments}</p>
                      </div>

                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => openEditModal(contents)} // Passa o conteúdo completo
                      >
                        Editar
                      </button>
                    </div>

                  </div>
                ))
            )
              :
              (
                contents.map((contents) => (
                  <div className="list" key={contents.id}>
                    <div className="titlesnames">

                      <div className="modulename">
                        <p>{contents.content_name}</p>
                      </div>

                      <div className="modulename">
                        <p>{contents.content_Module_name}</p>
                      </div>

                      <div className="modulename">
                        <p>{contents.content_type}</p>
                      </div>

                      <div className="modulecoount">
                        <p>{contents.content_comments}</p>
                      </div>

                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => openEditModal(contents)} // Passa o conteúdo completo
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
        contentLabel="Adicionar Content Modal"
        className="custom-modal-content"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0 ,0, 0.9)'
          },
        }}
      >
        <div className="containermodaladd">
          <button className="close-button" onClick={closeModal}>
            <AiOutlineClose />
          </button>
          <div>
            <label htmlFor="contentname" className="contentname">Nome do Conteudo</label>
            <input
              type="text"
              id="contentname"
              value={newContent.contents_name}
              onChange={(e) =>
                setNewContent({
                  ...newContent,
                  contents_name: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="muduleselect">Módulo</label>

            <select
              name="content_Module_id"
              id="moduleSelect"
              value={newContent.modulesId}
              onChange={(e) =>
                setNewContent({
                  ...newContent,
                  modulesId: Number(e.target.value),
                })
              }
              required
            >

              <option value="">Selecione um modulo</option>
              {modulos.map((modulo) => (
                <option key={modulo.id} value={modulo.id}>
                  {modulo.module_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="type">Tipo</label>
            <select
              id="type"
              value={newContent.contents_type}
              onChange={(e) =>
                setNewContent({
                  ...newContent,
                  contents_type: e.target.value,
                })
              }
            > 
              <option value=""> Selecione o tipo de conteudo</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
            </select>
          </div>

          <div>
            <label htmlFor="url_video">Nome do video</label>
            <input type="text"
              id="url_video"
              value={newContent.contents_video_url}
              onChange={(e) =>
                setNewContent({
                  ...newContent,
                  contents_video_url: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="duração">Duração</label>
            <input type="number"
              id="duração"
              value={newContent.contets_duration}
              onChange={(e) =>
                setNewContent({
                  ...newContent,
                  contets_duration: e.target.valueAsNumber,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="contents_article">Artigo</label>
            <input type="text" id="contents_article" />
          </div>
        </div>

        <div className="videoandsubmit">
          <div className="filecustom">
            <input type="file" onChange={handleFileChange} className="custom-file-input" id="fileInput" />
            <label className="custom-file-label" htmlFor="fileInput">
              <div className="centered-content">
                <span>Selecionar Video</span>
              </div>
            </label>
          </div>

          <button onClick={handleSubmit} className="submit" >
            Adicionar
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Adicionar Content Modal"
        className="custom-modal-content"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0 ,0, 0.9)'
          },
        }}
      >
        <div className="containermodaladd">
          <button className="close-button" onClick={closeEditModal}>
            <AiOutlineClose />
          </button>

          <div>
            <label htmlFor="contentname" className="contentname">
              Nome do Conteúdo
            </label>
            <input
              type="text"
              id="contentname"
              value={editContent.content_name}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  content_name: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="muduleselect">Módulo</label>

            <select
              name="content_Module_id"
              id="moduleSelect"
              value={editContent.modulesId}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  modulesId: Number(e.target.value),
                })
              }
              required
            >

              <option value="">Selecione um módulo</option>
              {modulos.map((modulo) => (
                <option key={modulo.id} value={modulo.id}>
                  {modulo.module_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="type">Tipo</label>
            <select
              id="type"
              value={editContent.content_type}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  content_type: e.target.value,
                })
              }
            >
              <option value="">Selecione o tipo de conteúdo</option>
              <option value="video">Vídeo</option>
              <option value="article">Artigo</option>
            </select>
          </div>

          <div>
            <label htmlFor="url_video">Nome do vídeo</label>
            <input
              type="text"
              id="url_video"
              value={editContent.content_video_url}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  content_video_url: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="duração">Duração</label>
            <input
              type="number"
              id="duração"
              value={editContent.contents_duration}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  contents_duration: e.target.valueAsNumber,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="contents_article">Artigo</label>
            <input
              type="text"
              id="contents_article"
              value={editContent.content_article ?? ''}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  content_article: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="buttons-contents">
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

export default Contents;
