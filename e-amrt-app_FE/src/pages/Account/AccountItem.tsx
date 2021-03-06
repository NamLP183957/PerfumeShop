import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner';
import { AppStateType } from '../../redux/reducers/root-reducer'
import { User } from '../../types/types'

function AccountItem() {
    const usersData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
    const loading: boolean = useSelector((state: AppStateType) => state.user.isLoaded)

    return (
        <>
            {loading ? <Spinner /> :
                <h4 style={{ display: "flex", justifyContent: "center" }}>
                    {`Hello ${usersData.firstName} ${usersData.lastName}!`}
                </h4>
            }
        </>
    )
}

export default AccountItem