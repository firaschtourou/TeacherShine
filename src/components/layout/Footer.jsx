import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import {
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiMessageCircle,
} from "react-icons/fi";
import "./Footer.css";
import logo from "../../assets/logo/logo final.png"
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* =====================================================
          FOOTER MAIN
      ===================================================== */}
      <div className="footer-container">

        {/* ===================================================
            BRAND
        =================================================== */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
             <img src={logo} alt='logo'  />
            </span>

            <span>
              TeacherShine
            </span>
          </Link>

          <p className="footer-description">
            Des outils pratiques et créatifs pour accompagner
            les enseignants au quotidien.
          </p>

          {/* Social networks */}
          <div className="footer-socials">

            <a
              href="https://www.instagram.com/for.teachers2026/?hl=fr"
              className="footer-social"
              aria-label="Instagram TeacherShine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61574699244368"
              className="footer-social"
              aria-label="Facebook TeacherShine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
              <span>Facebook</span>
            </a>

          </div>

        </div>


        {/* ===================================================
            BOUTIQUE
        =================================================== */}
        <div className="footer-column">

          <h3>
            Notre boutique
          </h3>

          <ul>

            <li>
              <Link to="/shop">
                Tous les produits
              </Link>
            </li>

            <li>
              <Link to="/shop">
                Outils enseignants
              </Link>
            </li>

            <li>
              <Link to="/shop">
                Sacs & trousses
              </Link>
            </li>

            <li>
              <Link to="/shop">
                Cahiers & journaux
              </Link>
            </li>

            <li>
              <Link to="/shop">
                Jeux éducatifs
              </Link>
            </li>

          </ul>

        </div>


        {/* ===================================================
            INFORMATIONS
        =================================================== */}
        <div className="footer-column">

          <h3>
            Informations
          </h3>

          <ul>

            <li>
              <Link to="/about">
                À propos de nous
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact
              </Link>
            </li>

            <li>
              <Link to="/shop">
                Livraison
              </Link>
            </li>

            <li>
              <Link to="/shop">
                FAQ
              </Link>
            </li>

          </ul>

        </div>


        {/* ===================================================
            CONTACT
        =================================================== */}
        <div className="footer-contact">

          <div className="footer-contact-header">

            <div className="footer-contact-icon">
              <FiMessageCircle />
            </div>

            <div>

              <h3>
                Besoin d'aide ?
              </h3>

              <p>
                Contactez-nous facilement
              </p>

            </div>

          </div>


          {/* WhatsApp principal */}
          <a
            href="https://wa.me/21626900751"
            className="footer-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter TeacherShine sur WhatsApp"
          >

            <div className="footer-whatsapp-icon">
              <FaWhatsapp />
            </div>

            <div className="footer-whatsapp-content">

              <span>
                WhatsApp
              </span>

              <strong>
                +216 26 900 751
              </strong>

            </div>

            <FiArrowRight className="footer-whatsapp-arrow" />

          </a>


          {/* Informations de contact */}
          <div className="footer-contact-list">

            {/* Téléphone */}
            <a
              href="tel:+21626900751"
              className="footer-contact-item"
            >

              <span className="footer-contact-item-icon">
                <FiPhone />
              </span>

              <span className="footer-contact-item-content">

                <small>
                  Téléphone
                </small>

                <strong>
                  +216 26 900 751
                </strong>

              </span>

            </a>


            {/* Instagram */}
            <a
              href="https://www.instagram.com/for.teachers2026/?hl=fr"
              className="footer-contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >

              <span className="footer-contact-item-icon">
                <FaInstagram />
              </span>

              <span className="footer-contact-item-content">

                <small>
                  Instagram
                </small>

                <strong>
                  @for.teachers2026
                </strong>

              </span>

            </a>


            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61574699244368"
              className="footer-contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >

              <span className="footer-contact-item-icon">
                <FaFacebookF />
              </span>

              <span className="footer-contact-item-content">

                <small>
                  Facebook
                </small>

                <strong>
                  Teacher Shine
                </strong>

              </span>

            </a>


            {/* Adresse */}
            <div className="footer-contact-item footer-address">

              <span className="footer-contact-item-icon">
                <FiMapPin />
              </span>

              <span className="footer-contact-item-content">

                <small>
                  Adresse
                </small>

                <strong>
                  Rte Mahdia 8 KM Sfax, Tunisie
                </strong>

              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          FOOTER BOTTOM
      ===================================================== */}
      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            © {currentYear} TeacherShine. Tous droits réservés.
          </p>

          <div className="footer-bottom-links">

            <Link to="/about">
              À propos
            </Link>

            <span>
              •
            </span>

            <Link to="/contact">
              Contact
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;