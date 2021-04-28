const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const pdf = require('html-pdf');
const pdfTemplate = require('./pdfdoc/index');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);
app.use('/register', courseRoutes);

//pdf creation
app.post('/create-pdf', (req, res) => {
	console.log('pdf', req.body);
	pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
		if (err) {
			res.send(Promise.reject());
		}

		res.send(Promise.resolve());
	});
});

app.get('/fetch-pdf', (req, res) => {
	res.sendFile(`${__dirname}/result.pdf`);
});

const PORT = process.env.PORT || 8000;
mongoose
	.connect('mongodb+srv://username:new@cluster0.6zk4z.mongodb.net/personalproject?retryWrites=true&w=majority', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then((result) => app.listen(PORT, () => console.log('listen')))
	.catch((error) => console.log(error));
