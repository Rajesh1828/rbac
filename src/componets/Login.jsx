import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch(`http://localhost:5000/user/${username}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("User not found");
                    }
                    return res.json();
                })
                .then((resp) => {
                    if (!resp || Object.keys(resp).length === 0) {
                        toast.error('Please enter a valid username');
                    } else {
                        if (resp.password === password) {
                            toast.success('Login successful');
                            sessionStorage.setItem('username', username);
                            sessionStorage.setItem('userrole', resp.role);
                            usenavigate('/');
                        } else {
                            toast.error('Please enter valid credentials');
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Login failed due to: ' + err.message);
                });
        }
    };

    const validate = () => {
        let result = true;
        if (!username) {
            result = false;
            toast.warning('Please enter username');
        }
        if (!password) {
            result = false;
            toast.warning('Please enter password');
        }
        return result;
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>
                                    User Name <span className="errmsg">*</span>
                                </label>
                                <input
                                    value={username}
                                    onChange={(e) => usernameupdate(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Password <span className="errmsg">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => passwordupdate(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>{" "}
                            |{" "}
                            <Link className="btn btn-success" to={'/register'}>
                                New User
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
