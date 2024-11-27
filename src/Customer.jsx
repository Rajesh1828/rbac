import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Customer = () => {
    const [custlist, custupdate] = useState([]);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        GetUserAccess();
        loadcustomer();
    }, []);

    const loadcustomer = () => {
        fetch("http://localhost:5000/customer")
            .then(res => (res.ok ? res.json() : false))
            .then(res => custupdate(res));
    };

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem('userrole') || '';
        fetch(`http://localhost:5000/roleaccess?role=${userrole}&menu=customer`)
            .then(res => {
                if (!res.ok) {
                    navigate('/');
                    toast.warning('You are not authorized to access');
                    return false;
                }
                return res.json();
            })
            .then(res => {
                if (res.length > 0) {
                    viewchange(true);
                    const userobj = res[0];
                    editchange(userobj.haveedit);
                    addchange(userobj.haveadd);
                    removechange(userobj.havedelete);
                } else {
                    navigate('/');
                    toast.warning('You are not authorized to access');
                }
            });
    };

    const handleadd = () => {
        haveadd ? toast.success('Added') : toast.warning('You are not having access for add');
    };

    const handleedit = () => {
        haveedit ? toast.success('Edited') : toast.warning('You are not having access for edit');
    };

    const handleremove = () => {
        haveremove ? toast.success('Removed') : toast.warning('You are not having access for remove');
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Customer Listing</h3>
                </div>
                <div className="card-body">
                    <button onClick={handleadd} className="btn btn-success">Add (+)</button>
                    <br />
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist.map(item => (
                                <tr key={item.code}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button onClick={handleedit} className="btn btn-primary">Edit</button> |
                                        <button onClick={handleremove} className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customer;
