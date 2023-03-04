import express, { type Request, type Response, type NextFunction } from 'express'
import { userRouter } from './users/users'

const port = 8000
const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time ', Date.now())
  next()
})

app.get('/hello', (req: Request, res: Response) => {
  throw new Error('Error')
})
app.use('/users', userRouter)

app.use((err: Error, req: Request, res: Response) => {
  console.log(err.message)
  res.status(401).send(err.message)
})

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
