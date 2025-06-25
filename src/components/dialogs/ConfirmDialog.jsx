import styles from "./ConfirmDialog.module.css";

const ConfirmDialog = ({ message, onConfirm, onClose }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirm}>
            Yes
          </button>
          <button onClick={onClose} className={styles.cancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
