import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  /* =========================================================
     PRODUCT
  ========================================================= */

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  /* =========================================================
     IMAGES
  ========================================================= */

  const productImages = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  /* =========================================================
     STATES
  ========================================================= */

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showCartNotification, setShowCartNotification] =
    useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  /* =========================================================
     HAS VARIANTS
  ========================================================= */

  const hasVariants =
    Array.isArray(product?.variants) &&
    product.variants.length > 0;

  /* =========================================================
     CURRENT PRICE
  ========================================================= */

  const currentPrice = selectedVariant
    ? Number(selectedVariant.price)
    : Number(product?.price || 0);

  /* =========================================================
     RESET WHEN PRODUCT CHANGES
  ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setSelectedImage(0);
    setQuantity(1);
    setIsFavorite(false);

    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [id, product]);

  /* =========================================================
     PRODUCT NOT FOUND
  ========================================================= */

  if (!product) {
    return (
      <section className="product-not-found">
        <div className="container">
          <div className="product-not-found-card">
            <div className="product-not-found-icon">
              🔍
            </div>

            <h1>Produit introuvable</h1>

            <p>
              Désolé, le produit que vous recherchez
              n'existe pas ou n'est plus disponible.
            </p>

            <Link
              to="/shop"
              className="product-back-button"
            >
              ← Retour à la boutique
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatPrice = (price) => {
    return `${Number(price).toFixed(3)} DT`;
  };

  /* =========================================================
     QUANTITY
  ========================================================= */

  const handleDecrease = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  };

  const handleIncrease = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  /* =========================================================
     VARIANT
  ========================================================= */

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,

      price: currentPrice,

      selectedVariant: selectedVariant
        ? {
            ...selectedVariant,
          }
        : null,
    };

    addToCart(productToAdd, quantity);

    setShowCartNotification(true);

    window.setTimeout(() => {
      setShowCartNotification(false);
    }, 2800);
  };

  /* =========================================================
     FAVORITE
  ========================================================= */

  const handleFavorite = () => {
    setIsFavorite((current) => !current);
  };

  /* =========================================================
     IMAGE GALLERY
  ========================================================= */

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="product-details-page">

      {/* =====================================================
          SUCCESS NOTIFICATION
      ===================================================== */}

      {showCartNotification && (
        <div
          className="cart-success-notification"
          role="status"
          aria-live="polite"
        >
          <div className="cart-success-icon">
            ✓
          </div>

          <div className="cart-success-content">
            <strong>
              Produit ajouté au panier
            </strong>

            <span>
              {product.name}
              {selectedVariant
                ? ` — ${selectedVariant.name}`
                : ""}
              {" × "}
              {quantity}
            </span>
          </div>

          <Link
            to="/cart"
            className="cart-success-link"
          >
            Voir
          </Link>
        </div>
      )}

      <div className="container">

        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <nav
          className="product-breadcrumb"
          aria-label="Fil d'Ariane"
        >
          <Link to="/">Accueil</Link>

          <span>›</span>

          <Link to="/shop">Boutique</Link>

          <span>›</span>

          <span>{product.name}</span>
        </nav>

        {/* =====================================================
            PRODUCT MAIN
        ===================================================== */}

        <div className="product-details-layout">

          {/* ===================================================
              PRODUCT GALLERY
          =================================================== */}

          <div className="product-gallery">

            <div className="product-image-card">

              {product.badge && (
                <span className="product-detail-badge">
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                className={`product-favorite ${
                  isFavorite ? "active" : ""
                }`}
                onClick={handleFavorite}
                aria-label={
                  isFavorite
                    ? "Retirer des favoris"
                    : "Ajouter aux favoris"
                }
              >
                {isFavorite ? "♥" : "♡"}
              </button>

              {productImages.length > 0 ? (
                <img
                  src={productImages[selectedImage]}
                  alt={`${product.name} - image ${
                    selectedImage + 1
                  }`}
                  className="product-detail-image"
                />
              ) : (
                <div className="product-no-image">
                  <span>📷</span>
                  <p>Image indisponible</p>
                </div>
              )}

            </div>

            {productImages.length > 1 && (
              <div
                className="product-thumbnails"
                aria-label="Galerie du produit"
              >
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={`product-thumbnail ${
                      selectedImage === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleImageSelect(index)
                    }
                    aria-label={`Afficher l'image ${
                      index + 1
                    }`}
                    aria-current={
                      selectedImage === index
                        ? "true"
                        : undefined
                    }
                  >
                    <img
                      src={image}
                      alt={`${product.name} miniature ${
                        index + 1
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="product-image-hint">
              <span>✓</span>

              {productImages.length > 1
                ? `${productImages.length} images disponibles`
                : "Produit sélectionné avec soin"}
            </div>

          </div>

          {/* ===================================================
              INFORMATION
          =================================================== */}

          <div className="product-information">

            <div className="product-category">
              {product.category}
            </div>

            <h1 className="product-title">
              {product.name}
            </h1>

            <div className="product-rating">
              <div className="stars">
                ★★★★★
              </div>

              <span>
                Produit apprécié par nos clients
              </span>
            </div>

            {/* PRICE */}

            <div className="product-price-container">

              <div className="product-price">
                {formatPrice(currentPrice)}
              </div>

              {selectedVariant && (
                <span className="selected-price-label">
                  {selectedVariant.name}
                </span>
              )}

            </div>

            {/* DESCRIPTION */}

            <p className="product-description">
              {product.description ||
                "Un produit pratique et soigneusement sélectionné pour accompagner les enseignants dans leur quotidien."}
            </p>

            {/* =================================================
                VARIANTS
            ================================================= */}

            {hasVariants && (
              <div className="product-variants">

                <div className="variant-header">

                  <div>
                    <span className="variant-label">
                      Choisissez votre format
                    </span>

                    <span className="variant-help">
                      Sélectionnez le nombre de pages
                    </span>
                  </div>

                  {selectedVariant && (
                    <span className="variant-selected">
                      ✓ {selectedVariant.name}
                    </span>
                  )}

                </div>

                <div className="variant-options">

                  {product.variants.map((variant) => {
                    const isSelected =
                      selectedVariant?.id === variant.id;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        className={`variant-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleVariantSelect(variant)
                        }
                        aria-pressed={isSelected}
                      >

                        <span className="variant-radio">
                          {isSelected && (
                            <span />
                          )}
                        </span>

                        <span className="variant-info">
                          <strong>
                            {variant.name}
                          </strong>

                          {variant.pages && (
                            <small>
                              {variant.pages} pages
                            </small>
                          )}
                        </span>

                        <span className="variant-price">
                          {formatPrice(variant.price)}
                        </span>

                      </button>
                    );
                  })}

                </div>

                {selectedVariant && (
                  <div className="variant-summary">

                    <div className="variant-summary-icon">
                      ✓
                    </div>

                    <div>
                      <strong>
                        Votre choix
                      </strong>

                      <span>
                        {selectedVariant.name}
                        {" • "}
                        {formatPrice(
                          selectedVariant.price
                        )}
                      </span>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* AVAILABILITY */}

            <div
              className={`product-availability ${
                product.available === false
                  ? "unavailable"
                  : ""
              }`}
            >
              <span className="availability-dot" />

              <span>
                {product.available !== false
                  ? "Disponible"
                  : "Actuellement indisponible"}
              </span>
            </div>

            <div className="product-divider" />

            {/* =================================================
                PURCHASE
            ================================================= */}

            <div className="product-purchase">

              <div className="quantity-section">

                <span className="quantity-label">
                  Quantité
                </span>

                <div className="quantity-selector">

                  <button
                    type="button"
                    onClick={handleDecrease}
                    aria-label="Diminuer la quantité"
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncrease}
                    aria-label="Augmenter la quantité"
                  >
                    +
                  </button>

                </div>

              </div>

              <button
                type="button"
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={
                  product.available === false ||
                  (hasVariants && !selectedVariant)
                }
              >
                <span className="add-to-cart-icon">
                  🛒
                </span>

                <span>
                  {product.available === false
                    ? "Indisponible"
                    : "Ajouter au panier"}
                </span>
              </button>

            </div>

            {/* TOTAL */}

            <div className="purchase-summary">

              <div className="purchase-summary-left">
                <span>
                  Total produit
                </span>

                <strong>
                  {formatPrice(
                    currentPrice * quantity
                  )}
                </strong>
              </div>

              <span className="purchase-summary-note">
                Livraison : 9 DT
              </span>

            </div>

            {/* =================================================
                SERVICES
            ================================================= */}

            <div className="product-services">

              <div className="product-service">

                <div className="service-icon">
                  🚚
                </div>

                <div>
                  <strong>
                    Livraison en Tunisie
                  </strong>

                  <span>
                    Livraison à 9 DT
                  </span>
                </div>

              </div>

              <div className="product-service">

                <div className="service-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Commande simple
                  </strong>

                  <span>
                    Quelques étapes seulement
                  </span>
                </div>

              </div>

              <div className="product-service">

                <div className="service-icon">
                  💬
                </div>

                <div>
                  <strong>
                    Besoin d'aide ?
                  </strong>

                  <span>
                    Contactez-nous
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* =====================================================
            PRODUCT DESCRIPTION
        ===================================================== */}

        <div className="product-extra-section">

          <div className="product-extra-card">

            <div className="product-extra-header">

              <span className="extra-number">
                01
              </span>

              <div>
                <span className="extra-label">
                  À PROPOS DU PRODUIT
                </span>

                <h2>
                  Pourquoi vous allez l'aimer
                </h2>
              </div>

            </div>

            <p>
              {product.description ||
                "Ce produit a été sélectionné pour son côté pratique et son utilité dans le quotidien des enseignants."}
            </p>

          </div>

          <div className="product-help-card">

            <div className="help-card-icon">
              💡
            </div>

            <div>
              <h3>
                Une question sur ce produit ?
              </h3>

              <p>
                Notre équipe est disponible pour
                vous aider avant votre commande.
              </p>

              <Link to="/contact">
                Nous contacter →
              </Link>
            </div>

          </div>

        </div>

        {/* =====================================================
            BACK TO SHOP
        ===================================================== */}

        <div className="product-back-shop">
          <Link to="/shop">
            ← Continuer mes achats
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ProductDetails;

