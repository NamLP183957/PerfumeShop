import React, { FC, useState } from 'react'
import { Perfume } from '../../../types/types'
import usePagination from "../../../components/Pagination/usePagination"
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/reducers/root-reducer'
import Spinner from '../../../components/Spinner/Spinner'
import PaginationItem from '../../../components/Pagination/Pagination'
import {LazyLoadImage} from "react-lazy-load-image-component";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../../components/Modal/Modal'
import { deletePerfume } from '../../../redux/thunks/admin-thunks'
type PropsType = {
    data: Array<Perfume>
    itemsPerPage: number
    startFrom?: number
    searchByData: Array<{label: string, value: string}>
}

const PerfumeListComponent: FC<PropsType> = ({data, itemsPerPage, startFrom, searchByData}) => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state: AppStateType) => state.perfume.isPerfumeLoading);
    const [modalActive, setModalActive] = useState(false);
    const [perfumeInfo, setPerfumeInfo] = useState<Perfume>();

    const {
        slicedData,
        pagination,
        prevPage,
        nextPage,
        changePage,
        setFilteredData,
        setSearching
    } = usePagination({itemsPerPage, data, startFrom});

    const showDeleteModalWindow = (perfume: Perfume) => {
        setModalActive(true);
        setPerfumeInfo(perfume);
    }

    const deletePerfumeHandler = (id?: number): void => {
        dispatch(deletePerfume(perfumeInfo?.id));
    }

    return (
        <div>
            {modalActive && 
                <Modal 
                    perfume={perfumeInfo}
                    setModalActive={setModalActive}
                    deletePerfumeHandler={deletePerfumeHandler}/>}
            <div className="mt-3">
                    <PaginationItem 
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}
                    />
                </div>
            {loading ? <Spinner /> : 
            <>
                <div className="container-fluid mt-3">
                    <div className="row">
                        {slicedData.map((perfume: Perfume) => (
                            <div key={perfume.id} className='col-lg-3'>
                                <div>
                                    <LazyLoadImage
                                        effect='blur'
                                        style={{width: "80px", marginTop: "20px"}}
                                        src={perfume.filename}
                                    />
                                </div>
                                <div className="card-body text-center">
                                            {/* <StarRating perfumeRating={perfume.perfumeRating}/> */}
                                            <h6>{perfume.perfumeTitle}</h6>
                                            <h6>{perfume.perfumer}</h6>
                                            <h6><span>${perfume.price}</span>.00</h6>
                                </div>
                                <div className="btn-group text-center mb-3">
                                    <Link type='button' className='btn btn-dark ml-2'
                                        to={`/account/admin/perfume/${perfume.id}`} >
                                            <FontAwesomeIcon className='fa-xs' icon={faEdit} /> Edit
                                        </Link>
                                    <button className='btn btn-warning ml-2' onClick={() => showDeleteModalWindow(perfume)}>
                                        <FontAwesomeIcon className='fa-xs' icon={faTrash} />Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
            }
        </div>
    )
}

export default PerfumeListComponent