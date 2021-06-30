import express from 'express';
import logger from 'morgan';
//import { router } from './router';
import { successResponse, errorResponse, statusCodes, messages } from './utils';




const app = express();
app.use(express.json());


const port = process.env.PORT || 1734;

//morgan for logging
app.use(logger('dev'));


//app.use(router);


app.get('/api/v1', (req, res) => successResponse(res, statusCodes.success, messages.welcome));
app.get('*', (req, res) => errorResponse(res, statusCodes.notFound, messages.notFound));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

export default app;