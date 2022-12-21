// Require the framework and instantiate it
import Queue from 'better-queue'
import fastify from 'fastify'
import { Form } from './conn.js'

const app = fastify({logger: true})
let newForm 


const q = new Queue((batch, cb)=>{
  console.log(batch)
  batch.forEach( async (form, index)=>{
    newForm = Form(form)
    await newForm.save()
  })
  setTimeout(cb, 10000)
}, { batchSize: 2 })

// Declare a route
app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

app.post('/form', async (req, res) => {
  
  console.log(req.body)
  req.body.forEach((form, index)=>{
    q.push(form)
  })
  return { status: 'Succesful' }
  
})

// Run the server!
const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()