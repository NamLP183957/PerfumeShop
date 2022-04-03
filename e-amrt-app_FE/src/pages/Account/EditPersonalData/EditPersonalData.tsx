import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EventEmitter } from 'stream';
import { AppStateType } from '../../../redux/reducers/root-reducer'
import { updateUserInfo } from '../../../redux/thunks/user-thunks';
import { User, UserEditError } from '../../../types/types'

function EditPersonalData() {
    const dispatch = useDispatch();
    const userData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
    const [user, setUser] = useState<Partial<User>>(userData);
    const errors: Partial<UserEditError> = useSelector((state: AppStateType) => state.user.userEditErrors);
    const {id, firstName, lastName, city, phoneNumber, postIndex, address} = user;
    const {firstNameError, lastNameError} = errors;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userEdit = {id, firstName, lastName, city, phoneNumber, postIndex, address};
        console.log("user submit: ", userEdit);
        dispatch(updateUserInfo(userEdit));
    }

    return (
        <div className='container-fluid'>
            <form className='edit_personal_data' onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">First name:</label>
                    <div className="col-sm-6">
                        <input 
                            type="text"
                            className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                            name='firstName'
                            value={firstName} 
                            onChange={handleInputChange}
                            />
                        <div className="invalid-feedback">{firstNameError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Last name:</label>
                    <div className="col-sm-6">
                        <input 
                            type="text"
                            className={lastNameError ? 'form-control is-invalid' : 'form-control'}
                            name='lastName'
                            value={lastName} 
                            onChange={handleInputChange}
                            />
                        <div className="invalid-feedback">{lastNameError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">City:</label>
                    <div className="col-sm-6">
                        <input 
                            type="text"
                            className='form-control'
                            name='city'
                            value={city} 
                            onChange={handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Address:</label>
                    <div className="col-sm-6">
                        <input 
                            type="text"
                            className='form-control'
                            name='address'
                            value={address} 
                            onChange={handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Phone number:</label>
                    <div className="col-sm-6">
                        <input 
                            type="text"
                            className='form-control'
                            name='phoneNumber'
                            value={phoneNumber} 
                            onChange={handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Post index:</label>
                    <div className="col-sm-6">
                        <input 
                            type="text"
                            className='form-control'
                            name='postIndex'
                            value={postIndex} 
                            onChange={handleInputChange}
                            />
                    </div>
                </div>
                
                <button type="submit" className="btn btn-dark">
                    <FontAwesomeIcon className="mr-2" icon={faCheck}/>Save
                </button>
            </form>
        </div>
    )
}

export default EditPersonalData