import React from "react";
import { fetcherPhotos } from "../../redux/photos/photos";
import { useDispatch, useSelector } from "react-redux";

import styles from "./content.module.css";
import ListPhoto from "../../Components/ListPhoto/ListPhoto";
import Loading from "../../helper/Loading";
import Login from "../formLogin/Login";

function Content() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  React.useEffect(() => {
    if (state.reducerLogin.user.data)
      dispatch(fetcherPhotos(state.reducerPhotoPage.fetchPhoto.page));
  }, [state.reducerLogin.user.data]);

  const handleFetchPhoto = async () => {
    if (state.reducerLogin.user.data)
      dispatch(fetcherPhotos(state.reducerPhotoPage.fetchPhoto.page));
    // dispatch(fetcherPhotos(state.reducerPhotoPage.fetchPhoto.page));
  };
  if (!state.reducerLogin.user.data) return <Login />;
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
