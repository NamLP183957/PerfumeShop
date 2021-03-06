import './Navbar.css'

import React from 'react'
import { Link } from 'react-router-dom'
import { Perfume } from '../../types/types'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/reducers/root-reducer'

function NavBar() {
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.cart.perfumes);
    
    return (
        <div>
            <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                <img src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" className="rounded mx-auto d-block" />
            </div>
            <div className="container-fluid bg-black">
                <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                    style={{ fontSize: "18px" }}>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item">
                                <Link to={"/"}><span className="nav-link pl-5 pr-5">HOME</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: "/menu", state: { id: "all" } }}>
                                    <span className="nav-link pl-5 pr-5">PERFUMES</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/contacts"}><span className="nav-link pl-5 pr-5">CONTACTS</span></Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/cart"}>
                                    <i className="fas fa-shopping-cart fa-lg pl-5" style={{ color: "white" }}></i>
                                    <h5 className="d-inline"
                                        style={{ position: "relative", right: "15px", bottom: "8px" }}>
                                        <span className="badge badge-success">{perfumes.length}</span>
                                    </h5>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar