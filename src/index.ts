
import { app } from "./app"
import { bandRouter } from "./routes/bandRouter";
import { userRouter } from './routes/userRouter';

//1
app.use("/user", userRouter)

//2
app.use("/band", bandRouter)



