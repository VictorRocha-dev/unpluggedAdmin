import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/unplugged-cerebro.png';
import styles from './login.module.css';

export function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
 
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn){
      navigate('/user');
    }
  })
  const handleLogin = () => {
    if (login === 'admin' && password === '123456789') {
      localStorage.setItem('isLoggedIn', 'true'); 
      navigate('/user');
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" />
          <h1>Unplugged</h1>
        </div>
        <h2>Faça seu login</h2>
        <p>Você precisa ter uma conta admin para acessar o painel de controle.</p>
      </header>

      <section className={styles.form}>
        <label htmlFor="login">Login</label>
        <input
          type="text"
          name="login"
          placeholder="Insira o login de admin."
          className={styles.textBox}
          autoComplete="off"
          value={login}
          onChange={(login) => setLogin(login.target.value)}
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          placeholder="Insira a senha de admin."
          className={styles.textBox}
          autoComplete="off"
          value={password}
          onChange={(pass) => setPassword(pass.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </section>
    </div>
  );
}
