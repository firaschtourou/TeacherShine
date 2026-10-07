import { Link } from "react-router-dom";
import "./About.css";

const values = [
  {
    icon: "✦",
    title: "Pratique",
    description:
      "Des produits pensés pour être réellement utiles au quotidien des enseignants.",
  },
  {
    icon: "♡",
    title: "Créatif",
    description:
      "Des outils et accessoires qui rendent les moments en classe plus agréables et interactifs.",
  },
  {
    icon: "★",
    title: "Qualité",
    description:
      "Nous privilégions des produits utiles, simples à utiliser et adaptés aux besoins des enseignants.",
  },
  {
    icon: "☻",
    title: "Humain",
    description:
      "TeacherShine place les enseignants et leurs besoins au centre de son expérience.",
  },
];

const advantages = [
  "Une sélection pensée pour les enseignants",
  "Des outils pratiques pour la classe",
  "Des jeux et activités éducatives",
  "Des accessoires pour mieux s'organiser",
  "Des récompenses pour encourager les élèves",
  "Une expérience d'achat simple et rapide",
];

function About() {
  return (
    <div className="about-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="about-hero">

        <div className="about-shape about-shape-one">
          ✦
        </div>

        <div className="about-shape about-shape-two">
          ●
        </div>

        <div className="about-shape about-shape-three">
          +
        </div>

        <div className="container">

          <div className="about-hero-content">

            <span className="about-eyebrow">
              ✦ Bienvenue chez TeacherShine
            </span>

            <h1>
              Pensé pour les enseignants.
              <span> Créé pour inspirer.</span>
            </h1>

            <p>
              TeacherShine propose des outils, accessoires, jeux et
              récompenses conçus pour accompagner les enseignants
              dans leur quotidien et rendre chaque moment en classe
              encore plus spécial.
            </p>

            <div className="about-hero-actions">

              <Link
                to="/shop"
                className="about-primary-button"
              >
                Découvrir la boutique
                <span>→</span>
              </Link>

              <a
                href="#our-story"
                className="about-secondary-button"
              >
                Notre histoire
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          INTRODUCTION
      ========================================= */}

      <section
        className="about-introduction section"
        id="our-story"
      >

        <div className="container">

          <div className="about-intro-grid">

            <div className="about-intro-visual">

              <div className="about-visual-card">

                <div className="about-visual-icon">
                  ✦
                </div>

                <span className="about-visual-small">
                  TEACHERS
                </span>

                <strong>
                  Make every
                  <br />
                  lesson shine.
                </strong>

                <div className="about-visual-stars">
                  ★ ★ ★
                </div>

              </div>

              <div className="about-floating-card">
                <span>♡</span>
                <div>
                  <strong>Pour les enseignants</strong>
                  <small>Avec passion</small>
                </div>
              </div>

            </div>


            <div className="about-intro-content">

              <span className="section-label">
                Notre histoire
              </span>

              <h2>
                Plus que des produits,
                <span> une expérience.</span>
              </h2>

              <p>
                TeacherShine est né d'une idée simple : les enseignants
                méritent d'avoir accès à des outils pratiques, créatifs
                et agréables qui facilitent leur quotidien.
              </p>

              <p>
                De l'organisation de la classe aux activités éducatives,
                en passant par les récompenses et les petits accessoires
                du quotidien, nous sélectionnons des produits qui peuvent
                trouver une vraie place dans la vie d'un enseignant.
              </p>

              <p>
                Notre objectif est de créer une expérience simple :
                découvrir, choisir et commander facilement les produits
                qui correspondent à vos besoins.
              </p>

              <Link
                to="/shop"
                className="text-link"
              >
                Explorer nos produits
                <span>→</span>
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          VALUES
      ========================================= */}

      <section className="about-values section">

        <div className="container">

          <div className="about-section-heading">

            <span className="section-label">
              Ce qui nous définit
            </span>

            <h2>
              Nos valeurs
            </h2>

            <p>
              Chaque produit et chaque détail de l'expérience
              TeacherShine repose sur quelques principes simples.
            </p>

          </div>


          <div className="values-grid">

            {values.map((value) => (
              <article
                className="value-card"
                key={value.title}
              >

                <div className="value-icon">
                  {value.icon}
                </div>

                <h3>
                  {value.title}
                </h3>

                <p>
                  {value.description}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          EXPERIENCE
      ========================================= */}

      <section className="about-experience section">

        <div className="container">

          <div className="experience-card">

            <div className="experience-content">

              <span className="section-label">
                Notre vision
              </span>

              <h2>
                Rendre le quotidien
                <span> plus simple.</span>
              </h2>

              <p>
                Nous voulons que trouver un outil utile pour la classe
                soit aussi simple que possible. TeacherShine rassemble
                différentes catégories de produits dans un seul espace
                pensé autour des besoins des enseignants.
              </p>

              <div className="advantages-list">

                {advantages.map((advantage) => (
                  <div
                    className="advantage-item"
                    key={advantage}
                  >
                    <span className="advantage-check">
                      ✓
                    </span>

                    <span>
                      {advantage}
                    </span>
                  </div>
                ))}

              </div>

            </div>


            <div className="experience-visual">

              <div className="experience-circle experience-circle-one">
                ✦
              </div>

              <div className="experience-circle experience-circle-two">
                ★
              </div>

              <div className="experience-main-card">

                <span className="experience-card-icon">
                  ✦
                </span>

                <strong>
                  TeacherShine
                </strong>

                <span>
                  Pour chaque classe,
                  une petite touche en plus.
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CATEGORIES
      ========================================= */}

      <section className="about-categories section">

        <div className="container">

          <div className="about-section-heading">

            <span className="section-label">
              Notre univers
            </span>

            <h2>
              Tout pour enrichir
              <span> votre quotidien.</span>
            </h2>

            <p>
              Découvrez différents univers pensés pour accompagner
              vos activités, votre organisation et vos moments
              en classe.
            </p>

          </div>


          <div className="category-highlight-grid">

            <Link
              to="/shop"
              className="category-highlight category-teal"
            >
              <span className="category-highlight-icon">
                ✦
              </span>

              <div>
                <small>01</small>
                <h3>
                  Outils enseignants
                </h3>
                <p>
                  Des accessoires pratiques pour la classe.
                </p>
              </div>

              <span className="category-arrow">
                →
              </span>
            </Link>


            <Link
              to="/shop"
              className="category-highlight category-orange"
            >
              <span className="category-highlight-icon">
                ★
              </span>

              <div>
                <small>02</small>
                <h3>
                  Jeux éducatifs
                </h3>
                <p>
                  Apprendre tout en gardant le plaisir.
                </p>
              </div>

              <span className="category-arrow">
                →
              </span>
            </Link>


            <Link
              to="/shop"
              className="category-highlight category-yellow"
            >
              <span className="category-highlight-icon">
                ♡
              </span>

              <div>
                <small>03</small>
                <h3>
                  Récompenses
                </h3>
                <p>
                  Valoriser les efforts et les réussites.
                </p>
              </div>

              <span className="category-arrow">
                →
              </span>
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="about-cta">

        <div className="about-cta-decoration about-cta-one">
          ✦
        </div>

        <div className="about-cta-decoration about-cta-two">
          ★
        </div>

        <div className="container">

          <div className="about-cta-content">

            <span className="about-cta-eyebrow">
              Prêt à découvrir TeacherShine ?
            </span>

            <h2>
              Faites briller
              <br />
              votre quotidien.
            </h2>

            <p>
              Découvrez notre sélection de produits pensés
              pour les enseignants.
            </p>

            <Link
              to="/shop"
              className="about-cta-button"
            >
              Découvrir la boutique
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;