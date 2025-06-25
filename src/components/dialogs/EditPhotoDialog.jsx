import { useEffect, useState } from "react";
import styles from "./EditPhotoDialog.module.css";

const EditPhotoDialog = ({ photo, onClose, onSubmit }) => {
  const [title, setTitle] = useState(photo.title);
  const [albumId, setAlbumId] = useState(photo.albumId || "");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: photo.id, title, albumId });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Edit Photo</h3>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Album:</label>
          <select
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            required
          >
            <option value="">-- Select Album --</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>

          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPhotoDialog;
