(function () {
  var STORAGE_KEY = "cv-theme";
  var MOBILE_BREAKPOINT = 720;

  /* ── Theme ───────────────────────────────────────────── */
  function getPreferredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ── Collapsible sections (mobile only) ────────────── */
  var sections = document.querySelectorAll("[data-collapsible]");
  var mobileQuery = window.matchMedia("(max-width: " + MOBILE_BREAKPOINT + "px)");

  function isMobile() {
    return mobileQuery.matches;
  }

  function setSectionExpanded(section, expanded) {
    section.toggleAttribute("data-collapsed", !expanded);
    var btn = section.querySelector(".cv-section__toggle");
    if (btn) btn.setAttribute("aria-expanded", String(expanded));
  }

  function initCollapsible() {
    sections.forEach(function (section) {
      setSectionExpanded(section, true);
    });
  }

  sections.forEach(function (section) {
    var btn = section.querySelector(".cv-section__toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      if (!isMobile()) return;
      var expanded = btn.getAttribute("aria-expanded") === "true";
      setSectionExpanded(section, !expanded);
    });
  });

  initCollapsible();

  mobileQuery.addEventListener("change", initCollapsible);

  /* ── Avatar fallback ─────────────────────────────────── */
  document.querySelectorAll(".photo__img").forEach(function (img) {
    var frame = img.closest(".photo__frame");
    if (!frame) return;

    function useInitials() {
      frame.classList.remove("photo__frame--loaded");
      img.removeAttribute("src");
    }

    function usePhoto() {
      frame.classList.add("photo__frame--loaded");
    }

    img.addEventListener("load", function () {
      if (img.naturalWidth > 0) usePhoto();
      else useInitials();
    });

    img.addEventListener("error", useInitials);

    if (img.complete) {
      if (img.naturalWidth > 0) usePhoto();
      else useInitials();
    }
  });
})();
