import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { getNewsDetails } from "../api/adaptors";
import Button from "react-bootstrap/Button";
import "./NewsDetails.css";
import "../components/addToFavoriteNotification.css";
import { getFormattedDate } from "../utils/date";
import { addToFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";
import { AddToFavoriteNotification } from "../components/addToFavoriteNotification";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

function NewsDetails() {
  const { favoritesDispatch, favoritesState } = useContext(FavoritesContext);
  const { products } = favoritesState;

  let { newsId } = useParams();

  newsId = decodeURIComponent(newsId);

  const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);

  const newsDetails = useFetch(newsDetailsEndpoint);

  const adaptedNewsDetails = getNewsDetails(newsDetails);

  const { title, description, image, date, author, content, thumbnail } =
    adaptedNewsDetails;

  const formattedDate = getFormattedDate(date);
  const [titleAddedToFavoriteValue, setTitleAddedToFavoriteValue] =
    useState("");
  const [visibilityState, setVisibilityState] = useState(false);
  const [verifyIfIsInListValue, setVerifyIfIsInListValue] = useState(false);

  // eslint-disable-next-line
  const [_, setLocalStorageState] = useLocalStorage(
    "favorites",
    favoritesState
  );

  useEffect(() => {
    setLocalStorageState(favoritesState);
  }, [favoritesState, setLocalStorageState]);

  function handleAddToFavorites(product) {
    setTitleAddedToFavoriteValue(product.title);

    let isInList = products.some(
      (product) => titleAddedToFavoriteValue === product.title
    );

    if (isInList) {
      setVerifyIfIsInListValue(true);
    }
    const actionResult = addToFavorites(product);

    favoritesDispatch(actionResult);
  }

  return (
    <Layout>
      <AddToFavoriteNotification
        newsTitle={titleAddedToFavoriteValue}
        setVisibilityState={setVisibilityState}
        visibilityState={visibilityState}
        verifyIfIsInListValue={verifyIfIsInListValue}
      />
      <Container className="NewsDetails my-5">
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>
            <div
              dangerouslySetInnerHTML={{ __html: image }}
              className="mb-4"
            ></div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              <Button
                onClick={() => {
                  handleAddToFavorites({
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  });

                  setVisibilityState(true);
                  setTimeout(() => {
                    setVisibilityState(false);
                  }, 2000);
                }}
              >
                Adaugă la favorite
              </Button>
            </div>

            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default NewsDetails;
