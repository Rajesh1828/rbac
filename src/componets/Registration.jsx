import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [country, countrychange] = useState("india");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("female");

  const navigate = useNavigate();

  const isValidate = () => {
    let isproceed = true;
    let errors = [];
    if (!id) errors.push("Username");
    if (!name) errors.push("Fullname");
    if (!password) errors.push("Password");
    if (!email) errors.push("Email");

    if (errors.length > 0) {
      toast.warning(`Please enter the value in: ${errors.join(", ")}`);
      isproceed = false;
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      isproceed = false;
      toast.warning("Please enter a valid email");
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { id, name, password, email, phone, country, address, gender };
    if (isValidate()) {
      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Registered successfully.");
            navigate("/login");
          } else {
            toast.error("Failed to register: " + res.statusText);
          }
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  return (
    <div className="offset-lg-3 col-lg-6">
      <form className="container" onSubmit={handlesubmit}>
        <div className="card">
          <div className="card-header">
            <h1>User Registration</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    User Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    type="password"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Full Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Email <span className="errmsg">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => phonechange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Country</label>
                  <select
                    value={country}
                    onChange={(e) => countrychange(e.target.value)}
                    className="form-control"
                  >
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="singapore">Singapore</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => addresschange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Gender</label>
                  <br />
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="male"
                    className="app-check"
                  />
                  <label>Male</label>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="female"
                    className="app-check"
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Register
            </button>{" "}
            |{" "}
            <Link to={"/login"} className="btn btn-danger">
              Close
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
