// Informations centrales du cabinet : à modifier ici, elles se répercutent sur tout le site.
export default {
  url: "https://www.isabelle-gayet.fr",
  // Version de démonstration (GitHub Pages) : jamais indexée par les moteurs
  demo: process.env.SITE_ENV === "demo",
  marque: "Gaïaroma",
  nom: "Isabelle Gayet",
  metier: "Naturopathe",
  accroche: "Votre coaching en santé naturelle et bien-être, à distance ou au cabinet à Saint-Germain-sur-Morin",

  telephone: "06 78 89 21 06",
  telephoneLien: "tel:+33678892106",
  email: "igayet77@gmail.com",

  adresse: {
    rue: "6 rue de Melun",
    codePostal: "77860",
    ville: "Saint-Germain-sur-Morin",
    departement: "Seine-et-Marne",
    lat: 48.8754,
    lon: 2.8521,
  },
  itineraire: "https://www.google.com/maps/dir/?api=1&destination=6+rue+de+Melun+77860+Saint-Germain-sur-Morin",
  gare: "Couilly – Saint-Germain – Quincy (Transilien ligne P)",

  // Prise de rendez-vous en ligne : Medoucine (choix conservé)
  rdv: "https://www.medoucine.com/consultation/-/isabelle-gayet/4011?utm_source=bouton-rdv&utm_medium=pack-com&utm_campaign=isabelle-gayet",
  medoucine: "https://www.medoucine.com/consultation/-/isabelle-gayet/4011",
  google: "https://www.google.com/maps?cid=16624141070815695465",
  instagram: "https://www.instagram.com/isabellegayet_naturo/",
  instagramPseudo: "@isabellegayet_naturo",

  // Formulaire de contact : renseigner l'URL d'un service (Formspree, Web3Forms…) pour un envoi direct.
  // Laissé vide, le formulaire ouvre la messagerie du visiteur avec le message pré-rempli.
  formulaireAction: "",

  siret: "910 219 351 00020",
  statut: "Entrepreneur individuel",
  tribunal: "Meaux",

  // Hébergeur du site, à confirmer à la mise en ligne (mentions légales)
  hebergeur: {
    nom: "GitHub Inc. (GitHub Pages)",
    adresse: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
    site: "https://pages.github.com",
  },

  tarifs: [
    {
      nom: "Première consultation",
      sousTitre: "Bilan de vitalité + programme individualisé",
      prix: 80,
      duree: "1h45 à 2h",
      details: ["Au cabinet ou en visio", "Programme individualisé envoyé par mail sous 3 à 4 jours"],
      vedette: true,
    },
    {
      nom: "Consultation de suivi",
      sousTitre: "Si bilan de moins d'un an",
      prix: 50,
      duree: "45 mn à 1h",
      details: ["Au cabinet ou en visio", "Ajustement de votre programme"],
    },
    {
      nom: "Séance de TeLiPro seule",
      sousTitre: "Technique de libération profonde",
      prix: 50,
      duree: "45 à 60 mn",
      details: ["Uniquement au cabinet"],
    },
  ],

  // Communes proches du cabinet (Saint-Germain-sur-Morin)
  villes: [
    "Couilly-Pont-aux-Dames",
    "Quincy-Voisins",
    "Esbly",
    "Montry",
    "Coupvray",
    "Chessy",
    "Serris",
    "Magny-le-Hongre",
    "Bailly-Romainvilliers",
    "Crécy-la-Chapelle",
    "Lagny-sur-Marne",
    "Meaux",
  ],
};
