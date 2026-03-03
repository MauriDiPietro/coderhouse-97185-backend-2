import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { email } = req.body;
  res
    .cookie("user", email, { maxAge: 10000 })
    .send("cookie guardada con éxito");
});

export default router;
