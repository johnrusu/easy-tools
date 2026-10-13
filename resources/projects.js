(() => {
  const cards = [...document.querySelectorAll(".project-card")];
  const filters = [...document.querySelectorAll(".filter")];
  const search = document.getElementById("projectSearch");
  const count = document.getElementById("projectCount");
  const status = document.getElementById("resultsStatus");
  const emptyState = document.getElementById("emptyState");
  let category = "all";

  function updateProjects() {
    const query = search.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesCategory =
        category === "all" || card.dataset.category === category;
      const matchesQuery = card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !(matchesCategory && matchesQuery);
      if (!card.hidden) visibleCount++;
    });
    count.textContent = visibleCount.toString().padStart(2, "0");
    emptyState.hidden = visibleCount !== 0;
    status.textContent =
      category === "all" && !query
        ? ""
        : `Showing ${visibleCount} of ${cards.length} projects`;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      filters.forEach((filter) =>
        filter.setAttribute("aria-pressed", String(filter === button)),
      );
      updateProjects();
    });
  });
  search.addEventListener("input", updateProjects);
  document.getElementById("resetFilters").addEventListener("click", () => {
    search.value = "";
    filters[0].click();
    search.focus();
  });
  updateProjects();
})();
