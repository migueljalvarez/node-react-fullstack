

import express from 'express'
import UserControllers from '../controllers/UserControllers'

const router = express.Router();
/* GET home page. */


router.get('/', function(req, res) {
  res.send('Api is Ok')
})
// Users
router.post('/users', UserControllers.createDocument)
router.get('/users/:id?', UserControllers.findDocuments)
router.patch('/users/:id', UserControllers.patchDocument)
router.patch('/users/:id/restore', UserControllers.restoreDocument)
router.delete('/users/:id', UserControllers.deleteDocument)

export default router;

