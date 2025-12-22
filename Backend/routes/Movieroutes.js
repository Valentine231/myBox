import { Router } from 'express';
import { 
  searchMovie, 
  saveMovie, 
  getMovie, 
  deleteMovie,
  getMoviesByUser
} from '../Controllers/movieController.js';

const router = Router();

router.get("/search", searchMovie);
router.post("/save", saveMovie);
router.get("/saved/:userId", getMoviesByUser);   // ✅ NEW ROUTE
router.get("/:id", getMovie);
router.delete("/:id", deleteMovie);

export default router;
