import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((value, index) => (
          <li
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
