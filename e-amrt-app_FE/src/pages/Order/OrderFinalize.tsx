import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { AppStateType } from '../../redux/reducers/root-reducer'
import { clearCart } from '../../redux/thunks/cart-thunks'
import { Order } from '../../types/types'

function OrderFinalize() {
    const order: Partial<Order> = useSelector((state: AppStateType) => state.order.order);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(clearCart());
    }, [])
    

    return (
        <div className="container text-center mt-5">
            <h2>Thank you for the order!</h2>
            <p>Your order number is: <span>{order.id}</span></p>
        </div>
    )
}

export default OrderFinalize