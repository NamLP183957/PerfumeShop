import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AppStateType } from '../../redux/reducers/root-reducer'
import { Perfume } from '../../types/types'
import StarRating from '../StarRating/StarRating';
import "./PerfumeCardsSlider.css"
import { fetchPerfumes, fetchPerfumesByIdsQuery } from '../../redux/thunks/perfume-thunks';

function PerfumeCardsSlider() {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);
    const perfumesId: Array<number> = [26, 43, 46, 106, 34, 76, 82, 85, 27, 39, 79, 86];

    console.log("size: ", perfumes.length);
    useEffect(() => {
        dispatch(fetchPerfumesByIdsQuery(perfumesId));
        // dispatch(fetchPerfumes());
    }, [])


    const addCarouselItems = (array: Array<Perfume>, counter: number) => {
        return (
            <Carousel.Item>
                <div className="card-deck">
                    {array.map((perfume: Perfume) => {
                        for (let i = counter; i < counter + 4; i++) {
                            if (perfume.id === perfumesId[i]) {
                                return (
                                    <div className="card" key={perfume.id}>
                                        <div style={{ height: "130px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <img style={{ width: "125px" }} src={perfume.filename} />
                                        </div>
                                        <div className="card-body text-center">
                                            <h5>{perfume.perfumeTitle}</h5>
                                            <h6>{perfume.perfumer}</h6>
                                            <StarRating perfumeRating={perfume.perfumeRating} />
                                            <h6>$<span>{perfume.price}</span>.00</h6>
                                            <Link to={`/product/${perfume.id}`}>
                                                <span className="btn btn-dark">
                                                    SHOW MORE
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </Carousel.Item>
        )
    }

    const settings = { controls: false };

    return (
        <div>
            <div className="container text-center my-3">
                <h3>PERSONALLY RECOMMENDED</h3>
            </div>
            <div className="container mt-5" id="indicators">
                <form method="get" action="/">
                    <Carousel {...settings}>
                        {addCarouselItems(perfumes, 0)}
                        {addCarouselItems(perfumes, 4)}
                        {addCarouselItems(perfumes, 8)}
                    </Carousel>
                </form>
            </div>
        </div>
    )
}

export default PerfumeCardsSlider