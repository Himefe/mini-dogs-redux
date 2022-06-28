import React from "react";
import { fetcherPhotos, incrementaPage } from "../../redux/photos/photos";
import { useDispatch, useSelector } from "react-redux";

import styles from "./content.module.css";
import ListPhoto from "../../Components/ListPhoto/ListPhoto";
import Loading from "../../helper/Loading";

function Content() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(fetcherPhotos(state.reducerPhotoPage.fetchPhoto.page));
  }, []);

  const handleFetchPhoto = async () => {
    dispatch(incrementaPage());
    dispatch(fetcherPhotos(state.reducerPhotoPage.fetchPhoto.page + 1));
  };

  return (
    <section className={styles.sectionContent}>
      <div className={styles.container}>
        <ul>
          {state.reducerPhotoPage.fetchPhoto.photos
            ? state.reducerPhotoPage.fetchPhoto.photos.map((item) => (
                <ListPhoto item={item} key={item.id} />
              ))
            : null}
        </ul>
        {state.reducerPhotoPage.fetchPhoto.loading ? <Loading /> : null}
        {state.reducerPhotoPage.fetchPhoto.infinite ? (
          <div className={styles.buttonArea}>
            <button onClick={() => handleFetchPhoto()}>+</button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Content;
