import { Router } from "express";
import  Task  from "./controller/index.js";
import  authenticateUser from "./middleware/index.js";
import   registerValidation  from"./validations/index.js"
const router= Router();

router.post('/register',registerValidation, Task.register)
router.post('/login', Task.login)
router.post('/createPost',authenticateUser, Task.createPost)
router.get('/getAllPosts', Task.getAllPosts)
router.put('/updatePost/:_id', authenticateUser, Task.updatePost);
router.delete('/deletePost/:_id', authenticateUser, Task.deletePost);
router.get('/getPostByLocation', Task.getPostByLocation)
router.get('/getAcitivity', Task.getAcitivity)




export default router