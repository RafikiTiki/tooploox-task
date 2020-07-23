import React, {
  MouseEvent,
  ChangeEvent,
  useCallback,
  useState,
  FormEvent,
} from 'react';
import styles from './styles.module.css';

type PropTypes = {
  onSearch: (searchPhrase: string) => void;
};

const Header: React.FC<PropTypes> = ({ onSearch }) => {
  const [searchPhrase, onSetSearchPhrase] = useState('');

  const onClickSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchPhrase);
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
