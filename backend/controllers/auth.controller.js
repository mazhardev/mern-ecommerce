const User = require("../models/user.model");
const Post = require("../models/post.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const rounds = 12;

const tokenSecret = config.get("tokenSecret");

//signUp users
const signUp = async (req, role, res) => {
  // validate the email
  let emailNotRegistered = await validateEmail(req.body.email);
  if (!emailNotRegistered) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "Email already registered" }],
    });
  }

  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) {
      console.log(error);
      res.status(500).json();
    } else {
      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: role,
      });
      newUser
        .save()
        .then((user) => {
          res.status(200).json({
            success: true,
            token: generateToken(user),
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json();
        });
    }
  });
};

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
      email: user.email,
    },
    tokenSecret,
    { expiresIn: "24h" }
  );
}

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

// login users
const login = async (req, role, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        res.status(404).json({
          success: false,
          errors: [{ msg: "no user with that email found" }],
        });
      else {
        // We will check the role
        if (user.role !== role) {
          return res.status(403).json({
            success: false,
            errors: [
              {
                msg: "Please make sure you are logging in from the right portal.",
              },
            ],
          });
        }
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error)
            res.status(500).json({
              success: false,
            });
          else if (match)
            res.status(200).json({
              success: true,
              token: generateToken(user),
            });
          else
            res.status(403).json({
              success: false,
              errors: [{ msg: "password do not match" }],
            });
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json();
    });
};

// update user
const editUser = async (req, res) => {
  const { name, password } = req.body;

  // console.log(req.body)
  bcrypt.hash(password, rounds, async (error, hash) => {
    if (error) {
      console.log(error);
      res.status(500).json();
    } else {
      const newUser = {
        name: name,
        password: hash,
      };
      await User.findOneAndUpdate({ _id: req.user._id }, newUser, {
        runValidators: true,
        context: "query",
      });
      let updatedUser = await User.findOne({ _id: req.user._id }).select(
        "-password"
      );
      return res.status(200).json({
        success: true,
        updatedUser,
      });
    }
  });
};

//get user by token
const serializeUser = async (req, res) => {
  // console.log(req.user)
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
};

//get all user
const getAllUsers = async (req, res) => {
  // console.log(req.user)
  const user = await User.find().select("-password");
  res.status(200).json(user);
};

// delete user
const deleteUser = async (req, res) => {
  //  console.log(req.params)
  const user = await User.findById(req.params.id);
  await user.remove();
  res.status(200).json(user);
};

// make payment
const payNow = async (req, res) => {
  // console.log(req.body.ads);
  const user = await User.findById(req.user._id);
  const { balance } = user;
  const total = req.body.total;
  if (total !== 0) {
    if (req.body.total <= balance) {
      //deduct balance from user account
      req.user.balance = balance - total;
      await User.findByIdAndUpdate(req.user._id, req.user, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      //update Ads status
      const ads = req.body.ads;
      ads.forEach((ad) => {
        Post.findOneAndUpdate(
          { _id: ad.id },
          { $set: { status: false } }
        ).exec(function (err, book) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }
        });
      });

      return res.status(200).json({
        success: true,
        errors: [
          {
            msg: "Payment Success!",
          },
        ],
      });
    } else {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg: "Insufficient Balance!",
          },
        ],
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      errors: [
        {
          msg: "Your Cart is Empty!",
        },
      ],
    });
  }
};

module.exports = {
  signUp,
  login,
  editUser,
  serializeUser,
  getAllUsers,
  deleteUser,
  payNow,
};
