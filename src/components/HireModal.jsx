export default function HireModal({ isOpen, message, onContinue, onClose }) {
  return (
    <div
      className="hirebg"
      style={{ display: isOpen ? "flex" : "none", opacity: isOpen ? 1 : 0 }}
      aria-hidden={!isOpen}
    >
      <div className="hirebox" role="dialog" aria-modal="true" aria-label="Hire Sakshi Kumari">
        <h2 className="hiretext">{message}</h2>
        <div className="hirebuttons">
          <button className="hire" type="button" onClick={onContinue}>
            Continue
          </button>
          <button className="goback" type="button" onClick={onClose}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
