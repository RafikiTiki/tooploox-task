import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAddAlert } from '../../store/component/alerts/actions';
import { generateId } from '../../utils';
import { AlertType } from '../../store/component/alerts/types';
import { Alert } from '../../store/component/alerts/models';

export type HeaderHook = {
  searchPhrase: string;
  onChangeText: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
};

export const useHeader = (): HeaderHook => {
  const [searchPhrase, onSetSearchPhrase] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const addEmptySearchInputAlert = useCallback(() => {
    const alert = Alert({
      id: generateId(),
      type: AlertType.ERROR,
      message: 'Search input cannot be empty.',
    });
    dispatch(onAddAlert(alert));
  }, [dispatch]);

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchPhrase.length > 0) {
      history.push(`/search/${searchPhrase}`);
    } else {
      addEmptySearchInputAlert();
    }
  };

  const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    onSetSearchPhrase(event.target.value);
  };

  return {
    searchPhrase,
    onSearch,
    onChangeText,
  };
};
