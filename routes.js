import express from 'express';
import bodyParser from 'body-parser'

import {
    ProxyImage
} from './proxy'

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use("*", bodyParser.json({
    limit: '1Mb'
}));

router.get('/proxy/:image-link', ProxyImage.getImage);



export default router;
