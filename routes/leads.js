const express = require('express');

const { findLeads, docsGenerated} = require('../controllers/leadFinder')
const router = express.Router();

router.route('/leads').post(findLeads)


module.exports = router;