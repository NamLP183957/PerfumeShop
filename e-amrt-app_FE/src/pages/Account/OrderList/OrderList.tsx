import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/reducers/root-reducer';

function OrderList() {
    const dispatch = useDispatch();
    const adminOrders: Array<Order> = useSelector((state: AppStateType) => state.admin.orders)
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);

    useEffect(() => {
        dispatch()
    }, [])
    
    

    return (
        <div>
            Order list
        </div>
    )
}

export default OrderList