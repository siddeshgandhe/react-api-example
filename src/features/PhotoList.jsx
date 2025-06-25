import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PhotoListItem from "../components/PhotoListItem";
import styles from "./PhotoList.module.css";
import { fetchPhotos } from "../actions/PhotoActions";
import { setPage } from "../reducers/PhotoSlice";

const PhotoList = () => {
  const { loading, photos, error, currentPage } = useSelector(
    (state) => state.photos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos(currentPage));
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    dispatch(setPage(currentPage + 1));
  };

  if (error) return <p>error</p>;

  return (
    <div className={styles.container}>
      <h2>Photo Gallery (Page {currentPage})</h2>
      {loading && <p>Loading...</p>}
      <ul className={styles.photoList}>
        {photos.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PhotoList;
