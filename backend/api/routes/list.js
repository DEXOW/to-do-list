import express from 'express';
import controller from '../controllers/list.js';

const router = express.Router();

// Routes
router.get('/all', controller.getAll);
router.get('/get', controller.get);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.post('/delete', controller.remove);

export default router;