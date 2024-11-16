# POC Chat Application - Frontend

Cette application est un **Proof of Concept (POC)** permettant de tester une fonctionnalité de **chat en temps réel** entre un utilisateur connecté (Client) et un agent de support (Support). Elle est destinée à être utilisée comme une base pour intégrer un système de communication directe dans une application web plus large.

---

## **Contexte d'Entreprise**

### **À propos de Your Car Your Way**

**Your Car Your Way** est une entreprise de location de voitures présente sur le marché depuis 20 ans. Fondée en Angleterre, elle s'est progressivement étendue en Europe, puis aux États-Unis. Cette expansion rapide a engendré une fragmentation du système d’information, où chaque pays utilise des applications distinctes, bien que visuellement homogènes.

Pour répondre aux besoins de croissance et garantir une expérience client fluide, un projet ambitieux a été lancé : **Your Car Your Way App**, une plateforme unique et centralisée permettant aux clients du monde entier de gérer leur processus de location.

### **Objectif du POC Chat**

Le **POC Chat Application** est une des briques fondamentales de ce projet. Il est destiné à améliorer la communication en temps réel entre les clients et le support, assurant une meilleure expérience utilisateur et une gestion efficace des requêtes.

Ce POC met en œuvre un système de chat fonctionnel, prêt à être intégré dans la plateforme complète.

---

## **Prérequis**

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version recommandée : 18+)
- **npm** (inclus avec Node.js)
- **Angular CLI** (installez-le avec `npm install -g @angular/cli`)

---

## **Installation**

### Étape 1 : Cloner le Dépôt

Clonez le projet depuis le dépôt Git :

```bash
git clone <repository-url>
cd poc-chat-frontend
```

### Étape 2 : Installer les Dépendances

Installez toutes les dépendances nécessaires au projet Angular :

```bash
npm install
```

---

## **Démarrage du Serveur de Développement**

### Lancer le Frontend

Pour démarrer l'application Angular en mode développement :

```bash
ng serve
```

- L'application sera accessible via votre navigateur à l'adresse : [http://localhost:4200](http://localhost:4200).

### Dépendance avec le Backend

Assurez-vous que le **backend Spring Boot** est également démarré et accessible à [http://localhost:8081](http://localhost:8081).

---

## **Fonctionnalités**

Le système de chat offre les fonctionnalités suivantes :

1. **Envoi et Réception de Messages** :
   - Les messages sont échangés en temps réel entre le client et l'agent de support.
   
2. **Gestion des Rôles Dynamiques** :
   - L'utilisateur peut choisir son rôle (Client ou Support) lors de la connexion.

3. **Affichage des Messages Non Lus** :
   - Lorsqu'un utilisateur ouvre le chat, les messages qu'il n'a pas encore consultés sont affichés.

4. **Enregistrement des Messages** :
   - Tous les messages sont persistés dans une base de données via le backend.

5. **Style Dynamique** :
   - Les messages sont affichés différemment selon l'expéditeur (Client, Support, ou l'utilisateur connecté).

6. **Interface Adaptable** :
   - L'interface s'adapte dynamiquement selon le rôle sélectionné.

---

## **Configuration des Rôles : Client et Support**

### Comment Tester les Rôles

Pour tester le chat en tant que **Client** et **Support**, utilisez la page de connexion pour sélectionner le rôle :

#### 1. Simulation d’un Client
1. Ouvrez un navigateur ou un onglet normal.
2. Définissez le rôle comme Client sur la page de login :
  

#### 2. Simulation d’un Agent de Support
1. Ouvrez un autre navigateur ou une fenêtre en mode incognito.
2. Définissez le rôle comme Support sur la page de login :
   

Vous pouvez maintenant tester la communication en temps réel entre les deux rôles.

---

## **Principales Bibliothèques Utilisées**

Voici un aperçu des principales bibliothèques utilisées dans ce projet :

1. **`@angular`** :
   - Framework principal pour le développement de l'application Angular.
   - Fournit des fonctionnalités avancées telles que le **routage**, les **animations** et la gestion des composants.

2. **`@stomp/ng2-stompjs` et `@stomp/stompjs`** :
   - Gèrent le protocole STOMP pour la communication en temps réel via WebSockets.
   - Permettent de publier et de s'abonner à des messages échangés entre le client et le serveur.

3. **`sockjs-client`** :
   - Fournit une connexion WebSocket compatible avec différents navigateurs.
   - Assure une communication fiable, même lorsque WebSocket n'est pas nativement pris en charge.

4. **`rxjs` (Observables)** :
   - Utilisé pour la gestion des flux de données asynchrones (messages, notifications, etc.).
   - Permet de mettre à jour automatiquement l'interface utilisateur lorsque de nouveaux messages sont reçus ou des événements sont déclenchés.

---

## **Structure de l'Application**

### Arborescence des Fichiers

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── login/        # Page de connexion pour choisir un rôle
│   │   ├── chat/         # Chat en temps réel
│   │   ├── dashboard/    # Tableau de bord affichant les messages non lus
│   ├── models/
│   │   ├── chat-message.model.ts  # Modèle des messages échangés
│   ├── services/
│   │   ├── chat.service.ts  # Service pour gérer les WebSockets et l'état du chat
│   ├── guards/
│   │   ├── auth.guard.ts    # Guard pour protéger les routes accessibles uniquement aux utilisateurs connectés
│   ├── app-routing.module.ts  # Définition des routes Angular
│   ├── app.module.ts  # Module principal de l'application
```

---

## **Scripts Utiles**

### Commandes Angular

- **`ng serve`** : Démarre le serveur de développement Angular.
- **`ng build`** : Compile l'application Angular pour la production dans le répertoire `dist/`.
- **`ng test`** : Exécute les tests unitaires Angular.
- **`ng lint`** : Vérifie le style de code et corrige les erreurs.

---


