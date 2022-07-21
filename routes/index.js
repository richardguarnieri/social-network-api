const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('*', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Social Network API</title>
</head>
<body>
    <p>This route does not exist! Please take a look at the <a href="https://github.com/richardguarnieri/social-network-api" target="_blank">documentation</a>.</p>
</body>
</html>
`));

module.exports = router;