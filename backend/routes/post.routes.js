const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const validateRes = require("../utils/validateRes");

// NOTE: Add middleware to verify requests!
const { verify, checkRole } = require("../middlewares/auth");

const {
  create,
  findAll,
  findAllByUserId,
  findOne,
  update,
  deleteById,
} = require("../controllers/post.controller");

// @route    POST api/post/create
// @desc     Create post
// @access   Privat

router.post(
  "/create",
  verify,
  checkRole(["user","admin"]),
  check("partName", "Part name is required").notEmpty(),
  check("category", "Category name is required").notEmpty(),
  validateRes,
  (req, res) => {
    create(req, res);
  }
);

// @route    GET api/post/all
// @desc     Get all posts
// @access   Privat

router.get("/all", (req, res) => {
  findAll(req, res);
});

// @route    GET api/post/post-by-user
// @desc     Get post by user
// @access   Privat

router.get("/post-by-user", verify, checkRole(["user","admin"]), (req, res) => {
  findAllByUserId(req, res);
});

// @route    GET api/post/post-by-id/:postId
// @desc     Get post by Id
// @access   Privat

router.get("/post-by-id/:postId", (req, res) => {
  findOne(req, res);
});

// @route    PUT api/post/update-post/:postId
// @desc     Update post
// @access   Privat

router.put(
  "/update-post/:postId",
  verify,
  checkRole(["user","admin"]),
  check("partName", "Part name is required").notEmpty(),
  check("category", "Category name is required").notEmpty(),
  validateRes,
  (req, res) => {
    update(req, res);
  }
);

// @route    DELETE api/post/delete-post/:postId
// @desc     Delete post
// @access   Privat

router.delete(
  "/delete-post/:postId",
  verify,
  checkRole(["user","admin"]),
  (req, res) => {
    deleteById(req, res);
  }
);

module.exports = router;
