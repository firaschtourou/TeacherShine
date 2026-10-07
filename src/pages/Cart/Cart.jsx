import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  const navigate = useNavigate();

  const deliveryFee = cartItems.length > 0 ? 9 : 0;
  const total = subtotal + deliveryFee;

  const formatPrice = (price) => {
    return `${Number(price).toFixed(3)} DT`;
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      return;
    }

    navigate("/contact");
  };

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              🛒
            </div>

            <h1>Votre panier est vide</h1>

            <p>
              Découvrez nos produits et trouvez les accessoires
              parfaits pour votre quotidien d'enseignant.
            </p>

            <Link to="/shop" className="cart-empty-button">
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="container">

        {/* HEADER */}
        <div className="cart-header">
          <div>
            <span className="cart-eyebrow">
              VOTRE SÉLECTION
            </span>

            <h1>Mon panier</h1>

            <p>
              {cartItems.length} produit
              {cartItems.length > 1 ? "s" : ""} ·{" "}
              {cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )}{" "}
              article
              {cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              ) > 1
                ? "s"
                : ""}
            </p>
          </div>

          <Link to="/shop" className="continue-shopping">
            ← Continuer mes achats
          </Link>
        </div>

        <div className="cart-layout">

          {/* PRODUCTS */}
          <div className="cart-products">

            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <Link
                  to={`/product/${item.id}`}
                  className="cart-item-image"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </Link>

                <div className="cart-item-info">

                  <span className="cart-item-category">
                    {item.category}
                  </span>

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <div className="cart-item-price">
                    {formatPrice(item.price)}
                  </div>

                  <div className="cart-item-actions">

                    <div className="quantity-control">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        aria-label="Diminuer la quantité"
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>

                    </div>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Supprimer
                    </button>

                  </div>
                </div>

                <div className="cart-item-total">
                  {formatPrice(
                    Number(item.price) * item.quantity
                  )}
                </div>
              </article>
            ))}

          </div>

          {/* SUMMARY */}
          <aside className="cart-summary">

            <div className="cart-summary-card">

              <h2>Résumé de la commande</h2>

              <div className="summary-line">
                <span>Sous-total</span>
                <strong>
                  {formatPrice(subtotal)}
                </strong>
              </div>

              <div className="summary-line">
                <span>Livraison</span>
                <strong>
                  {formatPrice(deliveryFee)}
                </strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total</span>
                <strong>
                  {formatPrice(total)}
                </strong>
              </div>

              <button
                type="button"
                className="checkout-button"
                onClick={handleOrder}
              >
                Commander
                <span>→</span>
              </button>

              <div className="checkout-security">
                <span>✓</span>
                <p>
                  Commande simple et rapide
                </p>
              </div>

              <div className="checkout-security">
                <span>✓</span>
                <p>
                  Livraison partout en Tunisie
                </p>
              </div>

            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}

export default Cart;