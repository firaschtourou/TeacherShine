import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiSearch,
  FiShoppingBag,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

import brandLogo from "../../assets/logo/logo final.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { totalItems } = useCart();

  /* =========================================
     CLOSE MOBILE MENU
  ========================================= */

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  /* =========================================
     TOGGLE MOBILE MENU
  ========================================= */

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };


  /* =========================================
     CLOSE MENU WITH ESC
  ========================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);


  /* =========================================
     PREVENT BODY SCROLL WHEN MENU IS OPEN
  ========================================= */

  useEffect(() => {
    if (isMenuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);


  /* =========================================
     NAVIGATION LINKS
  ========================================= */

  const navigationLinks = [
    {
      label: "Accueil",
      path: "/",
    },
    {
      label: "Boutique",
      path: "/shop",
    },
    {
      label: "À propos",
      path: "/about",
    },
    {
      label: "Commander",
      path: "/contact",
    },
  ];


  return (
    <header className="navbar">

      {/* =======================================
          NAVBAR CONTAINER
      ======================================= */}

      <div className="navbar-container">


        {/* =====================================
            BRAND LOGO
        ===================================== */}

        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
          aria-label="For Teachers - Accueil"
        >

          <img
            src={brandLogo}
            alt="For Teachers"
            className="navbar-brand-logo"
          />

          <div className="navbar-brand-text">

            <span className="navbar-brand-name">
              Teachers Shine
            </span>

            <span className="navbar-brand-tagline">
              Outils pour enseignants
            </span>

          </div>

        </Link>


        {/* =====================================
            DESKTOP NAVIGATION
        ===================================== */}

        <nav
          className="navbar-menu"
          aria-label="Navigation principale"
        >

          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}

        </nav>


        {/* =====================================
            NAVBAR ACTIONS
        ===================================== */}

        <div className="navbar-actions">


          {/* Search */}

          <button
            type="button"
            className="navbar-action-button navbar-search-button"
            aria-label="Rechercher"
          >
            <FiSearch />
          </button>


          {/* Cart */}

          <Link
            to="/cart"
            className="navbar-cart"
            aria-label={`Panier, ${totalItems} article${
              totalItems > 1 ? "s" : ""
            }`}
            onClick={closeMenu}
          >

            <FiShoppingBag className="navbar-cart-icon" />

            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}

          </Link>


          {/* Mobile menu */}

          <button
            type="button"
            className={`mobile-menu-button ${
              isMenuOpen ? "open" : ""
            }`}
            onClick={toggleMenu}
            aria-label={
              isMenuOpen
                ? "Fermer le menu"
                : "Ouvrir le menu"
            }
            aria-expanded={isMenuOpen}
          >

            {isMenuOpen ? (
              <FiX />
            ) : (
              <FiMenu />
            )}

          </button>

        </div>

      </div>


      {/* =======================================
          MOBILE OVERLAY
      ======================================= */}

      <button
        type="button"
        className={`mobile-menu-overlay ${
          isMenuOpen ? "visible" : ""
        }`}
        onClick={closeMenu}
        aria-label="Fermer le menu"
        tabIndex={isMenuOpen ? 0 : -1}
      />


      {/* =======================================
          MOBILE MENU
      ======================================= */}

      <nav
        className={`mobile-menu ${
          isMenuOpen ? "open" : ""
        }`}
        aria-label="Navigation mobile"
      >

        {/* Mobile menu header */}

        <div className="mobile-menu-header">

          <div className="mobile-menu-brand">

            <img
              src={brandLogo}
              alt=""
              className="mobile-menu-logo"
            />

            <div>
              <strong>
                For Teachers
              </strong>

              <span>
                Outils pour enseignants
              </span>
            </div>

          </div>

        </div>


        {/* Mobile links */}

        <div className="mobile-menu-links">

          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `mobile-nav-link ${
                  isActive ? "active" : ""
                }`
              }
              onClick={closeMenu}
            >

              <span>
                {link.label}
              </span>

              <span className="mobile-nav-arrow">
                →
              </span>

            </NavLink>
          ))}


          {/* Mobile cart */}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `mobile-nav-link mobile-cart-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeMenu}
          >

            <span className="mobile-cart-content">

              <FiShoppingBag />

              <span>
                Mon panier
              </span>

            </span>

            {totalItems > 0 && (
              <span className="mobile-cart-count">
                {totalItems}
              </span>
            )}

          </NavLink>

        </div>


        {/* Mobile contact CTA */}

        <div className="mobile-menu-footer">

          <p>
            Une question sur un produit ?
          </p>

          <Link
            to="/contact"
            className="mobile-contact-button"
            onClick={closeMenu}
          >
            Nous contacter
          </Link>

        </div>

      </nav>

    </header>
  );
}

export default Navbar;