var express = require('express');
var router = express.Router();
var service = require('../services/surfaces')

router.get('/surfaces/', service.listAll);
router.get('/surfaces/:trigo', service.listByCategory);
router.post('/surface/', service.createSurface);
router.put('/surface/', service.updateSurface);
router.get('/surface/:id', service.getSurfaceInfo);
router.get('/surface/points/:id', service.getSurfacePoints);
        
module.exports = router

