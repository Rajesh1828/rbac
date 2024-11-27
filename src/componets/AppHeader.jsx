import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, setDisplayUsername] = useState('');
    const [showmenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setShowMenu(false);
        } else {
            setShowMenu(true);
            const username = sessionStorage.getItem('username');
            if (!username) {
                navigate('/login');
            } else {
                setDisplayUsername(username);
            }
        }
    }, [location, navigate]);

    return (
        <div>
            {showmenu && (
                <div className="header">
                    <Link to="/">Home</Link>
                    <Link to="/customer">Customer</Link>
                    <span style={{ marginLeft: '70%' }}>
                        Welcome <b>{displayusername}</b>
                    </span>
                    <Link style={{ float: 'right' }} to="/login">
                        Logout
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Appheader;
