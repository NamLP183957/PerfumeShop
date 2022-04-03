import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { fetchUserInfo } from '../../redux/thunks/user-thunks'
import "./Account.css"
import AccountItem from './AccountItem'
import AddPerfume from './AddPerfume/AddPerfume'
import EditPerfume from './EditPerfume/EditPerfume'
import MangeUser from './ManageUser/MangeUser'
import PerfumeList from './PerfumeList/PerfumeList'
import PersonalData from './PersonalData/PersonalData'
import UserList from './UserList/UserList'
function Account() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchUserInfo());
    }, [])
    
    return (
        <div className="account-container container">
            <div className="row mt-5">
                <div className="col-md-2">
                    <h4><FontAwesomeIcon className="mr-2" icon={faUser}/>My Account</h4>
                    <NavLink to={"/account/user/info"}
                             className="account-sidebar-link nav-link"
                             activeClassName="is-active">Personal data</NavLink>
                    {localStorage.getItem("userRole") === "ADMIN" ? 
                    <>
                        <NavLink to={"/account/admin/add"}
                            className="account-sidebar-link nav-link"
                            activeClassName="is-active">Add perfume</NavLink> 
                        <NavLink to={"/account/admin/perfumes"}
                            className="account-sidebar-link nav-link"
                            activeClassName="is-active">List perfumes</NavLink> 
                        <NavLink to={"/account/admin/users"}
                            className="account-sidebar-link nav-link"
                            activeClassName="is-active">List users</NavLink> 
                    </> :
                    <>
                        <NavLink to={"/account/user/edit"}
                             className="account-sidebar-link nav-link"
                             activeClassName="is-active">Change password</NavLink>
                    </>

                }
                </div>
                <div className="col-md-10">
                    <Route exact path="/account" component={() => <AccountItem/>}/>
                    <Route path="/account/user/info" component={() => <PersonalData/>}/>
                    {localStorage.getItem("userRole") === "ADMIN" ? 
                    <>
                        <Route exact path="/account/admin/add" component={() => <AddPerfume />} />
                        <Route exact path="/account/admin/perfumes" component={() => <PerfumeList />} />
                        <Route exact path="/account/admin/perfume/:id" component={(props: RouteComponentProps<{id: string}>) => <EditPerfume {...props} />} />
                        <Route exact path="/account/admin/users" component={() => <UserList />} />

                        <Route exact path={"/account/admin/users/:id"} component={(props: RouteComponentProps<{id: string}>) => <MangeUser {...props} />} />
                    </> : 
                    <Redirect to={"/account"} />}
                </div>
            </div>
        </div>
    )
}

export default Account