import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlockSkeleton';
import Pagination from '../components/Pagination';

import { useSelector } from 'react-redux';

const Home = () => {
  const searchValue = useSelector((state) => state.search.searchValue);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const activeCategory = useSelector((state) => state.filter.categoryId);

  const [activePage, setActivePage] = React.useState(1);

  const activeSort = useSelector((state) => state.filter.sort);
  const isAsc = useSelector((state) => state.filter.isAsc);

  React.useEffect(() => {
    const category = activeCategory === 0 ? '' : `&category=${activeCategory}`;
    const order = isAsc ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    fetch(
      `https://6349481b0b382d796c8241e2.mockapi.io/items?page=${activePage}&limit=4&sortBy=${
        activeSort.value
      }&order=${activeSort.value === 'title' ? 'asc' : order}${category}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, isAsc, searchValue, activePage]);

  const paginationCount = 3; // Если бы mockapi.io умел передавать количество доступных страниц, то я бы их вставил сюда ))))

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
        {items.length === 0 && !isLoading && (
          <div className="content__items__not_found">
            <b>Ничего не найдено :(</b>
          </div>
        )}
      </div>
      {paginationCount > 1 && items.length > 0 && (
        <Pagination paginationCount={paginationCount} setActivePage={setActivePage} />
      )}
    </>
  );
};

export default Home;
