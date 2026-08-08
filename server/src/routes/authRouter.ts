import { Router } from "express";

const router = Router();

router.post("/signup",(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

export default router;