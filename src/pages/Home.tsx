import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import SortComponent from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlockSkeleton';
import Pagination from '../components/Pagination';

import { Sort, sortTypes } from '../store/slices/filterSlice';
import { setFilter } from '../store/slices/filterSlice';
import { fetchItems, Item, paginationCount } from '../store/slices/pizzaSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const { categoryId, sort, isAsc, activePage } = useSelector((state: RootState) => state.filter);

  const { items, status } = useSelector((state: RootState) => state.pizza);

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

      if (params && sort) {
        dispatch(
          setFilter({
            categoryId: String(params.category),
            sort,
            activePage: String(params.page),
          }),
        );
      }

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

  const content = items.map((obj: Item) => <PizzaBlock {...obj} key={obj.id} />);
  const skeleton = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <SortComponent />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      {status === 'error' ? (
        <div className="content__error">
          <h2>?????????????????? ???????????? ????</h2>
          <p>???? ?????????????? ???????????????? ?????????? ???? ??????????????. ?????????????????? ?????????????? ??????????...</p>
        </div>
      ) : items.length === 0 && status !== 'loading' ? (
        <div className="content__items__not_found">
          <h2>???????????? ???? ?????????????? :(</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : content}</div>
      )}
      {paginationCount > 1 && <Pagination paginationCount={paginationCount} />}
    </>
  );
};

export default Home;
