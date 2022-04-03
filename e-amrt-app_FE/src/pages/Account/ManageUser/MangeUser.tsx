import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom'
import OrderTable from '../../../components/OrderTable/OrderTable';
import Spinner from '../../../components/Spinner/Spinner';
import { AppStateType } from '../../../redux/reducers/root-reducer';
import { fetchOrdersUser, fetchUserInfo } from '../../../redux/thunks/admin-thunks';
import { Order, User } from '../../../types/types';

const MangeUser: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
    const userId = match.params.id;
    const dispatch = useDispatch();
    const userData: Partial<User> = useSelector((state: AppStateType) => state.admin.user);
    const ordersUserData: Array<Order> = useSelector((state: AppStateType) => state.admin.ordersUser);
    const { id, firstName, lastName, email, city, address, phoneNumber, postIndex, provider, roles } = userData;
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);

    useEffect(() => {
        dispatch(fetchUserInfo(userId));
    }, [])

    useEffect(() => {
        dispatch(fetchOrdersUser(email));
    }, [userData])



    return (
        <div className="container">
            {loading ? <Spinner /> :
                <>
                    <h4><FontAwesomeIcon className='mr-2' icon={faEdit} />User: {firstName} {lastName}</h4>
                    <div className="row mt-5 mb-4 border px-3 py-3">
                        <div className="col-md-4">
                            <p className="personal_data_item">User id:
                                <span className="personal_data_text">{id}</span>
                            </p>
                            <p className="personal_data_item">Email:
                                <span className="personal_data_text">{email}</span>
                            </p>
                            <p className="personal_data_item">City:
                                <span className="personal_data_text">{city}</span>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <p className="personal_data_item">Address:
                                <span className="personal_data_text">{address}</span>
                            </p>
                            <p className="personal_data_item">Mobile:
                                <span className="personal_data_text">{phoneNumber}</span>
                            </p>
                            <p className="personal_data_item">Post index:
                                <span className="personal_data_text">{postIndex}</span>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <p className="personal_data_item">Roles:
                                <span className="personal_data_text">{roles}</span>
                            </p>
                            <p className="personal_data_item">Provider:
                                <span className="personal_data_text">{provider}</span>
                            </p>
                        </div>
                    </div>

                    <OrderTable loading={loading} orders={ordersUserData} />
                </>}
        </div>
    )
}

export default MangeUser