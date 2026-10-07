import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

import { useCart } from "../../context/CartContext";
import { getDeliveryFee, formatPrice } from "../../utils/order";

import "./Contact.css";

/* =========================================
   EMAILJS CONFIGURATION
========================================= */

const EMAILJS_SERVICE_ID = "service_98alejb";
const EMAILJS_TEMPLATE_ID = "template_frrkulk";
const EMAILJS_PUBLIC_KEY = "0_b0O1tBvSy1FhNmm";

/* =========================================
   GOVERNORATES
========================================= */

const cities = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Béja",
  "Jendouba",
  "Le Kef",
  "Siliana",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Kairouan",
  "Kasserine",
  "Sidi Bouzid",
  "Gabès",
  "Médenine",
  "Tataouine",
  "Gafsa",
  "Tozeur",
  "Kébili",
];

function Contact() {
  const {
    cartItems,
    subtotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* =========================================
     DELIVERY
  ========================================= */

  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) {
      return 0;
    }

    return getDeliveryFee(formData.city);
  }, [cartItems.length, formData.city]);

  /* =========================================
     TOTAL
  ========================================= */

  const total = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  /* =========================================
     FORMAT PHONE
  ========================================= */

  const normalizePhone = (phone) => {
    return phone
      .trim()
      .replace(/\s+/g, "");
  };

  /* =========================================
     VALIDATION
  ========================================= */

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      return "Veuillez saisir votre prénom.";
    }

    if (!formData.lastName.trim()) {
      return "Veuillez saisir votre nom.";
    }

    if (!formData.phone.trim()) {
      return "Veuillez saisir votre numéro de téléphone.";
    }

    const phone = normalizePhone(formData.phone);

    if (!/^(?:\+216)?[2459]\d{7}$/.test(phone)) {
      return "Veuillez saisir un numéro de téléphone tunisien valide.";
    }

    if (!formData.city) {
      return "Veuillez sélectionner votre gouvernorat.";
    }

    if (!formData.address.trim()) {
      return "Veuillez saisir votre adresse de livraison.";
    }

    if (cartItems.length === 0) {
      return "Votre panier est vide.";
    }

    return "";
  };

  /* =========================================
     PRODUCTS TEXT FOR EMAIL
  ========================================= */

  const productsText = useMemo(() => {
    return cartItems
      .map((item) => {
        const itemTotal =
          Number(item.price) * item.quantity;

        return `${item.name} × ${item.quantity} — ${formatPrice(
          itemTotal
        )}`;
      })
      .join("\n");
  }, [cartItems]);

  /* =========================================
     SUBMIT ORDER
  ========================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    const validationError = validateForm();

    if (validationError) {
      setStatus({
        type: "error",
        message: validationError,
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        phone: normalizePhone(formData.phone),
        email: formData.email.trim() || "Non renseigné",

        city: formData.city,
        address: formData.address.trim(),

        products: productsText,

        subtotal: formatPrice(subtotal),
        delivery_fee: formatPrice(deliveryFee),
        total: formatPrice(total),

        customer_message:
          formData.message.trim() ||
          "Aucun message",

        order_date: new Date().toLocaleString(
          "fr-FR"
        ),
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      /*
       * IMPORTANT :
       * Le panier est vidé uniquement
       * après un envoi EmailJS réussi.
       */

      clearCart();

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        city: "",
        address: "",
        message: "",
      });

      setStatus({
        type: "success",
        message:
          "Votre commande a été envoyée avec succès ! Nous vous contacterons bientôt pour confirmer la livraison.",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Une erreur est survenue lors de l'envoi de votre commande. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================
     EMPTY CART
  ========================================= */

  if (cartItems.length === 0 && status.type !== "success") {
    return (
      <section className="contact-page">

        <div className="container">

          <div className="contact-empty-cart">

            <div className="contact-empty-icon">
              🛒
            </div>

            <span className="contact-empty-eyebrow">
              VOTRE COMMANDE
            </span>

            <h1>
              Votre panier est vide
            </h1>

            <p>
              Ajoutez quelques produits à votre
              panier avant de passer votre commande.
            </p>

            <Link
              to="/shop"
              className="contact-empty-button"
            >
              Découvrir la boutique
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>
    );
  }

  /* =========================================
     SUCCESS SCREEN
  ========================================= */

  if (
    cartItems.length === 0 &&
    status.type === "success"
  ) {
    return (
      <section className="contact-page">

        <div className="container">

          <div className="order-success-card">

            <div className="order-success-icon">
              ✓
            </div>

            <span className="order-success-eyebrow">
              COMMANDE ENVOYÉE
            </span>

            <h1>
              Merci pour votre commande !
            </h1>

            <p>
              Votre demande a bien été reçue.
              Notre équipe vous contactera
              prochainement pour confirmer votre
              commande et la livraison.
            </p>

            <div className="order-success-actions">

              <Link
                to="/shop"
                className="order-success-primary"
              >
                Continuer mes achats
              </Link>

              <Link
                to="/"
                className="order-success-secondary"
              >
                Retour à l'accueil
              </Link>

            </div>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="contact-page">

      <div className="container">

        {/* =========================================
            HERO
        ========================================= */}

        <div className="contact-hero">

          <div className="contact-hero-content">

            <span className="contact-eyebrow">
              FINALISER MA COMMANDE
            </span>

            <h1>
              Encore une dernière étape
              <span> ✨</span>
            </h1>

            <p>
              Remplissez vos informations pour
              recevoir votre commande simplement
              et rapidement.
            </p>

          </div>

          <div className="contact-hero-badge">

            <span className="hero-badge-icon">
              🛒
            </span>

            <div>
              <strong>
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}{" "}
                article
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                ) > 1
                  ? "s"
                  : ""}
              </strong>

              <span>
                dans votre panier
              </span>
            </div>

          </div>

        </div>

        {/* =========================================
            STATUS
        ========================================= */}

        {status.message && (
          <div
            className={`contact-status ${status.type}`}
            role="alert"
          >
            <span className="status-icon">
              {status.type === "success"
                ? "✓"
                : "!"}
            </span>

            <span>
              {status.message}
            </span>
          </div>
        )}

        {/* =========================================
            MAIN LAYOUT
        ========================================= */}

        <div className="contact-layout">

          {/* =======================================
              FORM
          ======================================= */}

          <div className="contact-form-card">

            <form
              onSubmit={handleSubmit}
              noValidate
            >

              {/* CUSTOMER INFORMATION */}

              <div className="contact-form-section">

                <div className="contact-section-heading">

                  <span className="section-number">
                    01
                  </span>

                  <div>
                    <span className="section-label">
                      VOS INFORMATIONS
                    </span>

                    <h2>
                      Qui doit recevoir la commande ?
                    </h2>

                    <p>
                      Ces informations nous permettent
                      de vous contacter pour confirmer
                      votre commande.
                    </p>
                  </div>

                </div>

                <div className="form-grid">

                  {/* FIRST NAME */}

                  <div className="form-field">

                    <label htmlFor="firstName">
                      Prénom
                      <span>*</span>
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                      autoComplete="given-name"
                      required
                    />

                  </div>

                  {/* LAST NAME */}

                  <div className="form-field">

                    <label htmlFor="lastName">
                      Nom
                      <span>*</span>
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      autoComplete="family-name"
                      required
                    />

                  </div>

                  {/* PHONE */}

                  <div className="form-field">

                    <label htmlFor="phone">
                      Téléphone
                      <span>*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ex : 20 123 456"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />

                  </div>

                  {/* EMAIL */}

                  <div className="form-field">

                    <label htmlFor="email">
                      Email
                      <small>
                        facultatif
                      </small>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="exemple@email.com"
                      autoComplete="email"
                    />

                  </div>

                  {/* CITY */}

                  <div className="form-field form-field-full">

                    <label htmlFor="city">
                      Gouvernorat
                      <span>*</span>
                    </label>

                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Sélectionner votre gouvernorat
                      </option>

                      {cities.map((city) => (
                        <option
                          value={city}
                          key={city}
                        >
                          {city}
                        </option>
                      ))}
                    </select>

                    <small className="field-help">
                      Livraison à 9 DT partout en Tunisie.
                    </small>

                  </div>

                  {/* ADDRESS */}

                  <div className="form-field form-field-full">

                    <label htmlFor="address">
                      Adresse de livraison
                      <span>*</span>
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Rue, numéro, quartier, indication..."
                      rows="3"
                      autoComplete="street-address"
                      required
                    />

                  </div>

                </div>

              </div>

              {/* ORDER */}

              <div className="contact-form-section">

                <div className="contact-section-heading">

                  <span className="section-number">
                    02
                  </span>

                  <div>
                    <span className="section-label">
                      VOTRE COMMANDE
                    </span>

                    <h2>
                      Vérifiez vos articles
                    </h2>

                    <p>
                      Les produits ci-dessous
                      proviennent automatiquement
                      de votre panier.
                    </p>
                  </div>

                </div>

                <div className="contact-order-list">

                  {cartItems.map((item) => (
                    <div
                      className="contact-order-item"
                      key={item.id}
                    >

                      <div className="contact-order-image">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      </div>

                      <div className="contact-order-info">

                        <span>
                          {item.category}
                        </span>

                        <strong>
                          {item.name}
                        </strong>

                        <small>
                          Quantité : {item.quantity}
                        </small>

                      </div>

                      <strong className="contact-order-price">
                        {formatPrice(
                          Number(item.price) *
                            item.quantity
                        )}
                      </strong>

                    </div>
                  ))}

                </div>

              </div>

              {/* MESSAGE */}

              <div className="contact-form-section">

                <div className="contact-section-heading">

                  <span className="section-number">
                    03
                  </span>

                  <div>
                    <span className="section-label">
                      OPTIONNEL
                    </span>

                    <h2>
                      Un message ?
                    </h2>

                    <p>
                      Ajoutez une précision concernant
                      votre commande ou votre livraison.
                    </p>
                  </div>

                </div>

                <div className="form-field">

                  <label htmlFor="message">
                    Message
                    <small>
                      facultatif
                    </small>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Une précision pour votre commande..."
                    rows="4"
                  />

                </div>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="submit-order-button"
                disabled={isSubmitting}
              >

                {isSubmitting ? (
                  <>
                    <span className="submit-spinner" />

                    Envoi de votre commande...
                  </>
                ) : (
                  <>
                    <span>
                      ✓
                    </span>

                    Confirmer ma commande

                    <span className="submit-arrow">
                      →
                    </span>
                  </>
                )}

              </button>

              <p className="submit-note">
                En confirmant, votre demande sera
                envoyée à TeacherShine pour traitement.
              </p>

            </form>

          </div>

          {/* =======================================
              SUMMARY
          ======================================= */}

          <aside className="contact-summary">

            <div className="contact-summary-card">

              <div className="summary-card-header">

                <div>
                  <span>
                    VOTRE PANIER
                  </span>

                  <h2>
                    Résumé
                  </h2>
                </div>

                <div className="summary-cart-icon">
                  🛒
                </div>

              </div>

              <div className="summary-products">

                {cartItems.map((item) => (
                  <div
                    className="summary-product"
                    key={item.id}
                  >

                    <div className="summary-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>

                    </div>

                    <div className="summary-product-info">

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {formatPrice(item.price)}
                      </span>

                    </div>

                    <strong>
                      {formatPrice(
                        Number(item.price) *
                          item.quantity
                      )}
                    </strong>

                  </div>
                ))}

              </div>

              <div className="summary-divider" />

              <div className="summary-line">
                <span>
                  Sous-total
                </span>

                <strong>
                  {formatPrice(subtotal)}
                </strong>
              </div>

              <div className="summary-line">
                <span>
                  Livraison
                </span>

                <strong>
                  {formatPrice(deliveryFee)}
                </strong>
              </div>

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  {formatPrice(total)}
                </strong>

              </div>

            </div>

            {/* DELIVERY CARD */}

            <div className="summary-info-card">

              <div className="summary-info-icon">
                🚚
              </div>

              <div>
                <strong>
                  Livraison partout en Tunisie
                </strong>

                <p>
                  Livraison à 9 DT. Nous vous
                  contacterons pour confirmer les
                  détails.
                </p>
              </div>

            </div>

            {/* TRUST CARD */}

            <div className="summary-trust-card">

              <div className="trust-item">
                <span>✓</span>
                <p>
                  Commande simple et rapide
                </p>
              </div>

              <div className="trust-item">
                <span>✓</span>
                <p>
                  Vos informations restent
                  confidentielles
                </p>
              </div>

              <div className="trust-item">
                <span>✓</span>
                <p>
                  Confirmation par téléphone
                </p>
              </div>

            </div>

          </aside>

        </div>

      </div>

    </section>
  );
}

export default Contact;