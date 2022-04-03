import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import Pagination from '../../components/Pagination/Pagination'
import usePagination from '../../components/Pagination/usePagination'
import { Review } from '../../types/types'

type PropsType = {
    data: Array<Review>
    itemsPerPage: number
    startFrom?: number
}

const ProductReview: FC<PropsType> = ({data, itemsPerPage, startFrom}) => {
    const {
        slicedData,
        pagination,
        prevPage,
        nextPage,
        changePage
     } = usePagination({itemsPerPage, data, startFrom});
     console.log("size data: ", data.length)
    return (
        <div className="container">
            <div className='row mt-3 ml-2'>
                <div className="container-fluid">
                    {data.length < 5 ? null : 
                        <Pagination 
                            pagination={pagination}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            changePage={changePage}
                        />
                    }
                    {slicedData.length === 0 ? <p className='text-center'>There are no reviews for this perfume</p> :
                        slicedData.map((review: Review) => {
                            return (
                                <div key={review.id}>
                                    <div className="form row mt-5">
                                        <div className="col-md-3">
                                            <p><b>{review.author}</b></p>
                                            <p>{review.date}</p>
                                            <StarRatingComponent
                                                name="star"
                                                value={review.rating}
                                                renderStarIcon={() => <FontAwesomeIcon className="fa-sm" icon={faStar}/>}
                                                starCount={5}
                                                editing={false}/>
                                        </div>
                                        <div className="col-md-9">
                                            <p>{review.message}</p>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductReview