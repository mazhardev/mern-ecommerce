const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const validateRes = require("../utils/validateRes");
const { verify, checkRole } = require("../middlewares/auth");

const {
  signUp,
  login,
  editUser,
  serializeUser,
  getAllUsers,
  deleteUser,
  payNow,
} = require("../controllers/auth.controller");

// @route    POST api/auth/signup-user
// @desc     Register user & get token
// @access   Public

router.post(
  "/signup-user",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  validateRes,
  (req, res) => {
    signUp(req, "user", res);
  }
);

// @route    POST api/auth/signup-admin
// @desc     Register admin & get token
// @access   Public

router.post(
  "/signup-admin",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  validateRes,
  (req, res) => {
    signUp(req, "admin", res);
  }
);

// @route    POST api/auth/login-user
// @desc     Authenticate user & get token
// @access   Public

router.post(
  "/login-user",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  validateRes,
  (req, res) => {
    login(req, "user", res);
  }
);
// @route    POST api/auth/login-admin
// @desc     Authenticate admin & get token
// @access   Public

router.post(
  "/login-admin",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  validateRes,
  (req, res) => {
    login(req, "admin", res);
  }
);

// @route    PUT api/auth/edit-user/
// @desc     Edit user
// @access   Privat

router.put(
  "/edit-user/",
  verify,
  checkRole(["user", "admin"]),
  check("name", "Name is required").notEmpty(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  validateRes,
  (req, res) => {
    editUser(req, res);
  }
);

// @route    GET api/auth/user
// @desc     Get user
// @access   Privat

router.get("/user", verify, checkRole(["user", "admin"]), (req, res) => {
  serializeUser(req, res);
});

// @route    GET api/auth/all-users
// @desc     Get all Users
// @access   Privat

router.get("/all-users", verify, checkRole(["admin"]), (req, res) => {
  getAllUsers(req, res);
});

// @route    DELETE api/auth/delete/:id
// @desc     delete single User
// @access   Privat

router.delete("/delete-user/:id", verify, checkRole(["admin"]), (req, res) => {
  deleteUser(req, res);
});

// @route    POST api/auth/checkout
// @desc     Make Payment
// @access   Privat

router.post(
  "/checkout",
  check("total", "Total is required").notEmpty(),
  validateRes,
  verify,
  checkRole(["admin", "user"]),
  (req, res) => {
    payNow(req, res);
  }
);

module.exports = router;
