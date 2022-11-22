import { Router } from "express";

const router = Router();

router.get("/alltodos", (req, res)=>{
    res.send("Get all todo.");
})

export default router;