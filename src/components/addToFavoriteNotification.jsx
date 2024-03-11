import "./addToFavoriteNotification.css";
import Alert from "react-bootstrap/Alert";

export function AddToFavoriteNotification({
  newsTitle,
  visibilityState,
  verifyIfIsInListValue,
}) {
  if (visibilityState) {
    if (verifyIfIsInListValue) {
      return (
        <Alert variant="danger" className="favoriteNotification">
          <p>Stirea "{newsTitle}" exista la favorite.</p>
        </Alert>
      );
    } else {
      return (
        <Alert variant="danger" className="favoriteNotification">
          <p>Stirea "{newsTitle}" a fost adaugata la favorite.</p>
        </Alert>
      );
    }
  }
}
