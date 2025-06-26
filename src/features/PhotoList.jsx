import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import PhotoListItem from "../components/PhotoListItem";
import styles from "./PhotoList.module.css";
import { fetchPhotos } from "../actions/PhotoActions";
import { setPage } from "../reducers/PhotoSlice";
import { LIMIT } from "../actions/PhotoActions";
import { persistor } from "../store/store";

const PhotoList = () => {
  const { loading, photos, error, currentPage, totalFetchedPages } =
    useSelector((state) => state.photos);

  const dispatch = useDispatch();

  const start = (currentPage - 1) * LIMIT;
  const end = start + LIMIT;
  const visiblePhotos = photos.slice(start, end);

  useEffect(() => {
    const needsMorePhotos = photos.length < currentPage * LIMIT; // total items < required items for this page

    if (needsMorePhotos && currentPage <= totalFetchedPages + 1) {
      dispatch(fetchPhotos(currentPage));
    }
  }, [currentPage]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      dispatch(setPage(Math.max(1, currentPage - 1)));
    }
  });

  const handleNext = useCallback(() => {
    dispatch(setPage(currentPage + 1));
  });

  const clearStorage = useCallback(() => {
    persistor.purge();
  });

  if (error) return <p>error</p>;

  return (
    <div className={styles.container}>
      <h2>Photo Gallery (Page {currentPage})</h2>
      {loading && <p>Loading...</p>}
      <ul className={styles.photoList}>
        {visiblePhotos.map((photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={handleNext}>Next</button>
        <button onClick={clearStorage}>Reset</button>
      </div>
    </div>
  );
};

export default PhotoList;
