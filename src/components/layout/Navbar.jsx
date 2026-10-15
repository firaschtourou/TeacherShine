import { useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiSearch,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiInfo,
  FiArrowRight,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import brandLogo from "../../assets/logo/logo final.png";
import "./Navbar.css";

const NAVIGATION_LINKS = [
  { label: "Accueil", path: "/" },
  { label: "Boutique", path: "/shop" },
  { label: "À propos", path: "/about" },
  { label: "Commander", path: "/commander" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  // Fermer le menu avec Échap.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, closeMenu]);

  // Bloquer le défilement uniquement lorsque le menu mobile est ouvert.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    const updateBodyScroll = () => {
      document.body.style.overflow =
        window.innerWidth <= 768 ? "hidden" : previousOverflow;
    };

    updateBodyScroll();
    window.addEventListener("resize", updateBodyScroll);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", updateBodyScroll);
    };
  }, [isMenuOpen]);

  const cartLabel = `Panier, ${totalItems} article${
    totalItems > 1 ? "s" : ""
  }`;

  return (
    <header className="navbar">
      {/* Barre principale */}
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
          aria-label="Teacher Shine - Accueil"
        >
          <img
            src={brandLogo}
            alt="Teacher Shine"
            className="navbar-brand-logo"
          />

          <div className="navbar-brand-text">
            <span className="navbar-brand-name">
              Teacher Shine
            </span>

            <span className="navbar-brand-tagline">
              Outils pour enseignants
            </span>
          </div>
        </Link>

        {/* Navigation ordinateur */}
        <nav
          className="navbar-menu"
          aria-label="Navigation principale"
        >
          {NAVIGATION_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-action-button navbar-search-button"
            aria-label="Rechercher"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("teachershine:open-search")
              );
            }}
          >
            <FiSearch aria-hidden="true" />
          </button>

          <Link
            to="/cart"
            className="navbar-cart"
            aria-label={cartLabel}
            onClick={closeMenu}
          >
            <FiShoppingBag
              className="navbar-cart-icon"
              aria-hidden="true"
            />

            {totalItems > 0 && (
              <span className="cart-count" aria-hidden="true">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            className={`mobile-menu-button${
              isMenuOpen ? " open" : ""
            }`}
            onClick={toggleMenu}
            aria-label={
              isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <FiX aria-hidden="true" />
            ) : (
              <FiMenu aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Information sur les commandes de moins de 20 DT */}
      <div className="navbar-order-notice">
        <div className="navbar-order-notice-content">
          <FiInfo
            className="navbar-order-notice-icon"
            aria-hidden="true"
          />

          <p className="navbar-order-notice-text">
            <strong>Un petit panier ?</strong>{" "}
            Pour une commande de moins de 20 DT, contactez-nous
            directement pour la finaliser.
          </p>

          <Link
            to="/contact"
            className="navbar-order-notice-link"
            onClick={closeMenu}
          >
            Nous contacter
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Fond du menu mobile */}
      <button
        type="button"
        className={`mobile-menu-overlay${
          isMenuOpen ? " visible" : ""
        }`}
        onClick={closeMenu}
        aria-label="Fermer le menu"
        aria-hidden={!isMenuOpen}
        tabIndex={isMenuOpen ? 0 : -1}
      />

      {/* Menu mobile */}
      <nav
        id="mobile-navigation"
        className={`mobile-menu${isMenuOpen ? " open" : ""}`}
        aria-label="Navigation mobile"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <img
              src={brandLogo}
              alt=""
              className="mobile-menu-logo"
            />

            <div>
              <strong>Teacher Shine</strong>
              <span>Outils pour enseignants</span>
            </div>
          </div>
        </div>

        <div className="mobile-menu-links">
          {NAVIGATION_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `mobile-nav-link${isActive ? " active" : ""}`
              }
              onClick={closeMenu}
            >
              <span>{label}</span>
              <span className="mobile-nav-arrow" aria-hidden="true">
                →
              </span>
            </NavLink>
          ))}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `mobile-nav-link mobile-cart-link${
                isActive ? " active" : ""
              }`
            }
            onClick={closeMenu}
          >
            <span className="mobile-cart-content">
              <FiShoppingBag aria-hidden="true" />
              <span>Mon panier</span>
            </span>

            {totalItems > 0 && (
              <span className="mobile-cart-count">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </NavLink>
        </div>

        <div className="mobile-menu-footer">
          <p>Une question sur un produit ?</p>

          <Link
            to="/contact"
            className="mobile-contact-button"
            onClick={closeMenu}
          >
            Nous contacter
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;