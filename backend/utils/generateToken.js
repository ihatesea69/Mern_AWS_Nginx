import jwt from "jsonwebtoken";

const generateToken = (id) => {
  console.log("Generating token for id:", id);
  console.log("Using secret:", process.env.JWT_SECRET);
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log("Generated token:", token);
  return token;
};

export default generateToken;
