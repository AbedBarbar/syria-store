import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAccountState,
  toggleShowLog,
  toggleRegistered,
} from "../../Redux/MenuSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Register(props) {
  const showLog = useSelector((state) => state.menu.showLog);
  const dispatch = useDispatch();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [name, setName] = useState([]);
  const [passwordConfirmation, setPasswordConfirmation] = useState([]);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [passwordConfirmationFocus, setPasswordConfirmationFocus] =
    useState(false);
  const [accept, setAccept] = useState(true);
  const [emailError, setEmailError] = useState(false);
  let flag = true;
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    setEmail([]);
    setPassword([]);
    setName([]);
    setPasswordConfirmation([]);
    setEmailFocus(false);
    setPasswordFocus(false);
    setNameFocus(false);
    setPasswordConfirmationFocus(false);
    setAccept(true);
    setShowPassword(false)
    setShowConfirmPassword(false)
  }, [showLog]);
  const logRef = useRef();
  useEffect(() => {
    //Function to handle clicks outside the menu
    function handleClickOutside(event) {
      if (logRef.current && !logRef.current.contains(event.target)) {
        dispatch(toggleShowLog());
      }
    }
    if (showLog) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLog, dispatch]);

  function handleFocus(e) {
    if (e.target.name === "email") setEmailFocus(true);
    else if (e.target.name === "Name") setNameFocus(true);
    else if (e.target.name === "password") setPasswordFocus(true);
    else if (e.target.name === "passwordConfirmation")
      setPasswordConfirmationFocus(true);
  }
  function handleBlur(e) {
    if (e.target.name === "email") setEmailFocus(false);
    else if (e.target.name === "Name") setNameFocus(false);
    else if (e.target.name === "password") setPasswordFocus(false);
    else if (e.target.name === "passwordConfirmation")
      setPasswordConfirmationFocus(false);
  }
  function toggleShowPass(e) {
    setShowPassword(!showPassword);
  }
  function toggleShowConfirmPass(e) {
    setShowConfirmPassword(!showConfirmPassword);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      name === "" ||
      password.length < 6 ||
      password !== passwordConfirmation
    ) {
      flag = false;
      setAccept(false);
    } else {
      flag = true;
      setAccept(true);
    }
    if (flag) {
      axios
        .post("http://localhost/api/RegisterUser.php", {
          name: name,
          email: email,
          password: password,
          role: "Employee",
        })
        .then((response) => {
          //console.log(response.data.Success);
          if (response.data.Success) {
            // const now = new Date();
            // const item = {
            //   value: email,
            //   expiry: now.getTime() + 50000, //1 Hour
            // };
            // localStorage.setItem("email", JSON.stringify(item));
            dispatch(toggleShowLog());
            dispatch(toggleRegistered());
            nav("/");
          }
          if (response.data.error) {
            setEmailError(true);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }
  return (
    <>
      {showLog ? (
        <div
          ref={logRef}
          className="fixed w-[400px] h-[510px] top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-transparent border-[2px] border-[solid] border-[rgba(255,255,255,0.5)] rounded-[20px] backdrop-filter backdrop-blur-[20px] [box-shadow:0_0_30px_rgba(0,0,0,0.5)] flex justify-center items-center overflow-hidden [transition:all_0.5s_ease]"
        >
          <span
            onClick={() => dispatch(toggleShowLog())}
            className="absolute top-[0] right-[0] w-[45px] h-[45px] bg-[#162938] text-[2em] flex justify-center items-center rounded-bl-[20px] cursor-pointer"
          >
            x
          </span>
          <div className=" w-[100%] p-[40px]">
            <h2 className="text-[2em] text-center text-[#162938] mt-[10px]">
              Register
            </h2>
            <form
              action="addUser"
              method="POST"
              id="login2"
              onSubmit={handleSubmit}
            >
              <div className="relative w-full h-[50px] [border-bottom-style:solid]  [border-bottom-width:2px] [border-bottom-color:#162938] mt-[10px] mx-[0] mb-[30px]">
                <input
                  type="text"
                  name="Name"
                  value={name}
                  id="Name"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className={` w-full h-full bg-transparent border-[none] outline-0 text-[1em] text-[black] font-semibold pl-[5px] pr-[35px] py-[0] [direction:ltr] cursor-pointer`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-[5px] text-[1em] text-[#162938] font-medium transition-all duration-300
                  ${
                    nameFocus || name.length > 0
                      ? "top-[-5px] text-[0.85em]"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                  User Name
                </label>

                {name.length < 6 && !accept && (
                  <div className="text-[red] my-[5px]">
                    User Name is too short
                  </div>
                )}
              </div>

              <div className="relative w-full h-[50px] [border-bottom-style:solid]  [border-bottom-width:2px] [border-bottom-color:#162938] mt-[10px] mx-[0] mb-[30px] ">
                <input
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className={` w-full h-full bg-transparent border-[none] outline-0 text-[1em] text-[black] font-semibold pl-[5px] pr-[35px] py-[0] [direction:ltr] cursor-pointer`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-[5px] text-[1em] text-[#162938] font-medium transition-all duration-300
                  ${
                    emailFocus || email.length > 0
                      ? "top-[-5px] text-[0.85em]"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                  Email
                </label>

                {emailError && accept && (
                  <div className="text-[red] my-[5px]">
                    email already exists
                  </div>
                )}
              </div>

              <div className="relative w-full h-[50px] [border-bottom-style:solid] [border-bottom-width:2px] [border-bottom-color:#162938] mt-[20px] mx-[0] mb-[30px]-box">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="w-full h-full bg-transparent border-[none] outline-0 text-[1em] text-[black] font-semibold pl-[5px] pr-[35px] py-[0] [direction:ltr] cursor-pointer"
                  required
                />
                <span
                  className="absolute right-[8px] bottom-[5px] cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault(); // يمنع فقدان التركيز عن حقل الإدخال
                    toggleShowPass();
                  }}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </span>
                <label
                  htmlFor="password"
                  className={`absolute left-[5px] text-[1em] text-[#162938] font-medium transition-all duration-300
                  ${
                    passwordFocus || password.length > 0
                      ? "top-[-5px] text-[0.85em]"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                  Password
                </label>
                {password.length < 6 && !accept && (
                  <div className="text-[red] my-[5px]">
                    Password must be more than 6
                  </div>
                )}
              </div>

              <div className="relative w-full h-[50px] [border-bottom-style:solid] [border-bottom-width:2px] [border-bottom-color:#162938] mt-[30px] mx-[0] mb-[30px]-box">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  id="passwordConfirmation"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="w-full h-full bg-transparent border-[none] outline-0 text-[1em] text-[black] font-semibold pl-[5px] pr-[35px] py-[0] [direction:ltr] cursor-pointer"
                  required
                />
                <span
                  className="absolute right-[8px] bottom-[5px] cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault(); // يمنع فقدان التركيز عن حقل الإدخال
                    toggleShowConfirmPass();
                  }}
                >
                  {showConfirmPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </span>
                <label
                  htmlFor="passwordConfirmation"
                  className={` ${
                    passwordConfirmationFocus || passwordConfirmation.length > 0
                      ? "top-[-5px] text-[0.85em]"
                      : "top-1/2 -translate-y-1/2"
                  } absolute left-[5px] text-[1em] text-[#162938] font-medium transition-all duration-300`}
                >
                  Password Confirmation
                </label>
                {passwordConfirmation !== password && !accept && (
                  <div className="text-[red] my-[5px]">
                    Don't match with password
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-[100%] h-[45px] bg-[#162938]  border-none outline-[0] rounded-[6px] cursor-pointer text-[1em] text-[white] font-[500] mt-[30px] "
              >
                Register
              </button>
              <div className="login-register">
                <p>
                  You have an account?{" "}
                  <span
                    onClick={() => dispatch(toggleAccountState())}
                    className="register-link text-[blue] cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          className="absolute w-[400px] h-[440px] top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 "
          style={{ zIndex: -2 }}
        ></div>
      )}
    </>
  );
}
