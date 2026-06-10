import { prisma } from "../db.js"
import { Router } from "express"
import { authGuard } from "../middleware/authGuard.js"

const bookRouter = Router()

bookRouter.get("/addbook", authGuard, (req, res) => {
    res.render("pages/addbook.twig", {
        userLogged: req.userLogged
    })
})

bookRouter.post("/addbook", authGuard, async (req, res) => {
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

bookRouter.get("/deletebook/:id", authGuard, async (req,res) => {
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        if (book && book.userId == parseInt(req.session.userId)) {
            await prisma.book.delete({
                where: {
                    id: book.id
                }
            })
        } else {
            throw new Error("Pas le droit de supprimer le livre")
        }
        res.redirect("/dashboard")
    } catch (error) {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.session.userId)
            },
            include:{
                books: true
            }
        })
        res.render("pages/dashboard.twig", {
            error: error.message,
            userLogged: req.userLogged,
            user: user

        })
    }
})

bookRouter.get("/updatebook/:id", authGuard, async (req,res)=>{
    const book = await prisma.book.findUnique({
        where : {
            id: parseInt(req.params.id)
        }
    })
    res.render("pages/updatebook.twig", {
        book:book,
        userLogged: req.userLogged
    })
})

bookRouter.post("/updatebook/:id", authGuard, async (req,res)=>{
    try {
        await prisma.book.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title: req.body.title,
                author: req.body.author
            }
        })
        res.redirect("/dashboard")

    } catch (error) {
        res.send(error.message)
    }
})

export default bookRouter