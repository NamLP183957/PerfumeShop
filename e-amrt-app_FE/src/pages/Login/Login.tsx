import React, { FormEvent, useState } from 'react'
import { faEnvelope, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css"
import { Link, useHistory } from 'react-router-dom';
import { UserData } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/thunks/auth-thunks';
import { AppStateType } from '../../redux/reducers/root-reducer';
import facebookLogo from "../../img/facebook.png";
function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const error: string = useSelector((state: AppStateType) => state.auth.error);
    const success: string = useSelector((state: AppStateType) => state.auth.success);
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");


    const onClickSignIn = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData: UserData = { email, password };
        dispatch(login(userData, history));
    }

    return (
        <div id="container" className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h4><FontAwesomeIcon className="mr-3" icon={faSignInAlt} />SIGN IN</h4>
                    <hr />
                    {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
                    {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
                    <form onSubmit={onClickSignIn}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">E-mail: </label>
                            <FontAwesomeIcon style={{ position: "relative", top: "8px" }} icon={faEnvelope} />
                            <div className="col-sm-7">
                                <input
                                    className='form-control'
                                    type="email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Password: </label>
                            <FontAwesomeIcon style={{ position: "relative", top: "8px" }} icon={faLock} />
                            <div className="col-sm-7">
                                <input
                                    className='form-control'
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => { setpassword(e.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <button type='submit' className="btn btn-dark mx-3">
                                <FontAwesomeIcon className="mr-3" icon={faSignInAlt} />Sign in
                            </button>
                            {/* <Link to={"/forgot"} style={{ position: "relative", top: "8px" }}>Forgot password?</Link> */}
                        </div>
                    </form>
                </div>

                <div className="col-md-6">
                    <div className="mt-5">
                        <a className="btn btn-block social-btn facebook"
                           href="http://localhost:8080/oauth2/authorize/facebook">
                            <img src={facebookLogo} alt="facebook"/>Log in with Facebook</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login