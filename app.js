var express = require('express'); // appel du framework express.js
var app = express();
var session = require('cookie-session'); //appel du middleware session
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

// Todolist :
// 1. Définir une variable qui contiendra les items de la todo list
// 2. L'envoyer en Session,
// 3. Parcourir cette variable et afficher chaque items dans la vue
// 4. Permettre l'ajout  et la suppression d'items dans cette variable en Session (routing)

app.use(express.static(__dirname+'/public'));
//création de la session
app.use(session({
	name: 'session',
	secret:'monsecret'
}))

.use(function(req, res, next){
	if(req.session.todolist == undefined){
		req.session.todolist = ["Variable"];//1 + 2
		console.log('Pas de req.session.todolist, on vient de la créer');
		
	} else {
		console.log('On a un req.session.todolist, on ne fait rien');

	}

	next()
})

.get('/', function(req, res){
	res.render('layout.ejs', {todolist: req.session.todolist});

})

.post('/add', bodyParser.urlencoded({ extended: false}), function(req, res){
	req.session.todolist.push(req.body.task);
	res.redirect('/');
})

.get('/remove/:id', function(req, res){
	req.session.todolist.splice(req.params.id, 1);
	res.redirect('/');
});
app.listen(8080);

