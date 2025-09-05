
import express from 'express';
import {codeExplain} from "../controllers/index.js";
const router = express.Router();

router.post("/code-explain", codeExplain);


export default router;