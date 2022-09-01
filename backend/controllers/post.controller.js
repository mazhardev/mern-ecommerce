const cloudinary = require("cloudinary");
const Post = require("../models/post.model");

const config = require("config");
const cloud_name = config.get("cloudName");
const api_key = config.get("apiKey");
const api_secret = config.get("apiSecret");

// Setting up cloudinary config
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

// Create and Save a new post
const create = async (req, res) => {
  const images = req.body.images;

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "carParts/posts",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;

  // Create a Post
  const post = await Post.create(req.body);
  res.status(200).json({
    success: true,
    post: post,
  });
};

// Retrieve and return all Posts from the database.
const findAll = async (req, res) => {
  await Post.find()
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

// Retrieve and return all Posts by user id from the database.
const findAllByUserId = async (req, res) => {
  await Post.find({ user: req.user._id })
    .populate()
    .then((Posts) => {
      res.status(200).send(Posts);
    })
    .catch((err) => {
      res.status(500).send();
    });
};

// Find a single Post with a PostId
const findOne = async (req, res) => {
  // console.log(req.params.postId);

  await Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          errors: [{ msg: "Post not found with id " + req.params.postId }],
        });
      }
      res.send(post);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          errors: [{ msg: "Post not found with id " + req.params.postId }],
        });
      }
      return res.status(500).send({
        errors: [{ msg: "Error retrieving Post with id " + req.params.postId }],
      });
    });
};

// Update a Post identified by the PostId in the request
const update = async (req, res) => {
 
  let post = await Post.findById(req.params.postId);
// console.log(req.body)
  if (!post) {
    return res.status(404).send({
      errors: [{ msg: "Post not found with id " + req.params.postId }],
    });
  }

  if (req.body.images) {

      // Delete images associated with the post
      // for (let i = 0; i < post.images.length; i++) {
      //     await cloudinary.v2.uploader.destroy(post.images[i].public_id)
      // }

      let imagesLinks = []
      const images = req.body.images;

      for (let i = 0; i < images.length; i++) {

          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "carParts/posts",
          });

          imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url
          })

      }

      req.body.images = imagesLinks;

  }

  post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })

  res.status(200).json({
      success: true,
      post
  })
};

// Delete a Post with the specified PostId in the request
const deleteById = async (req, res) => {
  await Post.findByIdAndRemove(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          errors: [{ msg: "Post not found with id " + req.params.postId }],
        });
      }
      res.send({ errors: [{ msg: "Post deleted successfully!" }] });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          errors: [{ msg: "Post not found with id " + req.params.postId }],
        });
      }
      return res.status(500).send({
        errors: [{ msg: "Could not delete note with id " + req.params.postId }],
      });
    });
};

module.exports = {
  create,
  findAll,
  findAllByUserId,
  findOne,
  update,
  deleteById,
};
