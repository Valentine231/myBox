import express from 'express';
import { signup, login, me } from '../Controllers/AuthController.js';
import { protect } from '../Middleware/AuthMiddleware.js';

const Authrouter = express.Router();

Authrouter.post("/signup", signup);
Authrouter.post("/login", login);
Authrouter.get("/me", protect , me);

export default Authrouter;