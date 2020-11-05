import express from 'express';

import createTeam from '../controllers/teamController.js';
import validateTeam from '../validators/teamValidator.js'

const router = express.Router();

router.post('/', validateTeam, createTeam);

export default router;
