import { Router } from "express";
import bookController from "./books/book.controller";
import { verifyToken } from "./auth/verify.middleware";

const routes = Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: create new books
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
routes.post("/books", bookController.create);
routes.get("/books", verifyToken, bookController.find);
routes.get("/books/:title", bookController.findByTitle);
routes.put("/books/:id", bookController.update);
routes.delete("/books/:id", bookController.delete);

export { routes };
