/*
 * ============================================================
 *  L'atelier — fichier de configuration
 *  C'est ici que l'on modifie les textes, prix et infos pratiques
 *  sans toucher au reste du site.
 * ============================================================
 */
window.ATELIER = {

  /* Formats proposés. Laisser prix: "" pour afficher « Prix au stand ». */
  formats: [
    { cat: "marque-page", nom: "Marque-pages", detail: "Plastifiés, parfaits pour accompagner un livre.", prix: "" },
    { cat: "carte",       nom: "Cartes",       detail: "Petit format, à offrir ou à écrire.",             prix: "" },
    { cat: "grand",       nom: "Grands formats", detail: "Aquarelles sur papier, à encadrer.",            prix: "" },
    { cat: "cadre",       nom: "Encadrés",     detail: "Prêts à accrocher au mur.",                       prix: "" }
  ],

  /* Gourmandises de Salomé — à adapter selon ce qu'elle prépare. */
  douceurs: [
    { nom: "Cookies maison",      detail: "Moelleux au cœur, croustillants autour.", icone: "cookie", prix: "" },
    { nom: "Sablés décorés",      detail: "Petits biscuits au beurre, décorés à la main.", icone: "sable", prix: "" },
    { nom: "Gâteaux en part",     detail: "Brownie, cake ou gâteau du jour.",        icone: "gateau", prix: "" },
    { nom: "Bocal gourmand",      detail: "Un assortiment de douceurs à offrir.",   icone: "bocal",  prix: "" }
  ],

  /* Rendez-vous des petits entrepreneurs */
  rdv: {
    lieu: "Port Moselle, Nouméa",
    date: "Dimanche 22 novembre 2026",
    paiement: "Espèces"
  },

  /* Contact — géré par les parents (Inès et Salomé sont mineures).
     Laisser vide ("") pour masquer un lien. */
  contact: {
    texte: "Pour une commande ou un cadeau personnalisé, écrivez-nous : nous vous répondrons avec plaisir.",
    email: "ines.gourand29@gmail.com",
    instagram: "",
    facebook: ""
  }
};
