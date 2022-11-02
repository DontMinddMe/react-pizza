import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDescription = () => {
  const [item, setItem] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get('https://6349481b0b382d796c8241e2.mockapi.io/items/' + id);
        setItem(data);
      } catch (error) {
        alert(error);
      }
    }

    fetchItem();
  }, [id]);

  return (
    <div className="container">
      <div className="item__image__wrapper">
        <img src={item.imageUrl} alt="Pizza" />
      </div>

      <h1 className="item__title">{item.title}</h1>

      <div className="item__description__wrapper">
        <p>{item.description}</p>
      </div>

      <div className="item__price__wrapper">
        <h2 className="item__price">от {item.price} ₽</h2>
      </div>

      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default ItemDescription;
