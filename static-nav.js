(function () {
  "use strict";

  function initStaticNavigation() {
    var trigger = document.getElementById("s9iPrd");
    var drawer = document.getElementById("yuynLe");

    if (!trigger || !drawer || trigger.dataset.staticNavReady === "true") {
      return;
    }

    trigger.dataset.staticNavReady = "true";
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-controls", drawer.id);

    var backdrop = document.createElement("div");
    backdrop.id = "static-nav-backdrop";
    backdrop.hidden = true;
    document.body.appendChild(backdrop);

    function isOpen() {
      return drawer.classList.contains("jsnVQ");
    }

    function setOpen(open, returnFocus) {
      drawer.classList.toggle("jsnVQ", open);
      drawer.setAttribute("aria-hidden", String(!open));
      trigger.setAttribute("aria-expanded", String(open));
      trigger.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );
      backdrop.hidden = !open;
      document.body.classList.toggle("static-nav-open", open);

      if (open) {
        var firstLink = drawer.querySelector("a[href]");
        if (firstLink) {
          firstLink.focus();
        }
      } else if (returnFocus) {
        trigger.focus();
      }
    }

    function toggleFromTrigger(event) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!isOpen(), false);
    }

    trigger.addEventListener("click", toggleFromTrigger);
    trigger.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        toggleFromTrigger(event);
      }
    });

    backdrop.addEventListener("click", function () {
      setOpen(false, true);
    });

    drawer.querySelectorAll("a[href]").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false, false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false, true);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768 && isOpen()) {
        setOpen(false, false);
      }
    });

    setOpen(false, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStaticNavigation);
  } else {
    initStaticNavigation();
  }
})();
