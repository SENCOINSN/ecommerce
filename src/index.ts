import express, {
  Request,
  Response,
} from 'express';

import { PrismaClient } from '@prisma/client';

import { errorMiddleware } from './middlewares/errors';
import rootRouter from './routes';
import { PORT } from './secret';

const app = express()

app.use(express.json())
app.use('/api',rootRouter)

export const prismaClient = new PrismaClient({
    log: ["query"]
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs:{
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true
        },
        compute:(addr)=>{
          return `${addr.lineOne} , ${addr.lineTwo}, ${addr.city} , ${addr.country}-${addr.pincode}`
        }
    }
  }
}
})

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.use(errorMiddleware)

app.listen(PORT,()=> {console.log('app listening on port 3000!')})