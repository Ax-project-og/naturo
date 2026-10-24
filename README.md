# Site Gaïaroma — Isabelle Gayet, naturopathe

Refonte du site https://www.isabelle-gayet.fr, générée en statique avec [Eleventy](https://www.11ty.dev/).

## Démarrer

```sh
npm install
npm start        # serveur local avec rechargement : http://localhost:8080
npm run build    # génère le site dans _site/
npm run images   # régénère les images optimisées (logo, portrait, favicons) depuis contenu-original/images
```

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Téléphone, adresse, tarifs, liens Medoucine/Google/Instagram, villes, SIRET | `src/_data/site.js` |
| Menu | `src/_data/navigation.js` |
| Témoignages | `src/_data/temoignages.js` |
| Catégories du blog | `src/_data/categories.js` |
| Nouvel article | un fichier `.md` dans `src/blog/articles/` (copier l'en-tête d'un article existant) |
| Pages | `src/*.njk` |
| Styles | `src/assets/css/style.css` |

Le formulaire de contact ouvre la messagerie du visiteur ; pour un envoi direct, renseigner
`formulaireAction` dans `src/_data/site.js` avec l'URL d'un service de formulaires (Formspree, Web3Forms…).

## Mise en ligne

Le workflow `.github/workflows/deploy.yml` publie le site sur GitHub Pages à chaque push sur `main`
(activer « GitHub Actions » comme source dans Settings → Pages, puis configurer le domaine
`www.isabelle-gayet.fr`). Les URL de l'ancien site sont conservées à l'identique : pas de redirection
nécessaire.
