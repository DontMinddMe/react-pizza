import React from 'react';
import { setSearchValue } from '../../store/slices/searchSlice';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';

import styles from './SearchBar.module.scss';

const Searchbar: React.FC = () => {
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        type="search"
        placeholder="Поиск"
        value={searchValue}
        onChange={(event) => dispatch(setSearchValue(event.target.value))}
      />
    </div>
  );
};

export default Searchbar;
