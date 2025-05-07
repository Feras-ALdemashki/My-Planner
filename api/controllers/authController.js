import { db } from "../db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_TOKEN;

export const register = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !firstName || !lastName || !password)
    return res.status(400).json("Please fill in all fields");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json("Please enter a valid email address");
  try {
    const checkEmailQuery = "select * from users where email = ?";
    const [userExist] = await db.query(checkEmailQuery, [email]);
    // this to check if the user exist. i need to add validation later
    if (userExist.length)
      return res.status(409).json("user with this email already exist");
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuidv4();
    const insertValuesQuery =
      "insert into users(id,first_name,last_name,email,password) values(?,?,?,?,?)";
    const values = [userId, firstName, lastName, email, hashedPassword];
    const [createUser] = await db.query(insertValuesQuery, values);
    if (createUser) return res.status(201).json("User has ben created");
  } catch (err) {
    // this is for debugging should delete later
    console.log(err);
    return res.status(500).json("server error");
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json("Please enter Email and password.");

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) return res.status(404).json("Email not found");

    const user = rows[0];
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) return res.status(401).json("Wrong email or password");

    const token = jwt.sign({ id: user.id }, secretKey);

    const { password: userPassword, ...other } = user;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (err) {
    return res.status(500).json("Server error");
  }
};

export const logOut = (req, res) => {
  res.clearCookie("access_token").status(200).json("user is logged out");
};
