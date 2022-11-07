import React from 'react';
import { Link } from 'react-router-dom';

import { addItem, updateCount } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

type PizzaBlockProps = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  category,
  id,
  imageUrl,
  price,
  rating,
  sizes,
  title,
  types,
}) => {
  const [activeCaSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const item = useSelector((state: any) =>
    state.cart.items.find((obj: PizzaBlockProps) => obj.id === id),
  ); /////////////////////////////////////////////////////////////////// Временный фикс
  const count = item ? item.count : 0;

  const dispatch = useDispatch();

  const onClickAdd = () => {
    dispatch(
      addItem({
        id,
        imageUrl,
        price,
        title,
      }),
    );
    dispatch(updateCount());
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`item/${id}`} key={id}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
          <div className="pizza-block__selector">
            <ul>
              {types.map((type, index) => (
                <li
                  onClick={() => setActiveType(index)}
                  className={activeType === index ? 'active' : ''}
                  key={type}
                >
                  {type === 0 ? 'тонкое' : 'традиционное'}
                </li>
              ))}
            </ul>
            <ul>
              {sizes.map((size, index) => (
                <li
                  onClick={() => setActiveSize(index)}
                  className={activeCaSize === index ? 'active' : ''}
                  key={size}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
        </Link>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;