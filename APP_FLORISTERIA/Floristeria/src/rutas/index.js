const {Router} = require('express');
const controladorinicio = require('../controladores/controladorinicio');
const router = Router();
router.get('/', controladorinicio.Raiz);
router.get('/otra', controladorinicio.otra);
router.get('/otra2', controladorinicio.otra2);
module.exports = router;