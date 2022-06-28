import React from "react";

import styles from "../../pages/content/content.module.css";

const ListPhoto = ({ item }) => {
  return (
    <li className="lefToRight" key={item.id}>
      <div className={styles.fotoArea}>
        <img src={item.src} alt={item.title} />
      </div>
      <div className={styles.acessoArea}>
        <b>{item.title}</b>
        <p>{item.acessos}</p>
      </div>
    </li>
  );
};

export default ListPhoto;
