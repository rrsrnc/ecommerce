import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const cpassword = e.target[3].value;
    if (password != cpassword) {
      alert("Please check password");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
      };

      await fetch(
        "https://backenedecommerce-rrsrnc.onrender.com/auth/newuser",
        requestOptions
      )
        .then((response) => {
          if (response.status == 500) {
            alert("Email already in use");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          // console.log(data.accessToken);

          localStorage.setItem("token", data.accessToken);
          navigate('/');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSignUp(e)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="text"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmapassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
