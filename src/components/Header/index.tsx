import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

const Header: React.FC = () => {
  const [searchPhrase, onSetSearchPhrase] = useState('');
  const history = useHistory();

  const onClickSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push(`/search/${searchPhrase}`);
  };

  const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    onSetSearchPhrase(event.target.value);
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.inputWrapper}>
        <form onSubmit={onClickSearch}>
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
