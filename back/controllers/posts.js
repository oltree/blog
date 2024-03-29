import Post from '../models/post.js';
import User from '../models/user.js';

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    const user = await User.findById(req.userId);

    if (req.files) {
      const fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

      const newPostWithImage = new Post({
        email: user.email,
        title,
        text,
        image: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      email: user.email,
      title,
      text,
      image: '',
      author: req.userId,
    });

    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    res.json(newPostWithoutImage);
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (!posts) {
      return res.json({ message: 'Posts not found.' });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(post);
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map(post => Post.findById(post._id))
    );

    res.json(list);
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.json({ message: 'Post not found.' });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({ message: 'Post deleted.' });
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      const fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
      post.imgUrl = fileName || '';
    }

    post.title = title;
    post.text = text;

    await post.save();

    res.json(post);
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      post.comments.map(comment => Comment.findById(comment))
    );

    res.json(list);
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};
