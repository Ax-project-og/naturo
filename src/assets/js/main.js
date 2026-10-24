document.documentElement.classList.add("js");

// En-tête : ombre au défilement
const header = document.querySelector(".site-header");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") !== "true";
  navToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
});

// Sous-menus
const subToggles = document.querySelectorAll(".nav__sub-toggle");
const closeSubs = (except) =>
  subToggles.forEach((t) => t !== except && t.setAttribute("aria-expanded", "false"));
subToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = toggle.getAttribute("aria-expanded") !== "true";
    closeSubs(toggle);
    toggle.setAttribute("aria-expanded", String(open));
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav__item--has-sub")) closeSubs();
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const openToggle = [...subToggles].find((t) => t.getAttribute("aria-expanded") === "true");
  closeSubs();
  openToggle?.focus();
});

// Apparition douce des blocs
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }),
    { rootMargin: "0px 0px -60px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Filtres du blog
const filters = document.querySelectorAll("[data-filter]");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = cat !== "tous" && card.dataset.category !== cat;
    });
  });
});

// Formulaire de contact : envoi vers un service si configuré, sinon messagerie du visiteur
const form = document.querySelector("[data-contact-form]");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const status = form.querySelector(".form__status");
  const data = new FormData(form);

  if (form.getAttribute("action")) {
    status.textContent = "Envoi en cours…";
    status.className = "form__status";
    try {
      const res = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      status.textContent = "Merci, votre message est bien envoyé. Je vous réponds dans la journée.";
      status.classList.add("form__status--ok");
    } catch {
      status.textContent = `L'envoi n'a pas abouti. Vous pouvez m'écrire directement à ${form.dataset.email} ou m'appeler.`;
      status.classList.add("form__status--err");
    }
    return;
  }

  const lignes = [
    data.get("message"),
    "",
    `${data.get("prenom")} ${data.get("nom")}`,
    data.get("email"),
    data.get("telephone"),
  ].filter((l) => l !== null);
  const sujet = data.get("sujet") || "Demande d'information";
  window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(lignes.join("\n"))}`;
  status.textContent = "Votre messagerie s'ouvre avec le message pré-rempli : il ne reste qu'à l'envoyer.";
  status.className = "form__status form__status--ok";
});
