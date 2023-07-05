// Generating secret key JWT (Dans le backend)

ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key

//npm i - install all dependencies (le faire aussi dans le front et dans le back + fichier général)
//npm postinstall
//npm run migrate - reinitialises the database
//Pour pouvoir se connecter il faut créer un user avec droits d'administrateur d'abord (via insomnia)

{
	"username": "adrian",
	"password": "password",
	"name": "adrian",
	"isAdmin": true
}
//Pour pouvoir faire le post dans app.js il faut commenter les lignes 38 et 40 (les lignes correspondant au middleware)

//Quand on clone un projet à zero il faut créer le fichier .end dans le front et dans le back avec les bons paramètres

.env - back : 
APP_PORT=5555
FRONTEND_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=875895
DB_NAME=emmaus_connect

.env - front

# call it in React with import.meta.env.VITE_BACKEND_URL
VITE_BACKEND_URL=http://localhost:5555
