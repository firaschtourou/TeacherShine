import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import products from "../../data/products";
import ProductSearch from "../../components/products/ProductSearch";
import ProductFilter from "../../components/products/ProductFilter";
import ProductGrid from "../../components/products/ProductGrid";

import "./Shop.css";

const categories = [
  {
    name: "Outils enseignants",
    slug: "outils-enseignants",
  },
  {
    name: "Sacs & trousses",
    slug: "sacs-trousses",
  },
  {
    name: "Jeux éducatifs",
    slug: "jeux-educatifs",
  },
  {
    name: "Stickers & tampons",
    slug: "stickers-tampons",
  },
  {
    name: "Accessoires",
    slug: "accessoires",
  },
  {
    name: "Accessoires magnétiques",
    slug: "accessoires-magnetiques",
  },
  {
    name: "Activités",
    slug: "activites",
  },
  {
    name: "Récompenses",
    slug: "recompenses",
  },
   {
    name: "Journal & Cahier",
    slug: "journal-cahier",
   
  },
   {
    name: "Stratégie",
    slug: "stratégie",
   
  },
];

function Shop() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Recherche
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchValue) ||
          product.category.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue)
        );
      });
    }

    // Catégorie
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.categorySlug === selectedCategory
      );
    }

    // Tri
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name-asc":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "name-desc":
        result.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      default:
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  const hasFilters =
    search !== "" ||
    selectedCategory !== "all" ||
    sortBy !== "default";

  return (
    <div className="shop-page">

      {/* HERO */}

      <section className="shop-hero">

        <div className="shop-hero-decoration shop-decoration-one">
          ✦
        </div>

        <div className="shop-hero-decoration shop-decoration-two">
          ●
        </div>

        <div className="container">

          <div className="shop-hero-content">

            <span className="shop-eyebrow">
              ✦ La boutique TeacherShine
            </span>

            <h1>
              Tout ce qu'il faut pour
              <span> une classe inspirante.</span>
            </h1>

            <p>
              Découvrez notre sélection d'outils, accessoires,
              jeux et récompenses pensés pour accompagner
              les enseignants au quotidien.
            </p>

            <div className="shop-breadcrumb">
              <Link to="/">
                Accueil
              </Link>

              <span> / </span>

              <span>Boutique</span>
            </div>

          </div>

        </div>

      </section>


      {/* SHOP CONTENT */}

      <section className="shop-content section">

        <div className="container">

          {/* TOP BAR */}

          <div className="shop-toolbar">

            <ProductSearch
              value={search}
              onChange={setSearch}
            />

            <div className="shop-result-count">
              <strong>
                {filteredProducts.length}
              </strong>

              <span>
                {filteredProducts.length > 1
                  ? " produits"
                  : " produit"}
              </span>
            </div>

          </div>


          {/* FILTERS */}

          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />


          {/* ACTIVE FILTERS */}

          {hasFilters && (
            <div className="active-filters">

              <div className="active-filter-text">
                Filtres actifs
              </div>

              <button
                type="button"
                onClick={resetFilters}
              >
                Réinitialiser ×
              </button>

            </div>
          )}


          {/* PRODUCTS */}

          <ProductGrid
            products={filteredProducts}
          />

        </div>

      </section>

    </div>
  );
}

export default Shop;