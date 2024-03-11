import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./NewsCard.css";
import { removeFromFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";
import Alert from "react-bootstrap/Alert";

function NewsCard(props) {
  const { favoritesDispatch } = useContext(FavoritesContext);
  const { newsId, imgSrc, title, description, hasCloseButton } = props;

  function handleRemoveFromFavorites(id) {
    const actionResult = removeFromFavorites(id);
    favoritesDispatch(actionResult);
  }

  function favoriteNotification() {
    return (
      <Alert key="danger" variant="danger">
        Stirea {title} a fost adaugat cu succes in sectiunea de favorite.
      </Alert>
    );
  }

  return (
    <Card className="NewsCard h-100 d-flex flex-column justify-content-between align-items-center">
      <Link to={`/news/${encodeURIComponent(newsId)}`}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Link>
      {hasCloseButton && (
        <Button
          variant="light"
          onClick={() => {
            handleRemoveFromFavorites(newsId);
            favoriteNotification();
          }}
        >
          <span className="material-icons text-dark">close</span>
        </Button>
      )}
    </Card>
  );
}

export default NewsCard;
