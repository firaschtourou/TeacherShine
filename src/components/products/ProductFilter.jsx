import "./ProductFilter.css";

function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="product-filter">

      <div className="category-filter">

        <button
          type="button"
          className={`category-button ${
            selectedCategory === "all" ? "active" : ""
          }`}
          onClick={() => onCategoryChange("all")}
        >
          Tous
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category.slug}
            className={`category-button ${
              selectedCategory === category.slug ? "active" : ""
            }`}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.name}
          </button>
        ))}

      </div>

      <div className="sort-container">

        <label htmlFor="product-sort">
          Trier par
        </label>

        <select
          id="product-sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">
            Pertinence
          </option>

          <option value="price-asc">
            Prix : croissant
          </option>

          <option value="price-desc">
            Prix : décroissant
          </option>

          <option value="name-asc">
            Nom : A → Z
          </option>

          <option value="name-desc">
            Nom : Z → A
          </option>
        </select>

      </div>

    </div>
  );
}

export default ProductFilter;