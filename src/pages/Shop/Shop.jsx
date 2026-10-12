
import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiChevronRight,
  FiGrid,
  FiPenTool,
  FiSearch,
  FiSliders,
  FiStar,
  FiTarget,
  FiX,
  FiFilter,
  FiEdit3,
  FiPackage,
} from "react-icons/fi";

import products from "../../data/products";
import ProductGrid from "../../components/products/ProductGrid";

import "./Shop.css";

const categories = [
  {
    name: "Outils enseignants",
    slug: "outils-enseignants",
    Icon: FiPenTool,
  },
  {
    name: "Sacs & trousses",
    slug: "sacs-trousses",
    Icon: FiBriefcase,
  },
  {
    name: "Jeux éducatifs",
    slug: "jeux-educatifs",
    Icon: FiGrid,
  },
  {
    name: "Stickers & tampons",
    slug: "stickers-tampons",
    Icon: FiStar,
  },
  {
    name: "Accessoires",
    slug: "accessoires",
    Icon: FiEdit3,
  },
  {
    name: "Accessoires magnétiques",
    slug: "accessoires-magnetiques",
    Icon: FiPackage,
  },
  {
    name: "Activités",
    slug: "activites",
    Icon: FiPackage,
  },
  {
    name: "Récompenses",
    slug: "recompenses",
    Icon: FiAward,
  },
  {
    name: "Journal & Cahier",
    slug: "journal-cahier",
    Icon: FiBookOpen,
  },
  {
    name: "Stratégie",
    slug: "stratégie",
    Icon: FiTarget,
  },
];
const sortOptions = [
  { value: "default", label: "Ordre recommandé" },
  { value: "price-asc", label: "Prix : croissant" },
  { value: "price-desc", label: "Prix : décroissant" },
  { value: "name-asc", label: "Nom : A → Z" },
  { value: "name-desc", label: "Nom : Z → A" },
];

const normalizeText = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .trim();

function Shop() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    const searchValue = normalizeText(search);

    const result = products.filter((product) => {
      const matchesSearch =
        !searchValue ||
        [
          product.name,
          product.category,
          product.description,
        ].some((value) => normalizeText(value).includes(searchValue));

      const matchesCategory =
        selectedCategory === "all" ||
        product.categorySlug === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // On trie une nouvelle liste, sans modifier products.
    switch (sortBy) {
      case "price-asc":
        result.sort(
          (a, b) => Number(a.price || 0) - Number(b.price || 0)
        );
        break;

      case "price-desc":
        result.sort(
          (a, b) => Number(b.price || 0) - Number(a.price || 0)
        );
        break;

      case "name-asc":
        result.sort((a, b) =>
          String(a.name ?? "").localeCompare(
            String(b.name ?? ""),
            "fr",
            { sensitivity: "base" }
          )
        );
        break;

      case "name-desc":
        result.sort((a, b) =>
          String(b.name ?? "").localeCompare(
            String(a.name ?? ""),
            "fr",
            { sensitivity: "base" }
          )
        );
        break;

      default:
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const activeCategory = useMemo(
    () => categories.find((category) => category.slug === selectedCategory),
    [selectedCategory]
  );

  const hasFilters =
    search.trim() !== "" ||
    selectedCategory !== "all" ||
    sortBy !== "default";

  const resetFilters = useCallback(() => {
    setSearch("");
    setSelectedCategory("all");
    setSortBy("default");
  }, []);

  const selectCategory = useCallback((slug) => {
    setSelectedCategory(slug);
  }, []);

  return (
    <main className="shop-page">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-hero-orb shop-hero-orb--one" aria-hidden="true" />
        <div className="shop-hero-orb shop-hero-orb--two" aria-hidden="true" />

        <div className="container shop-hero-container">
          <div className="shop-hero-content">
            <div className="shop-eyebrow">
              <FiStar aria-hidden="true" />
              <span>La boutique Teacher Shine</span>
            </div>

            <h1>
              Tout ce qu’il faut pour
              <span> une classe inspirante.</span>
            </h1>

            <p>
              Découvrez des outils, accessoires, jeux et récompenses
              imaginés pour accompagner les enseignants au quotidien.
            </p>

            <nav className="shop-breadcrumb" aria-label="Fil d’Ariane">
              <Link to="/">Accueil</Link>
              <FiChevronRight aria-hidden="true" />
              <span aria-current="page">Boutique</span>
            </nav>
          </div>
        </div>
      </section>

      {/* CONTENU DE LA BOUTIQUE */}
      <section className="shop-content section">
        <div className="container shop-container">
          {/* EN-TÊTE */}
          <header className="shop-heading">
            <div className="shop-heading-copy">
              <span className="shop-section-kicker">
                À vous de découvrir
              </span>

              <h2>Explorez notre boutique</h2>

              <p>
                Trouvez facilement les accessoires et outils qui vous
                accompagnent en classe.
              </p>
            </div>

            <div className="shop-result-count" aria-live="polite">
              <span className="shop-result-number">
                {filteredProducts.length}
              </span>
              <span>
                {filteredProducts.length > 1 ? "produits" : "produit"}
              </span>
            </div>
          </header>

          {/* RECHERCHE ET TRI */}
          <div className="shop-toolbar">
            <label className="shop-search-box">
              <FiSearch
                className="shop-search-icon"
                aria-hidden="true"
              />

              <span className="shop-visually-hidden">
                Rechercher un produit
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un produit, un accessoire..."
                aria-label="Rechercher un produit"
                autoComplete="off"
              />

              {search && (
                <button
                  type="button"
                  className="shop-icon-button shop-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Effacer la recherche"
                >
                  <FiX aria-hidden="true" />
                </button>
              )}
            </label>

            <label className="shop-sort-control">
              <FiFilter
                className="shop-sort-icon"
                aria-hidden="true"
              />

              <span className="shop-visually-hidden">Trier les produits</span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Trier les produits"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* FILTRES PAR CATÉGORIE */}
          <section
            className="shop-category-panel"
            aria-labelledby="shop-category-title"
          >
            <div className="shop-filter-heading">
              <div className="shop-filter-heading-icon">
                <FiSliders aria-hidden="true" />
              </div>

              <div className="shop-filter-heading-copy">
                <h3 id="shop-category-title">
                  Parcourir par catégorie
                </h3>
                <p>
                  Affinez votre recherche en sélectionnant une catégorie.
                </p>
              </div>

              <span className="shop-category-total">
                {categories.length} catégories
              </span>
            </div>

            <div className="shop-category-list">
              <button
                type="button"
                className={`shop-category-chip ${
                  selectedCategory === "all" ? "is-active" : ""
                }`}
                onClick={() => selectCategory("all")}
                aria-pressed={selectedCategory === "all"}
              >
                <span className="shop-category-icon">
                  <FiGrid aria-hidden="true" />
                </span>

                <span className="shop-category-name">Tout voir</span>

                {selectedCategory === "all" && (
                  <span className="shop-chip-check" aria-hidden="true">
                    <FiCheck />
                  </span>
                )}
              </button>

              {categories.map(({ name, slug, Icon }) => {
                const isActive = selectedCategory === slug;

                return (
                  <button
                    type="button"
                    key={slug}
                    className={`shop-category-chip ${
                      isActive ? "is-active" : ""
                    }`}
                    onClick={() => selectCategory(slug)}
                    aria-pressed={isActive}
                  >
                    <span className="shop-category-icon">
                      <Icon aria-hidden="true" />
                    </span>

                    <span className="shop-category-name">{name}</span>

                    {isActive && (
                      <span className="shop-chip-check" aria-hidden="true">
                        <FiCheck />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* FILTRES ACTIFS */}
          {hasFilters && (
            <div className="shop-active-filters">
              <div className="shop-active-filters-list">
                <span className="shop-active-label">
                  <FiSliders aria-hidden="true" />
                  Votre sélection
                </span>

                {search.trim() && (
                  <button
                    type="button"
                    className="shop-active-chip"
                    onClick={() => setSearch("")}
                    aria-label="Retirer la recherche"
                  >
                    <span className="shop-active-chip-text">
                      Recherche : {search.trim()}
                    </span>
                    <FiX aria-hidden="true" />
                  </button>
                )}

                {activeCategory && (
                  <button
                    type="button"
                    className="shop-active-chip"
                    onClick={() => setSelectedCategory("all")}
                    aria-label={`Retirer la catégorie ${activeCategory.name}`}
                  >
                    <span className="shop-active-chip-text">
                      {activeCategory.name}
                    </span>
                    <FiX aria-hidden="true" />
                  </button>
                )}

                {sortBy !== "default" && (
                  <button
                    type="button"
                    className="shop-active-chip"
                    onClick={() => setSortBy("default")}
                    aria-label="Réinitialiser le tri"
                  >
                    <span className="shop-active-chip-text">
                      {sortOptions.find(
                        (option) => option.value === sortBy
                      )?.label}
                    </span>
                    <FiX aria-hidden="true" />
                  </button>
                )}
              </div>

              <button
                type="button"
                className="shop-reset-button"
                onClick={resetFilters}
              >
                Tout effacer
              </button>
            </div>
          )}

          {/* RÉSULTATS */}
          <div className="shop-results-heading">
            <div>
              <h3>
                {activeCategory ? activeCategory.name : "Nos produits"}
              </h3>

              <p>
                {filteredProducts.length === 0
                  ? "Aucun résultat pour votre sélection."
                  : `${filteredProducts.length} ${
                      filteredProducts.length > 1
                        ? "articles disponibles"
                        : "article disponible"
                    }`}
              </p>
            </div>

            {hasFilters && (
              <button
                type="button"
                className="shop-inline-reset"
                onClick={resetFilters}
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* GRILLE DE PRODUITS */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="shop-empty-state" role="status">
              <div className="shop-empty-icon">
                <FiSearch aria-hidden="true" />
              </div>

              <h3>Aucun produit trouvé</h3>

              <p>
                Nous n’avons pas trouvé d’article correspondant à votre
                sélection. Essayez un autre mot-clé ou une autre catégorie.
              </p>

              <button
                type="button"
                className="shop-empty-reset"
                onClick={resetFilters}
              >
                <FiGrid aria-hidden="true" />
                Voir tous les produits
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Shop;
