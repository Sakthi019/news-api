import Controller from '../Controllers/controller.js';
import { Router } from 'express';

const router = Router()
const controller = new Controller();

router.route('/newdata').post(controller.createNews)
router.route('/getdata').post(controller.getNews)
router.route('/getdata/:id').get(controller.findNewsById)
router.route('/deletedata/:id').post(controller.deleteById)
router.route('/deletenews/:id').post(controller.softDeleteById)

export default router;