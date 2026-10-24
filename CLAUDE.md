# Refonte du site Gaïaroma — Isabelle Gayet, naturopathe

Site actuel : https://www.isabelle-gayet.fr (Simplébo, thème générique). Objectif : reconstruire
un site plus pro et abouti (structure, ergonomie, UX/UI, SEO) en **gardant son identité visuelle**
(logo, couleurs) et sa voix. Analyse faite le 24/10/2026 sur les 21 pages du site.
Audit SEO complémentaire : `Kit SEO Gaïaroma.html` (Claude Web, 16/10/2026, note 44/100).

## Règles du projet (validées par le client)
- **Textes** : c'est Isabelle qui les a écrits. On ne les réécrit PAS : on les **réorganise**
  librement (découpage, ordre, répartition entre pages, intertitres, mise en forme). Ajouts ou
  retouches ponctuels autorisés pour la cohérence avec la nouvelle structure (transitions,
  liens, corrections de coquilles, conformité), mais le cœur et la voix restent les siens.
- **Logo** : conservé tel quel.
- **Medoucine** : conservé comme outil de prise de RDV (choix assumé).
- **Témoignages** : tous conservés tels quels, y compris ceux mentionnant diabète, endométriose
  ou arrêt d'anti-inflammatoires (décision du client, ne pas les retirer ni les reformuler).
- **Tout le reste** (structure, UX, UI, design, technique, SEO) : carte blanche. Les infos
  manquantes peuvent être récupérées en ligne (registres officiels, etc.).
- Textes d'origine sauvegardés dans `contenu-original/` (ne pas modifier).

## 0. Le nouveau site (état au 24/10/2026)

**Stack** : Eleventy 3 (Nunjucks + Markdown), CSS et JS vanilla sans framework, polices Fraunces
(titres) + Nunito Sans (texte) auto-hébergées via @fontsource, aucun cookie ni traceur.
Commandes : `npm start` (http://localhost:8080), `npm run build` (→ `_site/`), `npm run images`.
Déploiement prévu : GitHub Pages via `.github/workflows/deploy.yml` (repo Ax-project-og/naturo).

**Structure**
- `src/_data/site.js` : toutes les infos du cabinet (tél., adresse, tarifs, liens, villes, SIRET, hébergeur).
- `src/_data/navigation.js`, `temoignages.js`, `categories.js`.
- `src/_includes/layouts/` (base, article), `partials/` (header, footer, cta, tarifs, carte, schema…),
  `icons.njk` (macro d'icônes SVG inline).
- `lib/schema.js` : JSON-LD (HealthAndBeautyBusiness, Person, BreadcrumbList, BlogPosting).
- Pages : `src/*.njk` ; articles : `src/blog/articles/*.md` (front matter : title, seoTitle,
  description, date, categorie, chapo, commentaires).
- `scripts/prepare-images.js` : génère logo complet, symbole seul (en-tête/favicons), portrait,
  image de partage, depuis `contenu-original/images`.

**Conventions**
- URL de l'ancien site conservées à l'identique : chaque page sort en `/slug.html` (permalink) et
  est liée/canonisée sans extension via le filtre `cleanUrl`. Ne pas changer un permalink existant.
- Nouvelle page créée : `/telipro-technique-de-liberation-profonde`. Pages catégories du blog en noindex.
- Front matter : `title` (= balise title, ≤ 60 car.), `description` (≤ 160), `fil` (fil d'Ariane).
- Nunjucks : `selectattr` n'accepte pas de comparaison → utiliser les filtres `findBy` / `filterBy`.
- Mobile : barre d'appel fixe (Appeler / Prendre RDV). Menu burger ≤ 1200 px.
- Vérifier le rendu avec Chrome headless + puppeteer-core (extension Chrome non connectée).

**Choix faits pendant la construction**
- Accueil : H1 « Bien dans votre peau, bien dans votre tête » précédé de « Isabelle Gayet ·
  Naturopathe à Saint-Germain-sur-Morin » (dans le H1). Pas de photo de banque d'images :
  visuels construits autour du logo, couvertures d'articles illustrées en SVG par catégorie.
- « La consultation » : les deux déroulés de l'ancien site fusionnés en une frise de 5 étapes + FAQ
  dont les réponses reprennent ses phrases.
- Formulaire d'avis interne remplacé par des boutons « Laisser un avis Google / Medoucine ».
- Formulaire de contact : ouvre la messagerie (mailto) tant que `formulaireAction` est vide.
- Carte : OpenStreetMap (sans cookies), centrée sur la rue de Melun (coordonnées approximatives).
- Témoignages : texte d'origine, seules des fautes d'orthographe évidentes corrigées.

**À valider / à fournir par Isabelle**
- Photos réelles (cabinet, portrait HD) ; le portrait actuel ne fait que 360×480.
- Forfaits coaching (contenu, prix) pour les afficher ; horaires éventuels (affiché : « sur rendez-vous »).
- Fiche Google encore nommée « Ferrières-en-Brie » (le lien `site.google` utilise son CID).
- Hébergeur final (mentions légales pré-remplies avec GitHub Pages) ; service de formulaire.
- Page Liberlo introuvable en ligne : mentionnée sans lien.
- Gare indiquée : Couilly – Saint-Germain – Quincy (ligne P), à confirmer.

## 1. Fiche d'identité

| | |
|---|---|
| Praticienne | Isabelle Gayet — marque **Gaïaroma** |
| Métier | Naturopathe (le site dit surtout « praticienne en santé naturelle » / « coach bien-être ») |
| Cabinet | 6 rue de Melun, 77860 Saint-Germain-sur-Morin (Seine-et-Marne) |
| Modes | Cabinet, visio (Google Meet), domicile ≤ 15 km sur demande |
| Public | Enfants, ados, adultes, seniors |
| Tél. / mail | 06 78 89 21 06 · igayet77@gmail.com |
| RDV en ligne | Medoucine : https://www.medoucine.com/consultation/-/isabelle-gayet/4011 (28 avis 5/5) |
| Réseaux | Instagram @isabellegayet_naturo · fiche Google (encore nommée « Ferrières-en-Brie ») · page Liberlo (cursus) |
| Horaires | **Nulle part** |
| SIRET | **910 219 351 00020** — EI « Isabelle Gayet (Fontana) », APE 96.09Z, créée le 31/01/2022 (source : annuaire-entreprises.data.gouv.fr ; absent des mentions légales actuelles) |

### Tarifs (page Infos pratiques uniquement)
- **Première consultation / bilan de vitalité** : 80 € — 1h45 à 2h, cabinet ou visio, programme individualisé envoyé par mail sous 3-4 jours
- **Suivi** : 50 € — 45 min à 1h (si bilan de moins d'un an)
- **Séance TeLiPro seule** : 50 € — 45-60 min, au cabinet uniquement
- **Appel découverte** : 15 min gratuit
- Forfaits dégressifs évoqués partout mais **jamais détaillés** ; ex. « Protocole 1.2.3 soleil » (blog 2023) : 300 € / 3 mois (bilan 1h30 + 5 suivis de 30 min + WhatsApp lun-sam)
- Pas de remboursement Sécu, possible par mutuelle ; facture détaillée remise

### Parcours & certifications
Ancienne salariée d'un grand groupe financier, puis mère au foyer de 5 enfants ; s'est formée aux
pratiques naturelles pour sa famille, puis en a fait son métier.
Certifications : praticienne en naturopathie · PNL (norme NLPNL) · phytothérapie · aromathérapie ·
gemmothérapie · analyse transactionnelle · TeLiPro · certification européenne de naturopathie « en cours ».

## 2. Sa vision de la naturopathie (à préserver dans les textes)

- **Holistique / « un esprit sain dans un corps sain »** : fil rouge du site. Corps et esprit
  indissociables ; citation d'Hippocrate « L'homme doit harmoniser l'esprit et le corps ».
  D'où la structure en deux axes : **Bien dans votre peau** (corps) / **Bien dans votre tête** (émotions).
- **Complémentaire de la médecine, jamais substitutive** : « je ne fais pas de diagnostic, je ne prescris
  pas de médicaments », vérifie que le patient est suivi médicalement. Approche dite « intégrative,
  humaniste, sécuritaire et scientifique ». Allopathie et naturel « indispensables l'une à l'autre ».
- **Pédagogie** : expliquer le « comment ça marche » (techniques, compléments, métabolisme, causes).
- **Coaching / disponibilité** : réponse sous 24 h par mail ou WhatsApp, prise de nouvelles entre
  les RDV, « je ne vous laisse jamais sans réponse ». Point différenciant fort.
- **Sur-mesure** : programme adapté aux goûts, habitudes, contraintes ; plaisir et motivation.
- **Le patient est le moteur** : public cible = personnes « motivées, dans une démarche de changement ».
- **TeLiPro comme « starter »** : technique issue des thérapies brèves / hypnose pour lever les
  blocages émotionnels dès la 1re séance. Élément très singulier, sous-exploité (pas de page dédiée).

### Méthode (page La consultation)
1. **Bilan de vitalité** (1re séance) : les 5 plans d'existence — physique, énergétique,
   environnemental, émotionnel, mental. Objectif réaliste défini ensemble. TeLiPro éventuellement.
2. **Programme** personnalisé (protocole, conseils, complémentation) envoyé par mail.
3. **Suivi** ~4 semaines après ; la plupart des cas = bilan + 1 à 3 suivis.
Programme corps en 3 étapes (page Bien dans votre peau) : **détox → revitalisation → stabilisation**.

### Outils cités
Phytothérapie, aromathérapie, gemmothérapie, macro/micronutrition, oligothérapie, hydrologie,
hygiène de vie, techniques manuelles, respiration/relaxation, activité physique ;
côté mental : PNL, TCC, analyse transactionnelle, TeLiPro, psychogénéalogie, thérapies brèves.

### Problématiques accompagnées (liste de La consultation)
Vitalité/fatigue, hygiène de vie, sommeil/stress/anxiété, troubles digestifs fonctionnels,
gynéco (SOPK, endométriose, aménorrhée, (pré)ménopause), douleurs articulaires, grossesse,
projet d'enfant/fertilité, poids, TDA(H), TCA, accompagnement en complément d'une pathologie.

### Ton éditorial
Chaleureux, enthousiaste, vouvoiement, beaucoup de questions rhétoriques,
écriture inclusive (« motivé.e »), émoticônes ponctuelles « :-)) ». Textes longs, peu structurés,
coquilles fréquentes. Blog plutôt expert et détaillé (posologies, contre-indications).

## 3. Arborescence actuelle (21 URL)

```
/                                              Accueil
/isabelle-gayet-a-saint-germain-sur-morin-77860  Qui suis-je ?
(menu « Pratiques », sans page)
  /bien-dans-votre-peau                        Corps
  /bien-dans-votre-tete                        Mental
/la-seance-de-naturopathie                     « La consultation » (menu) = « La séance » (footer)
/informations-pratiques-cabinet-de-coaching    Tarifs, accès
/temoignages-gaiaroma                          9 témoignages + formulaire d'avis
/prendre-rendez-vous-naturopathe               Contact (formulaire)
/blog  (+ 4 pages catégories quasi vides)      5 articles
/plan-du-site · /mentions-legales
```
Articles : détox de printemps (16/03/2023), alimentation détox (17/03/2023), protocole 1.2.3 soleil
(21/03/2023), cellulite (28/03/2023), fertilité (15/10/2025). Blog quasi à l'arrêt.

Contenu par page (résumé) :
- **Accueil** : accroche + citation, 3 blocs (consultations, pédagogie, coaching), 2 cartes
  peau/tête, présentation courte, bloc cabinet (adresse, villes, infos). Aucun tarif, aucun avis.
- **Qui suis-je** : approche, cadre légal, parcours, certifications. Mention Liberlo sans lien.
- **Bien dans votre peau** : 3 étapes + liste d'outils. **Bien dans votre tête** : PNL, TeLiPro,
  titre « Nouveau titre » oublié en ligne, 10 H3 d'un mot (« mots clés inspirants »).
- **La consultation** : déroulé (doublonné en 2 sections), liste de problématiques, « Pour qui ? ».
- **Infos pratiques** : tarifs, remboursement, cabinet, villes et bus **de l'ancien cabinet (Ferrières)**.
- **Témoignages** : Dominique, Emmanuel (TDAH), Manuel, Anne-Laure (articulaire, arrêt AINS),
  Pablo (diabète), Laure (digestif), Sophia (fatigue), Odile (endométriose), Marc-Aurèle (transit/peau/sommeil).
- **Contact** : tél., mail, formulaire (nom, prénom, email, tél., sujet, message).

## 4. Identité visuelle (à conserver)

- **Logo** : soleil jaune/orangé, globe bleu, profil de visage + jeune pousse verte, main qui
  recueille ; mot « gaïaroma » en script manuscrite noire. Fichier :
  https://files.sbcdnsb.com/images/gaU93WQE7ATdfucQfBpRiQ/businesses/1764004122/logo_gai_earoma_black.png
- **Couleurs du thème** : bleu ciel `#64b8e0` (principal), bleu canard `#256777` (foncé),
  jaune soleil `#fbda37` (accent, `#e7c933` hover), gris texte `#353535`, fond clair `#ecf1f4`, blanc.
  Le vert de la pousse du logo n'est pas exploité.
- **Typos** : Rozha One (titres, serif display), Quicksand (texte), Lucida Sans.
- **Photos** : 1 portrait selfie basse déf. (400 px) ; le reste = banques d'images (pot d'huile +
  lavande en hero, placeholder « image-demo.png »). **Aucune photo du cabinet.**

## 5. Diagnostic UX/UI et contenu (constats)

Structure & navigation
- Menu « Pratiques » sans page, découpage peau/tête abstrait pour un visiteur qui cherche par
  problème (sommeil, digestion, ménopause…). Pas de page par problématique ni de page TeLiPro.
- Libellés incohérents : « La consultation » / « La séance », « cabinet de coaching » dans l'URL.
- Le RDV envoie systématiquement vers Medoucine (sortie du site, nouvel onglet) ; pas de choix
  clair entre appeler / réserver / appel découverte gratuit.
- Tarifs absents de l'accueil et de la page consultation ; forfaits jamais détaillés.
- Témoignages isolés sur une page, absents des pages de conversion. Avis Medoucine/Google non valorisés.
- Pas d'horaires, pas de FAQ (déroulé visio, que préparer, combien de séances, remboursement…).

Contenu
- Positionnement flou : « coach bien-être », « praticienne santé naturelle », « naturopathe » mélangés ;
  le mot « naturopathe » absent des titles/H1 principaux.
- Murs de texte, répétitions (déroulé expliqué 2 fois), coquilles, H1 « Isabelle Gayet » en double.
- **Incohérence géographique** : villes desservies, carte Google, alt d'image et bus = Ferrières-en-Brie
  (ancien cabinet). Zone réelle : Couilly-Pont-aux-Dames, Esbly, Montry, Coupvray, Chessy, Serris,
  Magny-le-Hongre, Crécy-la-Chapelle, Meaux, Val d'Europe…
- **Risque réglementaire** (allégations santé) : témoignages diabète « glycémie stabilisée »,
  endométriose « sans aucun médicament », arrêt d'anti-inflammatoires prescrits ; article fertilité
  avec posologies homéopathiques, sans sources. → Décision client : témoignages conservés tels quels.

Technique / SEO (cf. Kit SEO)
- 0 meta description, alt manquants, Open Graph vide, images non optimisées (6 239 px), liens
  `goo.gl` et `igshid`, pages catégories vides, pas de JSON-LD métier, footer bourré de villes.
- Points sains : HTTPS, sitemap, canonical, URL lisibles, pages services de 400-1 000 mots.

## 6. Pistes pour la refonte (à valider ensemble)

- Positionnement clair : **« Isabelle Gayet, naturopathe à Saint-Germain-sur-Morin et en visio »**,
  Gaïaroma comme marque.
- Arborescence orientée visiteur : Accueil · La naturopathie / Ma méthode · Accompagnements
  (par problématique + Corps / Émotions) · TeLiPro · Consultation & tarifs (fusion) · À propos ·
  Avis · Blog · Contact/RDV. Conserver ou rediriger (301) les URL existantes.
- Parcours de conversion : CTA unique et persistant (Réserver sur Medoucine / Appeler / Appel
  découverte 15 min), tarifs visibles, avis à proximité des CTA, FAQ.
- UI : moderniser autour du bleu ciel / bleu canard / jaune soleil (+ vert du logo), typo plus
  lisible, vraies photos (cabinet, praticienne) à demander.
- SEO : intégrer les recommandations du Kit (titles/metas prêts, JSON-LD, NAP cohérent).
- Conformité : mentions légales complètes (SIRET), avertissement médical (fait).

## Questions ouvertes
Voir « À valider / à fournir par Isabelle » en section 0.
