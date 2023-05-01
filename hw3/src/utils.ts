import bcrypt from "bcrypt";
import config from "./config/index";

export const generateHash = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(config.saltRounds, function (err, salt) {
      if (err) reject(err);
      bcrypt.hash(password, salt, function (err, hash) {
        resolve(hash);
      });
    });
  });
};

export const checkHash = (
  encryptedPassword: string,
  inputPassword: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, encryptedPassword, (err, result) => {
      if (err) {
        reject(err);
      } else if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
