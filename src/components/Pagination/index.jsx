import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../../store/slices/filterSlice';

import styles from './Pagination.module.scss';

const Pagination = ({ paginationCount }) => {
  const dispatch = useDispatch();
  const [activePaginationPageIndex, setActivePaginationPageIndex] = React.useState(0);

  const paginationList = Array.from({ length: paginationCount }, (_, i) => i + 1);

  const incPaginationList = () => {
    if (activePaginationPageIndex < paginationList.length - 1) {
      setActivePaginationPageIndex(activePaginationPageIndex + 1);
      dispatch(setActivePage(activePaginationPageIndex + 2));
    }
  };

  const decPaginationList = () => {
    if (activePaginationPageIndex > 0) {
      setActivePaginationPageIndex(activePaginationPageIndex - 1);
      dispatch(setActivePage(activePaginationPageIndex));
    }
  };

  return (
    <div className={styles.root}>
      <ul>
        <li onClick={decPaginationList}>&#60;</li>
        {paginationList.map((value, index) => (
          <li
            key={value}
            className={index === activePaginationPageIndex ? styles.selected : ''}
            onClick={() => {
              setActivePaginationPageIndex(index);
              dispatch(setActivePage(index + 1));
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
