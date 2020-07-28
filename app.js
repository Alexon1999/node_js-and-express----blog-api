const express = require('express');
const path = require('path');

const morgan = require('morgan');
const mongoose = require('mongoose');

// blog routes
const blogRoutes = require('./router/blogRoutes');

// express app
const app = express();

const dbUri =
  'mongodb+srv://alexon:alexon23@netninjablog.rvepc.mongodb.net/Articles?retryWrites=true&w=majority';

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000, () => 'Server is running on port 3000'))
  .catch((err) => console.log(err));

// + ejs : view engine npm i ejs
// register view engine
// + Server side rendering
app.set('view engine', 'ejs');
//+ change the default name of the views folder
// app.set('views' , 'myProjets')

// listen for requests
// app.listen(3000);

// + static folder middleware (we can put css so we can use it in view , photos etc html )
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add a blog to blogs collection
app.get('/add-blog', async (req, res) => {
  // Blog model to create a new instance of blog document
  const newBlog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  console.log(newBlog.id);

  // newBlog
  //   .save()
  //   .then((res) => res.json(res))
  //   .catch((err) => res.send(err));

  try {
    const result = await newBlog.save();
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
});

app.get('/all-blogs', async (req, res) => {
  // Blog.find().then((res) => res.json(res));

  try {
    const allBlogs = await Blog.find();
    res.json(allBlogs);
    console.log(allBlogs);
  } catch (err) {
    res.send(err);
  }
});

app.get('/single-blog', async (req, res) => {
  const blog = await Blog.findById('5f0582e439636dccc8d77f0f');

  res.json(blog);
});

app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  // res.sendFile('./views/index.html', { root: __dirname });
  // const blogs = [
  //   { title: 'Corona virus ', snippet: 'Aux etats-unis il y a 130 000 morts' },
  //   {
  //     title: 'Samsung galaxy s20',
  //     snippet: 'moins chers a partir de septembre',
  //   },
  //   { title: 'kjdfklhdlkfj', snippet: 'lkjlijsdlifjdkkfjdmfkdmfkmoedkfmk' },
  // ];
  // res.render('index', { title: 'Home', blogs });

  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  // + './views/about.html' : absolute path cad il est relatif au root dir de l'ordi
  // + il faut mettre dir du projet comme relative path
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

// redirects
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// + Blog routes
app.use('/blogs', blogRoutes);

// + 404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
