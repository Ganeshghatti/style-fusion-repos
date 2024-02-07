import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { saveuser, logout } from "../../features/User";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";
import {
  faBars,
  faCancel,
  faCartShopping,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import Spinnerf from "../../Components/Spinnerf";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setmenu] = useState(false);
  const user = useSelector((state) => state.user.user);

  const logoutf = async () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = "/";
  };
  const navbardisplay =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/products" ||
    location.pathname === "/admin/sales" ||
    location.pathname === "/admin/form";

  const menuf = () => {
    setmenu(!menu);
  };

  return navbardisplay ? (
    ""
  ) : (
    <nav
      id="navbar"
      className="fixed py-4  w-screen flex md:px-4 justify-between md:gap-0 items-center z-50 md:justify-between md:overflow-x-hidden px-8 left-0 top-0"
    >
      {menu ? (
        <div className="hidden md:block">
          <div
            className="fixed w-screen h-screen top-0 left-0 z-30"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.353)" }}
            onClick={menuf}
          ></div>
          <div
            className="flex flex-col w-3/4 h-screen fixed right-0 top-0 justify-center items-center z-50 gap-8 bg-white navbar-mobile-menu"
            style={{ backgroundColor: "white" }}
          >
            <ul className="list-none flex flex-col gap-10 items-center justify-center">
              <li onClick={menuf}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={menuf}>
                <Link to="/#shop">Shop</Link>
              </li>
              <li onClick={menuf}>
                <Link to="/#new-arrivals">New Arrivals</Link>
              </li>{" "}
              <li onClick={menuf}>
                <Link to="/#sales">Sales</Link>
              </li>{" "}
              <li onClick={menuf}>
                <Link to="/#contact">Contact</Link>
              </li>
            </ul>

            {user.token ? (
              <Link to="/login" className="w-fit">
                <button className="button-filled px-10 py-2" onClick={menuf}>
                  Get started{" "}
                </button>{" "}
              </Link>
            ) : (
              <div className="md:flex flex-col gap-12 items-center mt-10">
                <div className="flex flex-col items-center" onClick={menuf}>
                  <Link
                    to="/account"
                    className="hover:text-blue text-black2 flex flex-col items-center"
                  >
                    <AccountCircleIcon />
                    <p>My Account</p>
                  </Link>
                </div>
                <Link
                  to="/cart"
                  className="flex flex-col items-center"
                >
                  <Badge badgeContent={4} color="primary">
                    <ShoppingCartIcon />
                  </Badge>{" "}
                </Link>
                <button
                  className="button-outlined px-10 py-2"
                  onClick={logoutf}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <Link to="/" className="hidden md:block">
        <img src={logo} alt="logo" className="w-32 md:w-16 " />
      </Link>
      <ul
        className="flex items-center list-none md:hidden text-base"
        style={{ gap: "2.5vw" }}
      >
        <Link to="/" className="w-fit ">
          <img src={logo} alt="logo" className="w-32 md:w-16 " />
        </Link>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/#shop">Shop</Link>
        </li>
        <li>
          <Link to="/#new-arrivals">New Arrivals</Link>
        </li>{" "}
        <li>
          <Link to="/#sales">Sales</Link>
        </li>{" "}
        <li>
          <Link to="/#contact">Contact</Link>
        </li>
      </ul>
      <div className=" flex gap-4">
        {!user.token ? (
          <div className="flex md:hidden items-center ">
            <Link to="/login" className="md:hidden">
              <button className="button-filled px-10 py-2 text-lg md:text-base">
                Get started
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-12 md:hidden items-center">
            <div className="flex flex-col items-center">
              <Link
                to="/account"
                className="hover:text-black text-black flex flex-col items-center"
              >
                <PersonIcon />
              </Link>
            </div>
            <Link
              to="/cart"
              className="hover:text-black text-black flex flex-col items-center"
            >
              <Badge badgeContent={4} color="primary">
                <ShoppingCartIcon />
              </Badge>{" "}
            </Link>
            <button
              className="button-outlined px-10 py-2 text-lg md:text-base"
              onClick={logoutf}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:flex md:items-center">
        {menu ? (
          <FontAwesomeIcon
            icon={faClose}
            onClick={menuf}
            className="cursor-pointer text-2xl cancel-icon fixed top-10 right-6 z-50"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            onClick={menuf}
            className="cursor-pointer text-2xl"
          />
        )}
      </div>
    </nav>
  );
}
