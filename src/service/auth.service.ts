import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail, insertUser } from "../repository/user.repository";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
const SALT_ROUND = process.env.SALT_ROUND || 10;

interface SignUpParam {
  name: string;
  email: string;
  password: string;
}

interface AuthenticateUserParam {
  email: string;
  password: string;
}

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const signUpNewUser = async ({ name, email, password }: SignUpParam) => {
  try {
    if (!name || name.length < 1) {
      return {
        code: 400,
        success: false,
        message: "name cannot be empty",
        data: null,
      };
    }

    if (!email || email.length < 1) {
      return {
        code: 400,
        success: false,
        message: "email cannot be empty",
        data: null,
      };
    }

    if (!validateEmail(email)) {
      return {
        code: 400,
        success: false,
        message: "email is not valid",
        data: null,
      };
    }

    if (!password || password.length < 6) {
      return {
        code: 400,
        success: false,
        message: "password can not be less than 6 characters",
        data: null,
      };
    }

    const user = await getUserByEmail(email);

    if (user) {
      return {
        code: 400,
        success: false,
        message: "Email already registered",
        data: null,
      };
    }

    const hashedPassword = bcrypt.hashSync(password, Number(SALT_ROUND));

    const newUser = await insertUser({
      name,
      email,
      password: hashedPassword,
      point: 100,
    });

    return {
      code: 200,
      success: true,
      message: "User registered successfully",
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
};

const authenticateUser = async ({ email, password }: AuthenticateUserParam) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        code: 404,
        success: false,
        message: "Email is not registered",
        data: null,
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return {
        code: 401,
        success: false,
        message: "Password is not valid",
        data: null,
      };
    }

    const token = jwt.sign(user, JWT_SECRET);

    return {
      code: 200,
      success: true,
      message: "Authenticate user success",
      data: {
        ...user,
        token,
      },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
};

export { signUpNewUser, authenticateUser };
