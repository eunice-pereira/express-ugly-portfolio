const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const port = 3003;
const host = 'localhost';

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const projects = {
	Python:
		'A multiple-choice calculus trivia/review with a score tracker. It was as dry as it sounds.',
	Frontend:
		'A group project using JS, HTML, and CSS to create a dining-lifestyle site called "The Dining Room", utilizing two different APIs.',
	Backend:
		'An upcoming group project that will flex our back-end knowledge and possibly serve as a starter for an amazing Capstone project! ',
	React:
		'An upcoming solo project using React. I have a vague idea on what it could be, but am excited either way.',
	Capstone:
		'The end-of-bootcamp full-stack project to showcase everything learned thus far!',
};

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/projects', (req, res) => {
	res.render('list', {
		locals: {
			project: Object.keys(projects),
		},
	});
});

app.get('/projects/:projectDesc', (req, res) => {
	const name = req.params.projectDesc;
	res.render('details', {
		locals: {
			name,
			description: projects[name],
		},
	});
});

server.listen(port, host, () => {
	console.log(`Running on ${host}:${port}.`);
});
