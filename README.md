# Online_CV

Site Web permettant la création, modification de CV en ligne et la publication de ces derniers.  
**Un screenshot des pages du site est disponible dans le wiki associé à ce git : 2 pages (AdministratorView et PublicView).**  

## Getting Started 
Ce projet utilise :
* Spring Boot : v2.3.2
* Apache Maven : v3.6.3
* DockerToolbox : v19.03.1
* OpenJDK : 11

## Déploiement
1. Cloner le projet en utilisant la commande :  
`git clone https://github.com/bennKaoutar/CV_Online.git`
2. Exécuter votre DB mysql, si vous avez un terminal Docker rentrez la commande suivante :  
```
docker run --name mariadb --rm -e MYSQL_ROOT_PASSWORD=toor -e MYSQL_DATABASE=defaultdb -p 3306:3306 -v "`pwd`/initdb:/docker-entrypoint-initdb.d" mariadb
``` 
3. Ouvrir le dossier **api** et **front** dans deux fenêtres différentes.  
Dans le dossier **api** :  Lancer l'application Spring Boot  
Dans le dossier **front** :   
`cd front`   
`npm install`  
`ng serve`  

4. Si les tables ne se créent pas automatiquement lors du lancement. Aller dans l'onglet de droite Database > "+" > Data Source > MariaDB.
Paramétrer les différents champs avec les informations du fichier de configuration : (src/main/resources/application.properties).
Lancer les scripts présents dans le dossier initdb.

## Fonctionnalités

Implémentation de 2 sections sur le site :
* Section Publique 
    * Accès au CV des utilisateurs
    * Possibilité de contacter le propriétaire du CV par mail
    * Exportation du CV sous format JSON vers un fichier .txt externe
    
* Section Administrateur
    * Création, modification de toutes les sections du CV (experience, education, skills, languages, hobbies)
    * Edition du nom, email, photo de profil, bannière
    * Lien vers les réseaux sociaux professionnels : LinkedIn, Git, Facebook
    * Customisation des couleurs de la bannière et des titres des sections   
    (Source du color-picker: https://github.com/dancornilov/color-picker.git)

Le système d'authentification et de création de compte sont sécurisés par l'algorithme PBKDF2.

## Auteurs
Kaoutar BENNADI, Melina MVOGO, Cecile VANHELLEPUTTE



