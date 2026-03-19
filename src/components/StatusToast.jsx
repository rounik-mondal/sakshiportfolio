export default function StatusToast({ message, visible, onClose }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="status-toast" role="status" aria-live="polite">
      <p>{message}</p>
      <button type="button" onClick={onClose} aria-label="Dismiss update">
        Close
      </button>
    </div>
  );
}
