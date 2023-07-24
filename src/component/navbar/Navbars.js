import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router";
import jwt from "jwt-decode";

export default function Navbars() {
  const role = localStorage.getItem("role");
  // const [decodedToken, setDecodedToken] = useState(0);

//   useEffect(() => {
//     if (token) {
//       console.log("token: " + token);
//       const decoded = jwt(token);
//       setDecodedToken(decoded);
//       // alert(decoded.id)
//     } else {
//       // Xử lý khi không có token trong localStorage
//     }
//   }, [token]);
  return (
    <>
      <nav
        className="navbar-expand-lg p-0"
        style={{
          height: "8vh",
          boxShadow: "0px 5px 10px #e9e4e4",
          position: "sticky",
          left: "0px",
          top: "0px",
          zIndex: "1",
          right: "0px",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <div
          className="container-fluid"
          style={{ height: "100%", justifyContent: "center" }}
        >
          <ul
            className=""
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              listStyle: "none",
              alignItems: "center",
            }}
          >
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#27533e" : "",
                    color: isActive ? "#fff" : "",
                    borderRadius: "10px",
                    height: "5vh",
                    alignItems: "center",
                    display: "flex",
                    padding: "10px",
                  };
                }}
                className="nav-link"
                to={"/nav/info-store"}
              >
                Thông tin cửa hàng
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#27533e" : "",
                    color: isActive ? "#fff" : "",
                    borderRadius: "10px",
                    height: "5vh",
                    alignItems: "center",
                    display: "flex",
                    padding: "10px",
                  };
                }}
                className="nav-link active"
                aria-current="page"
                to={"/nav/transaction-history/create-contract"}
              >
                Cầm đồ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#27533e" : "",
                    color: isActive ? "#fff" : "",
                    borderRadius: "10px",
                    height: "5vh",
                    alignItems: "center",
                    display: "flex",
                    padding: "10px",
                  };
                }}
                className="nav-link active"
                aria-current="page"
                to={"/nav/liquidation"}
              >
                Thanh lý
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#27533e" : "",
                    color: isActive ? "#fff" : "",
                    borderRadius: "10px",
                    height: "5vh",
                    alignItems: "center",
                    display: "flex",
                    padding: "10px",
                  };
                }}
                className="nav-link"
                to={"/nav/redeem"}
              >
                Trả đồ
              </NavLink>
            </li>
            {role === "ROLE_ADMIN" ? (
              <>
                <li className="nav-item">
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        backgroundColor: isActive ? "#27533e" : "",
                        color: isActive ? "#fff" : "",
                        borderRadius: "10px",
                        height: "5vh",
                        alignItems: "center",
                        display: "flex",
                        padding: "10px",
                      };
                    }}
                    className="nav-link"
                    to={"/nav/manager-customer"}
                  >
                    Quản lý khách hàng
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        backgroundColor: isActive ? "#27533e" : "",
                        color: isActive ? "#fff" : "",
                        borderRadius: "10px",
                        height: "5vh",
                        alignItems: "center",
                        display: "flex",
                        padding: "10px",
                      };
                    }}
                    className="nav-link"
                    to={"/nav/api/employee"}
                  >
                    Quản lý nhân viên
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#27533e" : "",
                      color: isActive ? "#fff" : "",
                      borderRadius: "10px",
                      height: "5vh",
                      alignItems: "center",
                      display: "flex",
                      padding: "10px",
                    };
                  }}
                  className="nav-link"
                  to={"/nav/manager-customer"}
                >
                  Quản lý khách hàng
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#27533e" : "",
                    color: isActive ? "#fff" : "",
                    borderRadius: "10px",
                    height: "5vh",
                    alignItems: "center",
                    display: "flex",
                    padding: "10px",
                  };
                }}
                className="nav-link"
                to={`/nav/detail/employee`}
              >
                Thông tin cá nhân
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ minHeight: "90vh" }}>
        <Outlet />
      </div>
    </>
  );
}