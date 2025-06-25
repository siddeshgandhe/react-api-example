import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePhoto, editPhoto } from "../actions/PhotoActions";
import { useState } from "react";
import EditPhotoDialog from "../components/dialogs/EditPhotoDialog";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import styles from "./PhotoDetails.module.css";

const PhotoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const photo = useSelector((state) =>
    state.photos["photos"].find((p) => p.id === parseInt(id))
  );

  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deletePhoto(photo.id));
    navigate("/");
  };

  const handleEdit = (updatedData) => {
    dispatch(editPhoto(updatedData));
    setShowEdit(false);
  };

  return (
    <div className={styles.container}>
      {!photo && <p>Photo not found</p>}
      <h2 className={styles.title}>{photo.title}</h2>
      <img src={photo.url} alt={photo.title} className={styles.image} />
      <div className={styles.actions}>
        <button
          onClick={() => setShowEdit(true)}
          className={`${styles.button} ${styles.edit}`}
        >
          Edit
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className={`${styles.button} ${styles.delete}`}
        >
          Delete
        </button>
      </div>
      {showEdit && (
        <EditPhotoDialog
          photo={photo}
          onClose={() => setShowEdit(false)}
          onSubmit={handleEdit}
        />
      )}
      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this photo?"
          onConfirm={handleDelete}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default PhotoDetails;
