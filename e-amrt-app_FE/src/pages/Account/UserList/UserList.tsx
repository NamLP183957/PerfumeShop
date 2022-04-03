import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import { AppStateType } from '../../../redux/reducers/root-reducer';
import { fetchAllUser } from '../../../redux/thunks/admin-thunks';
import { User } from '../../../types/types';

function UserList() {
    const dispatch = useDispatch();
    const usersData: Array<Partial<User>> = useSelector((state: AppStateType) => state.admin.users);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);
    useEffect(() => {
        dispatch(fetchAllUser());
    }, [])
    
    return (
        <div className='container'>
            {loading ? <Spinner /> : 
            <>
                <table className="table mt-4 border text-center">
                    <thead className='table-active'>
                        <tr>
                            <th>Id</th>
                            <th>Firstname</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Provider</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usersData.map((user: Partial<User>) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td>{user.roles}</td>
                                <td>{user.provider}</td>
                                <td>
                                    <Link to={`/account/admin/users/${user.id}`}>SHOW MORE</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>}
        </div>
    )
}

export default UserList