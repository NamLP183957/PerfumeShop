import { type } from 'os'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { perfumer } from '../../pages/Menu/MenuData'
import { AppStateType } from '../../redux/reducers/root-reducer'
import { getOtherPerfumes } from '../../redux/thunks/perfume-thunks'
import { Perfume } from '../../types/types'
import PerfumeCardItem from '../PerfumeCardItem/PerfumeCardItem'

type PropsType = {
    otherPerfumes: Array<Perfume>
}

const OtherProducts: FC<PropsType> = ({ otherPerfumes }) => {
    return (
        <div className='container-fluid'>
            {
                otherPerfumes.map((perfume: Perfume, index: number) => (
                    <div className='pt-2' key={perfume.id}>
                        <div style={{ height: "130px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img style={{ width: "125px" }} src={perfume.filename} />
                        </div>
                        <div className="card-body text-center">
                            <h5>{perfume.perfumeTitle}</h5>
                            <h6>{perfume.perfumer}</h6>
                            {/* <StarRating perfumeRating={perfume.perfumeRating} /> */}
                            <h6>$<span>{perfume.price}</span>.00</h6>
                            <Link to={`/product/${perfume.id}`}>
                                <span className="btn btn-dark">
                                    SHOW MORE
                                </span>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default OtherProducts