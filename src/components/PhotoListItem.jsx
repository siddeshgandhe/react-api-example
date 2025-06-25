import styles from "./PhotoListItem.module.css";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import EditPhotoDialog from "./dialogs/EditPhotoDialog";
import { useState } from "react";
import { deletePhoto, editPhoto } from "../actions/PhotoActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PhotoListItem = ({ photo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => {
    dispatch(deletePhoto(photo.id));
    setShowConfirm(false);
  };

  const handleEdit = (updatedPhoto) => {
    dispatch(editPhoto(updatedPhoto));
    setShowEdit(false);
  };

  const handleItemClick = () => {
    navigate(`/photos/${photo.id}`);
  };

  return (
    <li className={styles.item} onClick={handleItemClick}>
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        className={styles.thumbnail}
      />
      <div className={styles.details}>
        <p className={styles.title}>{photo.title}</p>
        <div
          className={styles.actions}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span
            onClick={() => {
              setShowEdit(true);
            }}
            className={styles.action}
          >
            Edit
          </span>
          <span
            onClick={() => {
              setShowConfirm(true);
            }}
            className={styles.action}
          >
            Delete
          </span>
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this photo?"
            onConfirm={handleDelete}
            onClose={() => {
              setShowConfirm(false);
            }}
          />
        )}

        {showEdit && (
          <EditPhotoDialog
            photo={photo}
            onClose={() => {
              setShowEdit(false);
            }}
            onSubmit={handleEdit}
          />
        )}
      </div>
    </li>
  );
};

export default PhotoListItem;
