import React, { useState, useEffect } from 'react';
import './user.css';
import Sidebar from '../../components/SideBar';
import { BiSearch } from 'react-icons/bi';
import Modal from 'react-modal';

interface User {
  id: string;
  nickname: string;
  email: string;
  habits_count: number;
}

Modal.setAppElement('#root');

const Users = () => {
  const [query, setQuery] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/users');
        if (!response.ok) {
          throw new Error('Não foi possível buscar os usuários.');
        }
        const data = await response.json();
        if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          throw new Error('Formato de dados inválido.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (q: string) => {
    const queryWithoutSpaces = q.replace(/\s/g, '');
    const queryLowerCase = queryWithoutSpaces.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.nickname.replace(/\s/g, '').toLowerCase().includes(queryLowerCase)
    );
    setFilteredUsers(filteredUsers);
  };

  const toggleExpansion = (id: string) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const isExpanded = (id: string) => {
    return expandedItems.includes(id);
  };

  return (
    <main>
      <Sidebar />
      <div className="user-container">
        <div className="searchcontainer">
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
        <hr />
        <div className="users-lista">
          <div className="userslisttitle">
            <h4>ID</h4>
            <h4>Nickname</h4>
            <h4 className='emailuser'>Email</h4>
            <h4>Hábitos Criados</h4>
          </div>
          <div className="userslist">
            {query.length > 0 ? (
              filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div className="list" key={user.id}>
                    <div className="titlesnames">
                      <div className="user-name">
                        <p
                          className={isExpanded(user.id) ? '' : 'truncate'}
                          data-fulltext={user.id}
                          onClick={() => toggleExpansion(user.id)}
                        >
                          {user.id}
                        </p>
                      </div>
                      <div className="user-name">
                        <p
                          className={isExpanded(user.id) ? '' : 'truncate'}
                          data-fulltext={user.nickname}
                          onClick={() => toggleExpansion(user.id)}
                        >
                          {user.nickname}
                        </p>
                      </div>
                      <div className="user-count">
                        <p
                          className={isExpanded(user.id) ? '' : 'truncate'}
                          data-fulltext={user.email}
                          onClick={() => toggleExpansion(user.id)}
                        >
                          {user.email}
                        </p>
                      </div>
                      <div className="user-count">
                        <p>{user.habits_count}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="res">Nenhum resultado encontrado.</p>
              )
            ) : (
              users.map((user) => (
                <div className="list" key={user.id}>
                  <div className="titlesnames">
                    <div className="user-name">
                      <p
                        className={isExpanded(user.id) ? '' : 'truncate'}
                        data-fulltext={user.id}
                        onClick={() => toggleExpansion(user.id)}
                      >
                        {user.id}
                      </p>
                    </div>
                    <div className="user-name">
                      <p
                        className={isExpanded(user.id) ? '' : 'truncate'}
                        data-fulltext={user.nickname}
                        onClick={() => toggleExpansion(user.id)}
                      >
                        {user.nickname}
                      </p>
                    </div>
                    <div className="user-count">
                      <p
                        className={isExpanded(user.id) ? '' : 'truncate'}
                        data-fulltext={user.email}
                        onClick={() => toggleExpansion(user.id)}
                      >
                        {user.email}
                      </p>
                    </div>
                    <div className="user-count">
                      <p>{user.habits_count}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;
