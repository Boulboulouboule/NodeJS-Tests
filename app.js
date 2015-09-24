var express = require('express'); // appel du framework express.js
var app = express();
var session = require('cookie-session'); //appel du middleware session

// Todolist :
// 1. Définir une variable qui contiendra les items de la todo list
// 2. L'envoyer en Session,
// 3. Parcourir cette variable et afficher chaque items dans la vue
// 4. Permettre l'ajout  et la suppression d'items dans cette variable en Session (routing)


//création de la session
app.use(session({
	name: 'session',
	secret:'monsecret'
}))

.use(function(req, res, next){
	if(!req.session.todolist){
		req.session.todolist = [];//1 + 2
		console.log('Pas de req.session.todolist, on vient de la créer');
		
	} else {
		console.log('On a un req.session.todolist, on ne fait rien');

	}
})

.get('/', function(req, res){
	res.render('views/layout.ejs', {todolist: req.session.todolist});

});

app.listen(3000);

