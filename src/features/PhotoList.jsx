import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PhotoListItem from "../components/PhotoListItem";
import styles from "./PhotoList.module.css";
import { fetchPhotos } from "../actions/PhotoActions";

const PhotoList = () => {
  const { loading, photos, error } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (photos.length === 0) dispatch(fetchPhotos());
  }, [dispatch, photos]);

  return (
    <div className={styles.container}>
      <h2>Photo Gallery</h2>
      {loading && <p>Loading...</p>}
      {error && <p>error</p>}
      <ul className={styles.photoList}>
        {photos.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
