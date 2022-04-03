import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Order } from '../../types/types'
import Spinner from '../Spinner/Spinner'

type PropsType = {
    loading: boolean,
    orders: Array<Order>
}

const OrderTable: FC<PropsType> = ({loading, orders}) => {

    
    return (
        <>
            {loading ? <Spinner /> : 
              <>
                {orders.length === 0 ?
                    <div className='text-center'>No orders</div> :
                    <div>
                        <h5 className="text-center">Orders</h5>
                        <table className="table border text-center">
                            <thead className="table-active">
                                <tr>
                                    <td>Order id</td>
                                    <td>Date</td>
                                    <th>City</th>
                                    <th>Address</th>
                                    <th>Post index</th>
                                    <th>Order Summary</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: Order) => (
                                    <tr>
                                        <th>{order.id}</th>
                                        <th>{order.date}</th>
                                        <th>{order.city}</th>
                                        <th>{order.address}</th>
                                        <th>{order.postIndex}</th>
                                        <th>{order.totalPrice}.0 $</th>
                                        <th>
                                                <Link to={{
                                                    // pathname: `/account/user/orders/${order.id}`,
                                                    state: order
                                                }}>
                                                    Show more
                                                </Link>
                                            </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </>
            }

        </>
    )
}

export default OrderTable