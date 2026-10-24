// Construit le graphe schema.org (JSON-LD) d'une page.
const cleanUrl = (url) => (url === "/index.html" ? "/" : url.replace(/\.html$/, ""));

export function schemaGraph(site, { url, fil, isArticle, title, description, date, modifie }) {
  const abs = (path) => new URL(path, site.url).href;

  const cabinet = {
    "@type": "HealthAndBeautyBusiness",
    "@id": `${site.url}/#cabinet`,
    name: site.marque,
    alternateName: `${site.nom}, naturopathe`,
    description:
      "Cabinet de naturopathie et santé naturelle à Saint-Germain-sur-Morin (77) : bilan de vitalité, phytothérapie, aromathérapie, micronutrition, gestion des émotions et TeLiPro, au cabinet ou en visio.",
    url: `${site.url}/`,
    logo: abs("/assets/img/logo-gaiaroma.png"),
    image: abs("/assets/img/partage-gaiaroma.jpg"),
    telephone: site.telephoneLien.replace("tel:", ""),
    email: site.email,
    priceRange: "50 € – 80 €",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adresse.rue,
      addressLocality: site.adresse.ville,
      postalCode: site.adresse.codePostal,
      addressRegion: site.adresse.departement,
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.adresse.lat, longitude: site.adresse.lon },
    areaServed: [
      { "@type": "City", name: site.adresse.ville },
      ...site.villes.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: site.adresse.departement },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Consultations",
      itemListElement: site.tarifs.map((t) => ({
        "@type": "Offer",
        name: t.nom,
        price: String(t.prix),
        priceCurrency: "EUR",
      })),
    },
    founder: { "@id": `${site.url}/#isabelle-gayet` },
    sameAs: [site.instagram, site.medoucine],
  };

  const personne = {
    "@type": "Person",
    "@id": `${site.url}/#isabelle-gayet`,
    name: site.nom,
    jobTitle: "Naturopathe",
    url: abs("/isabelle-gayet-a-saint-germain-sur-morin-77860"),
    image: abs("/assets/img/isabelle-gayet.jpg"),
    worksFor: { "@id": `${site.url}/#cabinet` },
    knowsAbout: ["Naturopathie", "Phytothérapie", "Aromathérapie", "Gemmothérapie", "Micronutrition", "PNL", "Analyse transactionnelle", "TeLiPro"],
    sameAs: [site.instagram],
  };

  const graph = [cabinet, personne];

  if (fil?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [{ titre: "Accueil", url: "/" }, ...fil]
        .filter((item, i, all) => item.url || i === all.length - 1)
        .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.titre,
        item: abs(item.url || cleanUrl(url)),
      })),
    });
  }

  if (isArticle) {
    const iso = (d) => new Date(d).toISOString().slice(0, 10);
    graph.push({
      "@type": "BlogPosting",
      headline: title,
      description,
      datePublished: iso(date),
      dateModified: iso(modifie || date),
      author: { "@id": `${site.url}/#isabelle-gayet` },
      publisher: { "@id": `${site.url}/#cabinet` },
      mainEntityOfPage: abs(cleanUrl(url)),
      inLanguage: "fr-FR",
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}
