# L'atelier — Art & Gourmandise

Site vitrine des créations d'Inès (aquarelles, marque-pages, cartes, encadrés) et des gourmandises sucrées de sa sœur Salomé.
Site 100 % statique : HTML + CSS + JavaScript, aucune installation nécessaire.

## Modifier le contenu

| Je veux changer… | Fichier |
|---|---|
| Prix, gourmandises, date/lieu du stand, contact | `js/config.js` |
| Titres des œuvres, ordre, catégorie | `js/oeuvres.js` |
| Textes (présentation d'Inès et Salomé, idées cadeaux…) | `index.html` |
| Couleurs, polices | `css/style.css` (variables en haut) — voir `docs/CHARTE.md` |

Prix vides (`""`) → affichés « Prix au stand ». Contact vide → bouton « Venez nous voir au stand ».

## Ajouter une œuvre

1. Déposer deux versions de la photo dans `img/oeuvres/` : `mon-dessin-s.webp` (≈ 520 px) et `mon-dessin-l.webp` (≈ 1400 px).
2. Ajouter une ligne dans `js/oeuvres.js` : `{ "slug": "mon-dessin", "titre": "Mon dessin", "cat": "carte", "w": 390, "h": 520 }`
   (`cat` = `marque-page`, `carte`, `grand` ou `cadre` ; `w`/`h` = taille de la petite image).

## Voir le site en local

```
python -m http.server 8765
```
puis ouvrir http://localhost:8765

## Mettre en ligne (gratuit)

- **Netlify Drop** : glisser le dossier sur https://app.netlify.com/drop
- **Vercel** : importer le dépôt, aucun réglage de build (site statique).

## Vie privée

Inès et Salomé sont mineures : pas de nom de famille, pas d'adresse ni de téléphone personnel sur le site.
Le contact (`js/config.js`) doit être une adresse gérée par les parents.
