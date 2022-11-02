import React from 'react';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortTypes } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlockSkeleton';
import Pagination from '../components/Pagination';

import { setFilter } from '../store/slices/filterSlice';
import { fetchItems } from '../store/slices/pizzaSlice';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const paginationCount = 3; // Если бы mockapi.io умел передавать количество доступных страниц, то я бы их вставил сюда ))))

  const searchValue = useSelector((state) => state.search.searchValue);
  const { categoryId, sort, isAsc, activePage } = useSelector((state) => state.filter);

  const { items, status } = useSelector((state) => state.pizza);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.value,
        category: categoryId,
        page: activePage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, activePage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortTypes.find((obj) => obj.value === params.sortBy);

      dispatch(
        setFilter({
          categoryId: params.category,
          sort,
          activePage: params.page,
        }),
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    const loadItems = async () => {
      if (!isSearch.current) {
        const category = categoryId === 0 ? '' : `&category=${categoryId}`;
        const order = isAsc ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
          fetchItems({
            sort,
            category,
            order,
            search,
            activePage,
          }),
        );

        window.scrollTo(0, 0);
      }
      isSearch.current = false;
    };

    loadItems();
  }, [categoryId, sort, isAsc, searchValue, activePage, dispatch]);

  const content = items.map((obj) => (
    <Link to={`item/${obj.id}`} key={obj.id}>
      {' '}
      <PizzaBlock {...obj} />{' '}
    </Link>
  ));
  const skeleton = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить ответ от сервера. Повторите попытку позже...</p>
        </div>
      ) : items.length === 0 && status !== 'loading' ? (
        <div className="content__items__not_found">
          <h2>Ничего не найдено :(</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : content}</div>
      )}
      {paginationCount > 1 && items.length > 0 && <Pagination paginationCount={paginationCount} />}
    </>
  );
};

export default Home;
