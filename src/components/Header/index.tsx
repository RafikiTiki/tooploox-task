import React from 'react';
import styles from './styles.module.css';
import { useHeader } from './hook';

const Header: React.FC = () => {
  const { onChangeText, onSearch, searchPhrase } = useHeader();

  return (
    <header className={styles.appHeader}>
      <div className={styles.inputWrapper}>
        <form onSubmit={onSearch}>
          <input
            className={styles.input}
            placeholder="Search for users"
            value={searchPhrase}
            onChange={onChangeText}
          />
          <button
            aria-label="Search for users"
            type="submit"
            className={styles.button}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
