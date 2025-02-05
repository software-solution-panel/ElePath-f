import React, { useEffect, useState } from "react";
// import logo from "../../Assests/images/Login/login-img.png";
// import log from "../../Assests/images/Login/xo-logo.png";
// import * as AuthService from "../../Services/AuthService";
import log from "../../assests/images/elepath-logo.png";
// import { faL } from "@fortawesome/free-solid-svg-icons";
// import "../../../src/css/style.css";
import "../../../src/css/style.css";

export default function Login(props) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    sessionStorage.clear();
    localStorage.clear();
  }, []);

  const [show, setShow] = useState(false);
  const [emailValidateState, setEmailValidateState] = useState(false);
  const [passwordValidateState, setPasswordValidateState] = useState(false);

  const AuthUser = () => {
    const { email, password } = input;

    if (email === "") {
      setEmailValidateState(true);
    } else {
      setEmailValidateState(false);
    }

    if (password === "") {
      setPasswordValidateState(true);
    } else {
      setPasswordValidateState(false);
    }

    if ((email && password) === "") {
      return null;
    } else {
      // AuthService.login(input).then((ret) => {
      //   // console.log(ret.data.Message)
      //   // console.log(ret.status)
      //   if (ret.status == 401) {
      //     setShow(true);
      //   }
      // });
    }
  };

  return (
    <div class="container">
      <div class="row min-vh-100">
        <div class="col-md-12 align-self-center">
          <form class="login-section">

            <div class="form-group col-md-8 mx-auto" style={{ height: "175px" }}>
              <div className="xo-box2">
                <img src={log} alt="" />

              </div>

            </div>
            <div class="form-row">
              <div class="form-group col-md-8 mx-auto">
                <h3 class="text-center" style={{ marginTop: "10%", fontSize: "20px" }}></h3>
                {show && (
                  <span id="s" class="text-danger error text-center">
                    Incorrect username or password
                  </span>
                )}
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group col-md-11 mx-auto">
                <label>
                  Email<span class="required-mark">*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  onChange={(e) => setInput({ email: e.target.value })}
                  required
                />
                {emailValidateState && (
                  <span class="text-danger error text-center">
                    Please Enter Email
                  </span>
                )}
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-11 mx-auto">
                <label>
                  Password<span class="required-mark">*</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="********"
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                  required
                />
                {passwordValidateState && (
                  <span class="text-danger error text-center">
                    Please Enter Password
                  </span>
                )}
              </div>
            </div>

            <div class="form-row mt-3">
              <div class="form-group col-md-11 mx-auto">
                <button
                  type="button"
                  class="btn btn-primary btn-block login-btn-shadow"
                  id="btnRegister"
                  onClick={AuthUser}
                >
                  Login
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p class="text-center">Don't have an account? <a href="/register">Register</a></p>
              </div>
            </div>

            <div class="form-row mt-3">
              <div class="form-group col-md-11 mx-auto">
                <button
                  type="button"
                  class="btn btn-light btn-block login-btn-shadow"
                  id="btnVisitor"
                  // onClick={}
                >
                  Visitor Mode
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>

    // const [inputs, setInputs] = useState({})

    // const [show, setShow] = useState(false)

    // const [show2, setShow2] = useState(false)

    // const handleChange = (event) => {

    //   const name = event.target.name;

    //   const value = event.target.value;

    //   setInputs(values => ({ ...values, [name]: value }))

    // }

    // const handleSubmit = (event) => {

    //   event.preventDefault();

    //   if ((inputs.userName == "admin") && (inputs.password == "1234")) {

    //     navigate('/home')

    //   } else if (inputs.userName == "admin") {

    //     setShow(false)
    //     setShow2(true)
    //     var element = document.getElementById("password");
    //     element.classList.add("mystyle");

    //     var element1 = document.getElementById("userName");
    //     element1.classList.remove("mystyle");

    //   }
    //   else if (inputs.password == "1234") {
    //     setShow2(false)
    //     setShow(true)

    //     var element = document.getElementById("userName");
    //     element.classList.add("mystyle");

    //     var element1 = document.getElementById("password");
    //     element1.classList.remove("mystyle");

    //   }

    //   else {
    //     setShow2(true)
    //     setShow(true)
    //     var element = document.getElementById("userName");
    //     element.classList.add("mystyle");

    //     var element = document.getElementById("password");
    //     element.classList.add("mystyle");
    //   }

    // }

    // const history = useNavigate();

    // const navigate = url => {
    //   history(url);
    // }

    // // const userDetails = useSelector(({main}) => main.userDetails);

    // return (
    //   <div>

    //     <div className="color-line" />
    //     <div className="login-cover hv-center">
    //       <div className="container">
    //         <div className="row hv-center" style={{ marginTop: "20%" }}>
    //           <div className="col-lg-6 col-xl-6 hidden-xs img-box">
    //             <span >
    //               {/* <img src={log} alt="" /> */}
    //             </span>
    //           </div>
    //           <div className="col-lg-6 col-xl-6 login-card ">
    //             <form>
    //               <div className="form-group hv-center">
    //                 <span >
    //                   {/* <img src={logo} alt="" /> */}
    //                 </span>
    //               </div>

    //               <div className="form-group mb-5">
    //                 <label>User Name</label>

    //                 <input type="email" className="login-form" id="userName" placeholder="example@mail.com" name="userName" onChange={handleChange} />

    //                 {show &&

    //                   <span id="s" className="text-danger error">
    //                     Invalid User Name
    //                   </span>
    //                 }

    //               </div>

    //               <div className="form-group mb-5">
    //                 <label>Password</label>
    //                 <input type="password" className="login-form" id="password" placeholder="********" name="password" onChange={handleChange} />

    //                 {show2 &&
    //                   <span className="text-danger error">
    //                     Invalid Password
    //                   </span>
    //                 }
    //               </div>

    //               <button type="submit" className="btn btn-default btn-teejay col-xs-12" onClick={handleSubmit}>Login</button>

    //             </form>
    //             <div className="text-center">
    //               Calico (Pvt) Ltd | All rights reserved. <br />
    //               Powered by: X.O Concepts
    //             </div>

    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="row">

    //     </div>

    //     {/* // <div>{(userDetails)? 'done': 'not done'}</div>

    //     //   <div>

    //     //   <div className="color-line" />
    //     //   <div className="container">
    //     //     <div className="login-container">
    //     //       <div className="row no-margins">
    //     //         <div className="col-lg-6 hidden-xs no-padding" style={{objectFit: 'contain'}}>

    //     //               <img src={log} alt=""  style={{width:"100%",height:'auto',objectFit:"cover",minHeight:"394px"}}/>

    //     //         </div>
    //     //         <div className="col-lg-6 col-xs-12 no-padding">
    //     //           <div className="row">
    //     //             <div className="col-md-12">
    //     //               <div className="text-center m-b-md">
    //     //               <img src={logo} alt="" />
    //     //               </div>
    //     //               <div className="hpanel">
    //     //                 <div className="panel-body">
    //     //                   <form action="#" id="loginForm">
    //     //                     <div className="form-group">
    //     //                       <label className="control-label" htmlFor="username">Username</label>
    //     //                       <input type="text" placeholder="example@gmail.com" title="Please enter you username"  className="form-control" />
    //     //                     </div>
    //     //                     <div className="form-group">
    //     //                       <label className="control-label" htmlFor="password">Password</label>
    //     //                       <input type="password" title="Please enter your password" placeholder="******"  className="form-control" />
    //     //                     </div>
    //     //                     <a onClick={() => {navigate('/home')}} className="btn btn-teejay btn-block">Login</a>
    //     //                   </form>
    //     //                 </div>
    //     //               </div>
    //     //             </div>
    //     //           </div>
    //     //           <div className="row">
    //     //             <div className="col-md-12 text-center">
    //     //             Naturub Exports International (Pvt) Ltd | All rights reserved. <br />
    //     //               Powered by: X.O Concepts
    //     //             </div>
    //     //           </div>
    //     //         </div>
    //     //       </div>
    //     //     </div>
    //     //   </div>

    //     // </div> */}

    //   </div>
  );
}
