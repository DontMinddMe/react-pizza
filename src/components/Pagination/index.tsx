import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../../store/slices/filterSlice';

import styles from './Pagination.module.scss';

type PaginationProps = { paginationCount: number };

const Pagination: React.FC<PaginationProps> = ({ paginationCount }) => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((state: any) => state.filter); ////////////////////////////////////////// Временный фикс

  const paginationList = Array.from({ length: paginationCount }, (_, i) => i + 1);

  const incPaginationList = () => {
    if (activePage < paginationList.length) {
      dispatch(setActivePage(activePage + 1));
    }
  };

  const decPaginationList = () => {
    if (activePage > 1) {
      dispatch(setActivePage(activePage - 1));
    }
  };

  return (
    <div className={styles.root}>
      <ul>
        <li onClick={decPaginationList}>&#60;</li>
        {paginationList.map((value, index) => (
          <li
            key={value}
            className={value === activePage ? styles.selected : ''}
            onClick={() => {
              dispatch(setActivePage(value));
            }}
          >
            {value}
          </li>
        ))}
        <li onClick={incPaginationList}>&#62;</li>
      </ul>
    </div>
  );
};

export default Pagination;
