import React from 'react';
import { setSort, setIsAsc } from '../store/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

type SortItem = {
  name: string;
  value: string;
};

export const sortTypes: SortItem[] = [
  { name: 'популярности', value: 'rating' },
  { name: 'цене', value: 'price' },
  { name: 'алфавиту', value: 'title' },
];

const Sort: React.FC = () => {
  const [sortPopUpVisibility, setSortPopUpVisibility] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const clickEvent = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setSortPopUpVisibility(false);
      }
    };

    const keydownEvent = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setSortPopUpVisibility(false);
      }
    };

    document.addEventListener('click', clickEvent);
    document.addEventListener('keydown', keydownEvent);

    return () => {
      document.removeEventListener('click', clickEvent);
      document.removeEventListener('keydown', keydownEvent);
    };
  }, []);

  const sort = useSelector((state: RootState) => state.filter.sort);

  const dispatch = useDispatch();

  const selectSortType = (obj: SortItem) => {
    dispatch(setSort(obj));
    setSortPopUpVisibility(false);
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setSortPopUpVisibility(!sortPopUpVisibility)}>{sort.name}</span>
      </div>
      {sortPopUpVisibility && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((obj) => (
              <li
                className={sort.value === obj.value ? 'active' : ''}
                onClick={() => selectSortType(obj)}
                key={obj.name}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {sort.value !== 'title' && (
        <div className="sort__checkbox">
          <b>По возрастанию</b>
          <input type="checkbox" onChange={() => dispatch(setIsAsc())} />
        </div>
      )}
    </div>
  );
};

export default Sort;
