import { faAddressBook, faCheckCircle, faShoppingBag, faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { appendFile } from 'fs';
import React, { ChangeEvent, FC, FormEvent, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { AppStateType } from '../../redux/reducers/root-reducer';
import { fetchCart } from '../../redux/thunks/cart-thunks';
import { addOrder } from '../../redux/thunks/order-thunk';
import { fetchUserInfo } from '../../redux/thunks/user-thunks';
import { OrderError, Perfume, User } from '../../types/types';

const Order: FC = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const history = useHistory();
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.cart.perfumes);
    const userData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
    const perfumersFromLocalStorage: Map<number, number> = new Map(JSON.parse(localStorage.getItem("perfumes") as string))
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded);
    const errors: Partial<OrderError> = useSelector((state: AppStateType) => state.order.errors);
    const totalPrice: number = useSelector((state: AppStateType) => state.cart.totalPrice);
    const orderLoading: boolean = useSelector((state: AppStateType) => state.order.loading);
    const [user, setUser] = useState<Partial<User>>(userData);

    const {
        firstName,
        lastName,
        city,
        address,
        postIndex,
        phoneNumber,
        email
    } = user;

    const {
        firstNameError, 
        lastNameError,
        cityError,
        addressError,
        postIndexError,
        phoneNumberError
    } = errors;

    useEffect(() => {
        if (isLoggedIn === "false") {
            localStorage.setItem("prevPage", "/order");
            history.push("/login");
        } else {
            dispatch(fetchCart(Array.from(perfumersFromLocalStorage.keys())));
            dispatch(fetchUserInfo());
        }
    }, [])

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const perfumeId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("perfumes") as string)));
        const order = {firstName, lastName, city, address, postIndex, phoneNumber, email, perfumeId, totalPrice};
        dispatch(addOrder(order, history));
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }
    
    if (loading) {
        return (
            <>
                <Spinner />
            </>
        )
    } else {
        return (
            <div className="container mt-5 pb-5">
                {orderLoading ? <Spinner /> : <div></div>}
                <h4 className="mb-4 text-center">
                    <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/> Ordering
                </h4>
                <br />
                <form onSubmit={onFormSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name:</label>
                                <div className="col-sm-8">
                                    <input 
                                        type="text"
                                        name='firstName'
                                        className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                                        value={firstName}
                                        placeholder={"Enter your first name"}
                                        onChange={handleInputChange} 
                                        />
                                    <div className="invalid-feedback">{firstNameError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Surname:</label>
                                <div className="col-sm-8">
                                    <input 
                                        type="text"
                                        name='lasstName'
                                        className={lastNameError ? 'form-control is-invalid' : 'form-control'}
                                        value={lastName}
                                        placeholder={"Enter your last name"}
                                        onChange={handleInputChange}  
                                        />
                                    <div className="invalid-feedback">{lastNameError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">City:</label>
                                <div className="col-sm-8">
                                    <input 
                                        type="text"
                                        name='city'
                                        className={cityError ? 'form-control is-invalid' : 'form-control'}
                                        value={city}
                                        placeholder={"Enter your city"}
                                        onChange={handleInputChange} 
                                        />
                                    <div className="invalid-feedback">{cityError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Address:</label>
                                <div className="col-sm-8">
                                    <textarea 
                                        rows={3}
                                        name='address'
                                        className={addressError ? 'form-control is-invalid' : 'form-control'}
                                        value={address}
                                        placeholder={"Enter your address"}
                                        onChange={handleInputChange} 
                                        />
                                    <div className="invalid-feedback">{addressError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Post index:</label>
                                <div className="col-sm-8">
                                    <input 
                                        type="text"
                                        name='postIndex'
                                        className={postIndexError ? 'form-control is-invalid' : 'form-control'}
                                        value={postIndex}
                                        placeholder={"Enter your post index"}
                                        onChange={handleInputChange} 
                                        />
                                    <div className="invalid-feedback">{postIndexError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Mobile:</label>
                                <div className="col-sm-8">
                                    <input 
                                        type="text"
                                        name='phoneNumber'
                                        className={phoneNumberError ? 'form-control is-invalid' : 'form-control'}
                                        value={phoneNumber}
                                        placeholder={"Enter your phone number"}
                                        onChange={handleInputChange} 
                                        />
                                    <div className="invalid-feedback">{phoneNumberError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Email:</label>
                                <div className="col-sm-8">
                                    <input 
                                        type="text"
                                        name='email'
                                        className='form-control'
                                        value={email}
                                        disabled
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="container-fluid">
                                <div className="row">
                                    {perfumes.map((perfume: Perfume) => (
                                        <div key={perfume.id} className="col-lg-6 d-flex align-items-stretch">
                                        <div className="card mb-5">
                                            <img src={perfume.filename}
                                                 className="rounded mx-auto w-50"/>
                                            <div className="card-body text-center">
                                                <h5>{perfume.perfumeTitle}</h5>
                                                <h6>{perfume.perfumer}</h6>
                                                <h6><span>Price: $ {perfume.price}</span>.00</h6>
                                                <h6>
                                                    <span>Quantity: {perfumersFromLocalStorage.get(perfume.id)}</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-success px-5 float-right">
                                <FontAwesomeIcon icon={faCheckCircle}/> Validate order
                            </button>
                            <div className="row">
                                <h4>To pay : $ <span>{totalPrice}</span>.00</h4>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    
    
}

export default Order