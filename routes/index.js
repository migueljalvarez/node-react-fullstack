

import { Router } from 'express'
import jwtMiddleware from '../utils/jwtMiddleware'
import UserControllers from '../controllers/UserControllers'
import AuthControllers from '../controllers/AuthControllers'
import PostControllers from '../controllers/PostControllers'
const router = Router();
/* GET home page. */


router.get('/', function(req, res) {
  res.send('Api is Ok')
})
// Auth
router.post('/sign', AuthControllers.auth, AuthControllers.login)
// Users
router.post('/users', UserControllers.createDocument)
router.get('/users/:id?', jwtMiddleware.verifyToken, UserControllers.findDocuments)
router.patch('/users/:id', jwtMiddleware.verifyToken, UserControllers.patchDocument)
router.patch('/users/:id/restore', jwtMiddleware.verifyToken, UserControllers.restoreDocument)
router.delete('/users/:id', jwtMiddleware.verifyToken, UserControllers.deleteDocument)
// Post
router.post('/post', jwtMiddleware.verifyToken, PostControllers.createDocument)
router.get('/post/:id?', jwtMiddleware.verifyToken, PostControllers.findDocuments)
router.patch('/post/:id', jwtMiddleware.verifyToken, PostControllers.patchDocument)
router.patch('/post/:id/restore', jwtMiddleware.verifyToken, PostControllers.restoreDocument)
router.delete('/post/:id', jwtMiddleware.verifyToken, PostControllers.deleteDocument)
export default router;

 