import {Router} from 'express'
const router: Router = Router();
import { lastMatch, searchMatch, searchByInterval, pointsMatch, mostGoal , addMatch} from "../controllers/results.controller";
import {TokenValidation} from '../libs/validateToken'

router.get('/lastMatch', TokenValidation, lastMatch);
router.get('/searchMatch', TokenValidation, searchMatch);
router.get('/intervalMatch', TokenValidation, searchByInterval);
router.get('/pointsMatch', TokenValidation, pointsMatch);
router.get('/mostGoal', TokenValidation, mostGoal);
router.post('/addMatch', TokenValidation, addMatch);
export default router;