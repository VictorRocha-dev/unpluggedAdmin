
import Logo from '../../assets/unplugged-cerebro.png'
import styles from './login.module.css'

export function Login(){
  return (
    <div className={styles.container}>
      <header>
      <div className={styles.logo}>
          <img src={Logo} alt="Logo" />
          <h1>Unplugged</h1>
        </div>
        <h2>Faça seu login</h2>
      <p>Você precisa ter uma conta admin para acessar o dashboard.</p>
        </header>

        <section className={styles.form}>
          <label htmlFor="login">Login</label>
          <input type="text" name="login" placeholder="Insira o login de admin." className={styles.textBox} autoComplete="off"/>
          <label htmlFor="login">Senha</label>
          <input type="text" name="password" placeholder="Insira a senha de admin." className={styles.textBox} autoComplete="off"/>
          <button type='button'>
              Entrar
          </button>
        </section>
    </div>
  )
}