// blog_index , blog_details , blog_create_get , blog_create_post , blog_delete
const Blog = require('../models/blog');

const blog_index = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.render('blogs/index', { title: 'Home | All Blogs', blogs });
};

const blog_details = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/details', { blog, title: 'Blog Details' });
  } catch (err) {
    console.log(err.message);
    // res.send('server error');
    res.status(404).render('404', { title: 'Blog Not Found' });
  }
};

const blog_create_get = (req, res) => {
  try {
    res.render('blogs/create', { title: 'New Blog' });
  } catch (error) {
    res.send(error);
  }
};

const blog_create_post = async (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);

  try {
    await blog.save();
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
    res.send('server error');
  }
};

const blog_delete = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    // console.log(deleted);

    res.json({ redirect: '/blogs' });
    // res.redirect('/blogs');
  } catch (err) {
    console.log(err.message);
    res.send('server error');
  }
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};

// dans react ave es6
// export {
//   blog_index,
//   blog_details,
//   blog_create_get,
//   blog_create_post,
//   blog_delete,
// };
