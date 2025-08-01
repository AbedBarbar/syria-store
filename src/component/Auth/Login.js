import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAccountState,
  toggleRegistered,
  toggleShowLog,
} from "../../Redux/MenuSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login(props) {
  const showLog = useSelector((state) => state.menu.showLog);
  const dispatch = useDispatch();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    setEmail([]);
    setPassword([]);
    setEmailFocus(false);
    setPasswordFocus(false);
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

  console.log(showPassword);

  function handleFocus(e) {
    if (e.target.name === "email") setEmailFocus(true);
    else if (e.target.name === "password") setPasswordFocus(true);
  }
  function handleBlur(e) {
    if (e.target.name === "email") setEmailFocus(false);
    else if (e.target.name === "password") setPasswordFocus(false);
  }
  function toggleShowPass(e) {
    setShowPassword(!showPassword);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost/api/LoginUser.php", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.Success) {
          dispatch(toggleShowLog());
          dispatch(toggleRegistered());
          nav("/");
        }
        if (response.data.Error) {
          setError(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  return (
    <>
      {showLog ? (
        <div
          ref={logRef}
          className="fixed top-1/2 left-1/2 w-[90%] max-w-[400px] h-auto -translate-x-1/2 -translate-y-1/2 bg-transparent border-[2px] border-solid border-[rgba(255,255,255,0.5)] rounded-[20px] backdrop-filter backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-center items-center overflow-hidden transition-all duration-500 z-[9999]"
        >
          <span
            onClick={() => dispatch(toggleShowLog())}
            className="absolute top-0 right-0 w-[45px] h-[45px] bg-[#162938] text-[2em] text-[White] flex justify-center items-center rounded-bl-[20px] cursor-pointer"
          >
            x
          </span>
          <div className="w-full px-4 sm:px-8 py-8">
            <h2 className="text-[2em] text-center text-[#162938]">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="relative w-full h-[50px] border-b-2 border-[#162938] mt-5 mb-6">
                <input
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="w-full h-full bg-transparent border-none outline-none text-[1em] text-[#162938] font-semibold pl-[5px] pr-[35px] direction-ltr"
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
              </div>

              {/* Password Field */}
              <div className="relative w-full h-[50px] border-b-2 border-[#162938] mt-5 mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="w-full h-full bg-transparent border-none outline-none text-[1em] text-[#162938] font-semibold pl-[5px] pr-[35px] direction-ltr"
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

                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer text-[#162938] text-[1em]"
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>

                {error && (
                  <div className="text-red-600 text-[0.9em] mt-2">
                    Invalid email or password
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-[45px] bg-[#162938] text-white text-[1em] font-medium rounded-[6px] mt-6"
              >
                Login
              </button>

              <p className="mt-4 text-center text-[#162938] text-[0.95em]">
                Don't have an account?{" "}
                <span
                  onClick={() => dispatch(toggleAccountState())}
                  className="text-blue-700 cursor-pointer hover:underline"
                >
                  Register
                </span>
              </p>
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
