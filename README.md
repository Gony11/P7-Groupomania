Projet 7 du parcours Web d'Openclassrooms

Les instructions pour lancer le projet sur votre ordinateur local
Pré-requis

Pour installer ce projet veuillez vous procurer :

Node.js
MySQL
Vue.js

Installation

    Cloner le repo
    
    Dans un terminal, lancer les commandes 
    - cd backend npm install
    - cd groupomania npm install
    
    Pour démarrer le serveur backend lancer les commandes :
    - cd backend
    - nodemon server
    
    Pour démarrer le serveur frontend lancer les commandes :
    - cd groupomania
    - npm run serve
    
    Importer le fichier .sql à l'aide d'un outil tel que MySQL WorkBench
    
    Rendez-vous à l'adresse http://localhost:8080 sur votre navigateur préféré.
    
    Afin d'attribuer les droits d'administration à un utilisateur, 
    éeecuter cette commande SQL via un outil tel que MySQLWorkBench ou PHPmyAdmin :
    
    UPDATE `groupomania`.`users` SET `role` = '1' WHERE (`id` = 'xxx*');
    
    xxx* étant l'id de l'utilisateur auquel nous voulons attribuer les droits d'administration.
