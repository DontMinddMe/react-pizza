import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../store/slices/filterSlice';

const Categories: React.FC = () => {
  const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const categoryId = useSelector((state: any) => state.filter.categoryId); //////////////////////////////////////////// Временный фикс
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((value, index) => (
          <li
            onClick={() => dispatch(setCategory(index))}
            className={categoryId === index ? 'active' : ''}
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
