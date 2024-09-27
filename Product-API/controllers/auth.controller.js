const config = require("../config/auth.consfig");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

//Register a new user
exports.signup = async (req, res) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email) {
    res.status(400).send({
      message: "please provide all required fields",
    });
    return;
  }
  //Prepare user data
  const newUser = {
    username: username,
    password: bcrypt.hashSync(password, 16),
    email: email,
    role: role
  };
  //save user in the database
  await User.create(newUser)
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            // Corrected setaRoles to setRoles
            res.send({
              message: "User registered successfully!",
            });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({
            message: "User registered successfully!",
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "somthing error occured while registering a new user.",
      });
    });
};

exports.signin = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "โปรดระบุชื่อผู้ใช้และรหัสผ่าน",
    });
    return;
  }
  await User.findOne({
    where: { username: username },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password",
        });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
        expiresIn: 86400, //1day
      });
      res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            // roles: authorities,
            role: user.roles,
            accessToken: token,
          });

      const authorities = [];
      // user.getRoles().then((roles) => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLES_" + roles[i].name.toUpperCase());
      //   }
      //   res.status(200).send({
      //     id: user.id,
      //     username: user.username,
      //     email: user.email,
      //     roles: authorities,
      //     accessToken: token,
      //   });
      // });
    })
    .catch((error) => {
      console.log('signin error', error)
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while registering a new user.",
      });
    });
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
