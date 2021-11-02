import { rest } from 'msw'
import { v4 } from "uuid"
let users = [{
    id: v4(),
    firstName: "Joe",
    lastName: 'Doe',
    email: "test@email.com",
    address: "test"
}]

export default [
    rest.get('/users', (req, res, ctx) => {
        return res(
            ctx.json(users)
        )
    }),
    rest.get('/users/:id', (req, res, ctx) => {
        const userId = req.params.id
        const user = users.find(user => user.id === userId)

        return res(
            ctx.json(user)
        )
    }),
    rest.post('/users', (req, res, ctx) => {
        const user = req.body
        users.push({ ...user, id: v4() })
        return res(
            ctx.json(users)
        )
    }),
    rest.delete('/users/:id', (req, res, ctx) => {
        const userId = req.params.id
        users = users.filter(user => user.id !== userId)
        return res(
            ctx.json({ done: true })
        )
    }),
    rest.put('/users/:id', (req, res, ctx) => {
        const userBody = req.body
        const userId = req.params.id
        const userIndex = users.findIndex((obj => obj.id === userId));
        users[userIndex] = userBody
        return res(
            ctx.json(users)
        )
    })
]