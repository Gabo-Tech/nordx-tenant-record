(function () {
  var map;
  var marker;
  var point = [47.3871128, 8.537411];

  function popupHtml(lang) {
    if (lang === "en") {
      return "<strong>Nordstrasse 70</strong><br>8006 Zürich<br>NordX – The NEXT Student Home<br>NextGen Properties, near Letten";
    }
    return "<strong>Nordstrasse 70</strong><br>8006 Zürich<br>NordX – The NEXT Student Home<br>NextGen Properties, nahe Letten";
  }

  function syncChrome(lang, announce) {
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var group = document.getElementById("lang-switch");
    if (group) {
      group.setAttribute("aria-label", lang === "en" ? "Language" : "Sprache");
    }
    var live = document.getElementById("lang-status");
    if (announce && live) live.textContent = lang === "en" ? "English" : "Deutsch";
    var mapRegion = document.getElementById("map");
    if (mapRegion) {
      mapRegion.setAttribute(
        "aria-label",
        lang === "en"
          ? "Map of Nordstrasse 70, 8006 Zürich"
          : "Karte der Nordstrasse 70, 8006 Zürich"
      );
    }
    if (marker) marker.setPopupContent(popupHtml(lang));
    if (map) map.invalidateSize();
  }

  function setLang(lang) {
    if (lang !== "de" && lang !== "en") lang = "de";
    if (typeof window.__applyRecordLang === "function") {
      window.__applyRecordLang(lang);
    } else {
      document.documentElement.lang = lang;
    }
    try {
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    } catch (e) {}
    syncChrome(lang, true);
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });

  syncChrome(window.__recordLang || document.documentElement.lang || "de", false);

  var reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  if (window.AOS && !reduce) {
    document.documentElement.classList.add("aos-ready");
    window.AOS.init({
      duration: 650,
      once: true,
      offset: 28,
      easing: "ease-out"
    });
  } else {
    document.documentElement.classList.add("no-aos");
  }

  var mapEl = document.getElementById("map");
  if (mapEl && window.L) {
    map = L.map(mapEl, {
      scrollWheelZoom: false,
      attributionControl: true
    }).setView(point, 17);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    marker = L.marker(point).addTo(map);
    marker.bindPopup(popupHtml(window.__recordLang || "de"), { autoPan: false });
  } else {
    document.documentElement.classList.add("no-aos");
  }
})();
