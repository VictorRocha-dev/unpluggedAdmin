import styles from './styles.module.css'
import Logo from '../../assets/unplugged-cerebro.png'


export function NotFound(){
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
          <img src={Logo} alt="Logo" />
          <h1>Unplugged</h1>
        </div>
        <strong>404 Not Found</strong>
    </div>
  )
}