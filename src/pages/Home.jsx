import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlockSkeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [isAsc, setIsAsc] = React.useState(false);
  const [activeSort, setActiveSort] = React.useState({
    name: 'популярности',
    value: 'rating',
  });

  React.useEffect(() => {
    const category = activeCategory === 0 ? '' : activeCategory;
    const order = isAsc ? 'desc' : 'asc';

    setIsLoading(true);
    fetch(
      `https://6349481b0b382d796c8241e2.mockapi.io/items?sortBy=${activeSort.value}&order=${order}&category=${category}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, isAsc]);

  return (
    <>
      <div className="content__top">
        <Categories category={activeCategory} setCategory={(index) => setActiveCategory(index)} />
        <Sort
          sort={activeSort}
          setSort={(index) => setActiveSort(index)}
          isAsc={isAsc}
          setIsAsc={setIsAsc}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </>
  );
};

export default Home;
