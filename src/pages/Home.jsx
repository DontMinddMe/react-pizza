import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlockSkeleton';
import Pagination from '../components/Pagination';

import { useSelector } from 'react-redux';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [activePage, setActivePage] = React.useState(1);

  const paginationCount = 3; // Если бы mockapi.io умел передавать количество доступных страниц, то я бы их вставил сюда ))))

  const searchValue = useSelector((state) => state.search.searchValue);
  const { categoryId, sort, isAsc } = useSelector((state) => state.filter);

  React.useEffect(() => {
    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const order = isAsc ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    axios
      .get(
        `https://6349481b0b382d796c8241e2.mockapi.io/items?page=${activePage}&limit=4&sortBy=${
          sort.value
        }&order=${sort.value === 'title' ? 'asc' : order}${category}${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, isAsc, searchValue, activePage]);

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
