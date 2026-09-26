# Liona

Liona est une plateforme de blog simple permettant aux utilisateurs de créer un compte, se connecter, et publier des articles depuis un tableau de bord personnel.

## Fonctionnalités

- Page d'accueil publique affichant les articles publiés
- Inscription (`registre.html`) avec validation des champs
- Connexion (`login.html`) avec vérification des identifiants
- Tableau de bord (`dash.html`) pour gérer ses articles (créer / supprimer)
- Création d'articles (`create-blog.html`)
- Notifications visuelles (toast) au lieu des alertes natives du navigateur

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (vanilla, sans framework)
- `localStorage` pour la persistance des données côté client

## Structure du projet

```
├── index.html          # Page d'accueil / liste des articles
├── index.js
├── login.html           # Page de connexion
├── login.js
├── registre.html        # Page d'inscription
├── registre.js
├── dash.html             # Tableau de bord utilisateur
├── dash.js
├── create-blog.html     # Formulaire de création d'article
├── create-blog.js
├── toast.js              # Système de notifications
└── style.css             # Feuille de style globale
```

## Installation / Utilisation

1. Cloner le dépôt :
   ```
   git clone https://github.com/malekbannour420/Stage.git
   ```
2. Ouvrir `index.html` dans un navigateur (ou utiliser une extension type Live Server).

## Auteur

Projet réalisé par Malek Bannour dans le cadre d'un stage.