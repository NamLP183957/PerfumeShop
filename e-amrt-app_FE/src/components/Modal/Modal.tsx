import { Props } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Perfume } from '../../types/types'

type PropsType = {
    perfume?: Perfume
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
    deletePerfumeHandler: (id?: number) => void
}

const Modal: FC<PropsType> = ({perfume, setModalActive, deletePerfumeHandler}) => {

    return (
        <>
            <div className='modal-open'>
                <div className="modal fade show" style={{display: 'block'}}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete perfume</h5>
                                <button type='button' className="close" onClick={() => setModalActive(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="row modal-body">
                                <div className="col-md-6 d-flex justify-content-center">
                                    <img src={perfume?.filename} style={{width: '80px', height: '60px'}} />
                                    
                                </div>
                                <div className="col-md-6 text-center">
                                    <p> Are you sure too delete?</p>
                                    <h6>{perfume?.perfumer}</h6>
                                    <h6>{perfume?.perfumeTitle}</h6>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type='button'
                                    className='btn btn-danger'
                                    onClick={() => deletePerfumeHandler(perfume?.id)}> delete
                                </button>
                                <button type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={() => setModalActive(false)}>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal