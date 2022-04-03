import { faCartPlus, faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, RouteComponentProps, useHistory } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import Spinner from '../../components/Spinner/Spinner';
import { AppStateType } from '../../redux/reducers/root-reducer';
import { fetchPerfumeByQuery, fetchPerfumeReviews, getOtherPerfumes } from '../../redux/thunks/perfume-thunks';
import { Perfume, Review, ReviewData, ReviewError } from '../../types/types';
import halfStar from "../../img/star-half.svg";
import ProductReview from './ProductReview';
import SockJS from 'sockjs-client';
import { WEBSOCKET_URL } from '../../utils/constants/uri';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { addReviewToPerfume, resetForm } from '../../redux/thunks/user-thunks';
import OtherProducts from '../../components/OtherProducts/OtherProducts';

let stompClient: CompatClient | null = null;

const Product: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const perfumeId = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const perfume: Partial<Perfume> = useSelector((state: AppStateType) => state.perfume.perfume);
  const reviews: Array<Review> = useSelector((state: AppStateType) => state.perfume.reviews);
  const otherPerfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.otherPerfumes);
  const loading: boolean = useSelector((state: AppStateType) => state.perfume.isPerfumeLoading);
  const errors: Partial<ReviewError> = useSelector((state: AppStateType) => state.user.reviewErrors);
  const isReviewAdded: boolean = useSelector((state: AppStateType) => state.user.isReviewAdded);

  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const { authorError, messageError, ratingError } = errors;

  useEffect(() => {
    dispatch(fetchPerfumeByQuery(match.params.id));
    dispatch(getOtherPerfumes(match.params.id));
    // dispatch(resetForm());
    window.scrollTo(0, 0);
    const socket = new SockJS(WEBSOCKET_URL);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient?.subscribe("/topic/reviews/" + match.params.id, (response: any) => {
          console.log("response data: ", response.body);
          dispatch(fetchPerfumeReviews(JSON.parse(response.body)));
      });
    });

    return () => stompClient?.disconnect();
  }, [perfumeId])

  useEffect(() => {
    setAuthor("");
    setMessage("");
    setRating(0);
  }, [isReviewAdded])
  

  const renderStars = (perfumeRating: number = 5): JSX.Element => {
    return (
      <StarRatingComponent
        renderStarIconHalf={() => <img src={halfStar} alt="halfStar"
          style={{ width: "14.5px", marginBottom: "2px" }} />}
        renderStarIcon={() => <FontAwesomeIcon className="fa-sm" icon={faStar} />}
        name={"star"}
        starCount={5}
        editing={false}
        value={perfumeRating} />
    )
  }

  const addToCart = (): void => {
    const perfumeId: number | undefined = perfume.id;
    let data: string | null = localStorage.getItem("perfumes");
    let cart: Map<number, any> = data ? new Map(JSON.parse(data as string)) : new Map();

    if (cart.has(perfumeId as number)) {
      cart.set(perfumeId as number, cart.get(perfumeId as number) + 1);
    } else {
      cart.set(perfumeId as number, 1);
    }

    localStorage.setItem("perfumes", JSON.stringify(Array.from(cart.entries())));
    history.push("/cart");
  }

  const addReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reviewData: ReviewData = {
      perfumeId: match.params.id, 
      author: author,
      message: message,
      rating: rating
    };
    dispatch(addReviewToPerfume(reviewData));
  }

  return (
    <div className="container mt-5">
      {loading ? <Spinner /> :
        <>
          <ScrollButton />
          <div className="row">
            <div className="col-md-9">
            <div className="row">
            <div className="col-md-5">
              <div>
                <img src={perfume.filename} className="rounded mx-auto w-100" />
              </div>
            </div>
            <div className="col-md-7">
              <h2>{perfume.perfumeTitle}</h2>
              <h3>{perfume.perfumer}</h3>
              <p>Product code: <span>{perfume.id}</span></p>
              <div className="row">
                <div className="col-md-2">
                  {renderStars(perfume.perfumeRating === 0 ? 5 : perfume.perfumeRating)}
                </div>
                <div className="col-md-10">
                  <span style={{ paddingBottom: "50px" }}>{perfume.reviews?.length} reviews</span>
                </div>
              </div>
              <p style={{ color: "#54C0A1" }}>In Stock</p>
              <div className="row ml-1">
                <h6 className="mr-5"><span>${perfume.price}</span>.00</h6>
                <button type="submit"
                  className="btn btn-success mx-3"
                onClick={addToCart}
                >
                  <FontAwesomeIcon className="mr-2 fa-lg" icon={faCartPlus} /> ADD TO CART
                </button>
              </div>
              <br />
              <table className="table">
                <tbody>
                  <tr>
                    <td>Perfume title:</td>
                    <td>{perfume.perfumeTitle}</td>
                  </tr>
                  <tr>
                    <td>Brand:</td>
                    <td>{perfume.perfumer}</td>
                  </tr>
                  <tr>
                    <td>Perfume type:</td>
                    <td>{perfume.type}</td>
                  </tr>
                  <tr>
                    <td>Release year:</td>
                    <td>{perfume.year}</td>
                  </tr>
                  <tr>
                    <td>Volume:</td>
                    <td><span>{perfume.volume}</span> ml.</td>
                  </tr>
                  <tr>
                    <td>Manufacturer country:</td>
                    <td>{perfume.country}</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>{perfume.perfumeGender}</td>
                  </tr>
                  <tr>
                    <td>Top notes:</td>
                    <td>{perfume.fragranceTopNotes}</td>
                  </tr>
                  <tr>
                    <td>Heart notes:</td>
                    <td>{perfume.fragranceMiddleNotes}</td>
                  </tr>
                  <tr>
                    <td>Base notes:</td>
                    <td>{perfume.fragranceBaseNotes}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            
          </div>

          <div className="mt-5">
            <h3 className="text-center mb-5">REVIEWS</h3>
            <Route exact component={() => <ProductReview data={reviews} itemsPerPage={5}/>}/>
            {/* <ProductReview data={reviews} itemsPerPage={5}/> */}
            <form onSubmit={addReview}>
              <div className="form-group border mt-5">
                <div className="mx-3 my-3">
                  <div className="row">
                    <div className="col-md-4">
                      <label><span className="text-danger"><b>*</b></span> Your name</label>
                      <input
                        type="text"
                        name='author'
                        className={authorError ? 'form-control is-invalid' : 'form-control'}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                      <div className="invalid-feedback">{authorError}</div>
                    </div>
                    <div className="col-md-8">
                      <label><span className="text-danger"><b>*</b></span> Your message</label>
                      <textarea 
                        name='message'
                        className={messageError ? 'form-control is-invalid' : 'form-control'}
                        cols={30} 
                        rows={3} 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="invalid-feedback">{messageError}</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <label><span className="text-danger"><b>*</b></span> Your mark</label>
                      <div>
                      <StarRatingComponent
                        name="star"
                        starCount={5}
                        value={rating} 
                        onStarClick={(value) => setRating(value)}
                        renderStarIcon={() => <FontAwesomeIcon className="fa-sm"  icon={faStar} />} 
                      />
                      <div>{rating + " / 5 points" }</div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <button type='submit' className="btn btn-dark mt-3">
                        <FontAwesomeIcon className="mr-2" icon={faPaperPlane}/>Post a review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
            </div>
            <div className="col-md-3">
              <h3>Other products</h3>
              <Route exact component={() => <OtherProducts otherPerfumes={otherPerfumes}/>} />
            </div>
          </div>
          
        </>
      }
    </div>
  )
}

export default Product