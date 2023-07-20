import "./Style.css";
import logo from "../account/img/imglogo1.png"
import {BrowserRouter, Routes,Route} from "react-router-dom"
import { LoginForm } from "./LoginForm";
import { ForgotPassword } from "./ForgotPassword";
import { ConfirmCode } from "./ConfirmCode";
import { NewPassword } from "./NewPassword";
export function LoginHome() {
    return(
        <>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="row border rounded-5 p-3 bg-white shadow box-area">
    <div
      className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
      style={{ background: "#00833e" }}
    >
      <div className="featured-image mb-3">
        <img
          src={logo}
          className="img-fluid"
          style={{ width: 250 }}
        />
      </div>
      <p
        className="text-white fs-2"
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontWeight: 600
        }}
      >
        PAWN SHOP
      </p>
      <small
        className="text-white text-wrap text-center"
        style={{
          width: "17rem",
          
        }}
      >
        Thu mua rủi ro đem cho hạnh phúc
      </small>
    </div>
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/confirmCode" element={<ConfirmCode />} />
        <Route path="/newPassword" element={<NewPassword />} />
    </Routes>
  </div>
</div>
        </>
    )
}