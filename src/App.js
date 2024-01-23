import React, { useState } from "react";
import "./App.css";
import imgs from "./images-removebg-preview.png";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { CFormInput, CForm } from "@coreui/react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [validated, setValidated] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isVisible1, setVisible1] = useState(false);
  const [isVisible2, setVisible2] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [emails, setEmails] = useState("");
  const [pwd, setPwd] = useState("");

  const toggle = () => {
    setVisible(!isVisible);
  };
  const toggle1 = () => {
    setVisible1(!isVisible1);
  };
  const toggle2 = () => {
    setVisible2(!isVisible2);
  };
  const handleSubmits = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    console.log(`Thank you ${companyName} with email ( ${emails} ) and paassword (${pwd})`
    );

    setEmails("");
    setCompanyName("");
    setPwd("");
  };

  const formik = useFormik({
    initialValues: {
      EmailId: "",
      Password: "",
    },

    validationSchema: yup.object({
      EmailId: yup
        .string()
        .email("Invalid email address")
        .required("Please Enter Email Id"),
      Password: yup
        .string()
        .required("Password is required")
        .min(5, "Your password is too short.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      toast.success(JSON.stringify(values));
    },
  });

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="wrapper">
      <ToastContainer theme="colored" position="top-right"></ToastContainer>
      <div className="row">
        <div className="col-sm-7 webs">
          <h1>Website monitoring and performance testing solutions</h1>
          <img src={imgs} style={{ height: "80px", width: "80px" }} />
        </div>
        <div className="col-sm-5 loggging">
          <div className="title-text">
            <div className={`title ${isLogin ? "login" : "signup"}`}>
              {isLogin ? "Login form" : "Create your account"}
            </div>
          </div>
          <div className="form-container">
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" checked={isLogin} onChange={() => setIsLogin(true)} />
              <input type="radio" name="slide1" id="signup" checked={!isLogin} onChange={() => setIsLogin(false)} />
              <label htmlFor="login" className="slide login">
                Login
              </label>
              <label htmlFor="signup" className="slide signup">
                Signup
              </label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              {isLogin ? (
                <form className="signup" onSubmit={formik.handleSubmit}>
                  <div className="field" style={{ marginTop: "25px" }}>
                    <input
                      type="text"
                      placeholder="Email Address"
                      name="EmailId"
                      {...formik.getFieldProps("EmailId")}
                    />
                    {formik.touched.EmailId && formik.errors.EmailId ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.EmailId}
                      </span>
                    ) : null}
                  </div>
                  <div className="field" style={{ marginTop: "25px" }}>
                    <input
                      type={!isVisible ? "password" : "text"}
                      name="password"
                      placeholder="Password"
                      {...formik.getFieldProps("Password")}
                    />
                    <b className="icon" onClick={toggle}>
                      {isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </b>

                    {formik.touched.Password && formik.errors.Password ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.Password}
                      </span>
                    ) : null}
                  </div>
                  <div className="pass-link">
                    <a>Forgot password?</a>
                  </div>
                  <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" value="Login" />
                  </div>
                  <br /> <br />
                  <h5 class="hr-lines"> or </h5>
                  <p style={{ justifyContent: "center", textAlign: "center" }}>
                    Login using
                  </p>
                  <div id="btn" class="text-center">
                    <button
                      type="button"
                      style={{height: "40px", marginRight: "10px", width: "40px",borderRadius: "20px" }}
                      class="btn btn-primary btn-circle btn-sm"
                    >
                      <i className="fa fa-facebook"></i>
                    </button>
                    <button
                      type="button"
                      style={{ height: "40px", width: "40px", marginRight: "10px", borderRadius: "20px" }}
                      class="btn btn-danger btn-circle btn-sm"
                    >
                      <i className="fa fa-google"></i>
                    </button>
                    <button
                      type="button"
                      style={{ height: "40px", width: "40px", marginRight: "10px", borderRadius: "20px"}}
                      class="btn btn-info btn-circle btn-sm"
                    >
                      <i className="fa fa-twitter"></i>
                    </button>
                  </div>
                  <div className="signup-link" onClick={handleToggleForm}>
                    Not a member?{" "}
                    <span style={{ color: "#d8f768" }}>
                      {isLogin ? "Signup now" : "Switch to Login"}
                    </span>
                  </div>
                </form>
              ) : (
                <CForm
                  className="signup"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmits}
                >
                  <div className="field">
                    <CFormInput
                      type="text"
                      placeholder="Email Address"
                      aria-describedby="validationCustom03Feedback"
                      feedbackInvalid="Please provide a valid emailaddress."
                      id="validationCustom03"
                      required
                      name="emails"
                      value={emails}
                      onChange={(event) => setEmails(event.target.value)}
                    />
                  </div>
                  <div className="field" style={{ marginTop: "13px" }}>
                    <CFormInput
                      type="text"
                      placeholder="Company Name"
                      aria-describedby="validationCustom01Feedback"
                      feedbackInvalid="Please provide a Company name."
                      id="validationCustom01"
                      required
                      name="companyName"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                    />
                  </div>
                  <div className="field" style={{ marginTop: "13px" }}>
                    <div class="iconss" onClick={toggle1}>
                      {isVisible1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                    <input
                      className="inputss"
                      type={!isVisible1 ? "password" : "text"}
                      placeholder="Password"
                      name="pwd"
                      value={pwd}
                      onChange={(event) => setPwd(event.target.value)}
                    />
                  </div>
                  <div className="field" style={{ marginTop: "13px" }}>
                    <div className="iconincc" onClick={toggle2}>
                      {isVisible2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                    <input
                      type={!isVisible2 ? "password" : "text"}
                      placeholder="Confirm password"
                    />
                  </div>
                  <div className="field btn">
                    <div className="btn-layer"></div>
                    <input color="primary" type="submit" />
                  </div>
                  <br />
                  <br />

                  <h5 class="hr-lines"> or </h5>
                  <p style={{ justifyContent: "center", textAlign: "center" }}>
                    Login using
                  </p>
                  <div id="btn" class="text-center">
                    {/* <button
                      type="button"
                      style={{
                        height: "40px",
                        marginRight: "10px",
                        width: "40px",
                        borderRadius: "20px",
                      }}
                      class="btn btn-primary btn-circle btn-sm"
                    > */}
                    <FacebookIcon style={{height: "40px", marginRight: "10px",width: "40px", borderRadius: "20px"}}/>
                    <LinkedinIcon style={{ height: "40px",width: "40px",marginRight: "10px", borderRadius: "20px"}}/>
                    <TwitterIcon style={{height: "40px", width: "40px", marginRight: "10px", borderRadius: "20px"}}
                    />
                  </div>
                  <div
                    className="signup-link"
                    onClick={handleToggleForm}
                    style={{ height: "30px" }}
                  >
                    Already have an account?{" "}
                    <span style={{ color: "#d8f768" }}>
                      {isLogin ? "Signup now " : "Login Now"}
                    </span>
                  </div>
                </CForm>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;