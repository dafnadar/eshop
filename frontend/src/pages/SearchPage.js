import React, { Fragment, useState } from "react";
import {
  useEffect,
  useNavigate,
  useLocation,
  useReducer,
  getError,
  axios,
  Title,
  Row,
  Col,
  Link,
  Rating,
  Loading,
  MessageBox,
  Button,
  Product,
  LinkContainer,
} from "../Imports";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../Actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
        pages: payload.ages,
        page: payload.page,
        countProducts: payload.countProducts,
      };
    case GET_FAIL:
      return { ...state, loading: true, error: payload };
    default:
      return state;
  }
};

const prices = [
  { name: "$1 to $50", value: "1-50" },
  { name: "$51 to $200", value: "51-200" },
  { name: "$201 to $1000", value: "201-1000" },
];

export const ratings = [
  { name: "4stars & up", rating: 4 },
  { name: "3stars & up", rating: 3 },
  { name: "2stars & up", rating: 2 },
  { name: "1stars & up", rating: 1 },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [categories, setCategories] = useState();

  const category = searchParams.get("category" || "all");
  const query = searchParams.get("query" || "all");
  const price = searchParams.get("price" || "all");
  const rating = searchParams.get("rating" || "all");
  const order = searchParams.get("order" || "newest");
  const page = searchParams.get("page" || 1);

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, { loading: true, error: "" });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`/api/v1/products/categories`);
        setCategories(data);
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
      }
    };

    getCategories();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    const link = `${
      skipPathname ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    return link;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: GET_REQUEST });
        const { data } = await axios.get(
          `/api/v1/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
      }
    };

    getData();
  }, [category, query, price, rating, order, page, navigate]);

  return (
    <div>
      <Title title="Search Products" />
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={category === "all" ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  to={getFilterUrl({ price: "all" })}
                  className={price === "all" ? "text-bold" : ""}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p}>
                  <Link
                    className={p === price ? "text-bold" : ""}
                    to={getFilterUrl({ price: p })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Reviews</h3>
            <ul>
              {rating.map((r) => (
                <li key={r.name}>
                  <Link
                    className={`${r.rating}` === `${rating}` ? "text-bold" : ""}
                    to={getFilterUrl({ rating: r.rating })}
                  >
                    <Rating caption={" "} rating={r.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Fragment>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating + " & up"}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: "/search",
                      search: getFilterUrl({ page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </Fragment>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
