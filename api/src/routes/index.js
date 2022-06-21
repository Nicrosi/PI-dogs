const { Router } = require('express');
const DogRoute = require('./DogRouter');
const TemperamentRoute = require('./TemperamentRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', DogRoute);
router.use('/temperaments', TemperamentRoute);

module.exports = router;
