import express from 'express'
import indexRouter from './routers/index'

const app: express.Express = express()

app.use('/', indexRouter)

// Listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
