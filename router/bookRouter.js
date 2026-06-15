import { prisma } from "../db.js"
import { Router } from "express"
import { authGuard } from "../middleware/authGuard.js"
import upload from "../middleware/uploade.js"

const bookRouter = Router()

bookRouter.get("/addbook", authGuard, (req, res) => {
    res.render("pages/addbook.twig", {
        userLogged: req.userLogged
    })
})

bookRouter.post("/addbook", authGuard, upload.single("image"), async (req, res) => {

    try {
        const book = await prisma.book.create({
            data: {
                title: req.body.title,
                author: req.body.author,
                image: req.file ? `/upload/image/${req.file.filename}`:null,
                userId: req.session.userId
                
            }
        })
        res.redirect("/dashboard")
    } catch (error) {
        res.send(error.message)
    }
})


bookRouter.get("/deletebook/:id", authGuard, async (req, res) => {
    await prisma.book.delete({
        where: { id: parseInt(req.params.id) }
    })
    res.redirect("/dashboard")
})


bookRouter.post("/updatebook/:id", authGuard, upload.single("image"), async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            author: req.body.author,
        }
        if (req.file) {
            data.image = `/upload/image/${req.file.filename}`
        }
        await prisma.book.update({
            where : {
                id: parseInt(req.params.id),
            },
            data
        })
        res.redirect("/dashboard")
    } catch (error) {
        res.send(error.message)
    }
})


bookRouter.get("/updatebook/:id", authGuard, async (req, res) => {
    const book = await prisma.book.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            user: true
        }
    })
    res.render("pages/updatebook.twig", {
        userLogged: req.userLogged,
        book: book
    })
})




export default bookRouter