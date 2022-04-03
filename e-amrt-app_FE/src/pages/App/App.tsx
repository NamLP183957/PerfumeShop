import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../../components/Navbar/Navbar'
import Account from '../Account/Account'
import Cart from '../Cart/Cart'
import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'
import Menu from '../Menu/Menu'
import OAuth2RedirectHandle from '../OAuth2/OAuth2RedirectHandle'
import Order from '../Order/Order'
import OrderFinalize from '../Order/OrderFinalize'
import Product from '../Product/Product'

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/homepage" component={HomePage} />
                <Route exact path="/product/:id" component={Product} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/order" component={Order} />
                <Route exact path="/order/finalize" component={OrderFinalize} />
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandle} />
                <Route path="/account" render={() => localStorage.getItem("token") ?
                    (<Route component={Account} />) : (<Route component={HomePage} />)} />
                <Route path="*" component={HomePage} />
            </Switch>
        </div>
    )
}

export default App