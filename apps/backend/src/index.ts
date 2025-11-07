import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
