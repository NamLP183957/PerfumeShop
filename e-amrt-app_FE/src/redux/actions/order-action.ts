import { Order, OrderError } from '../../types/types'
import * as OrderType from '../action-types/order-action-types'

export const OrderAddedSuccess = (order: Order): OrderType.OrderAddedSuccessActionType => ({
    type: OrderType.ORDER_ADDED_SUCCESS,
    payload: order
})

export const OrderAddedFailure = (orderError: OrderError): OrderType.OrderAddedFailureActionType => ({
    type: OrderType.ORDER_ADDED_FAILURE,
    payload: orderError
})

export const ShowLoader = (): OrderType.ShowLoaderActionType => ({
    type: OrderType.SHOW_LOADER
})
