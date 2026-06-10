import { prisma } from "../db.js"
import { Router } from "express"
import { authGuard } from "../middleware/authGuard.js"

const bookRouter = Router()

    bookRouter.get("/addbook", authGuard, (req,res)=>{
        res.render("pages/addbook.twig",{
            userLogged: req.userLogged
        })
    })

    bookRouter.post("/addbook", async(req,res)=>{
        try {
            const book = await prisma.book.create({
                data: {
                    title: req.body.title,
                    author: req.body.author,
                    userId: req.session.userId
                }
            })
            res.redirect("/dashboard")
        } catch (error) {
            res.send(error.message)
        }
    })

export default bookRouter