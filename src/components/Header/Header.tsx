import * as styles from './Header.css';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}></div>
      <div className={styles.profileIcon}>A</div>
    </header>
  );
};

export default Header;
