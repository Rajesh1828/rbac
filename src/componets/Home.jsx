import { useEffect, useState } from "react";

const Home = () => {
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/customer")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch customer data.");
                }
                return res.json();
            })
            .then((data) => {
                setCustomerList(data);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);

    return (
        <div>
            <h1 className="text-center">Welcome to my page</h1>
            {customerList.length > 0 ? (
                <table className="table table-bordered mt-3">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Credit Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.creditLimit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-3">No customer data available.</p>
            )}
        </div>
    );
};

export default Home;
