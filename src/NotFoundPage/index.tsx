import React from 'react';

import style from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => (
  <div className={style.root}>
    <span>😕</span>
    <h1>Ничего не найдено</h1>
    <p>Данная страница отсутствует</p>
  </div>
);

export default NotFoundPage;
