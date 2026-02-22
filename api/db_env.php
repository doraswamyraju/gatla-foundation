<?php
// api/db_env.php
// PRODUCTION Credentials - COMMITTED TO GIT
// This ensures cPanel works out of the box.
// Local development overrides this via db_credentials.php

if (!defined('DB_SERVER')) define('DB_SERVER', 'localhost');
if (!defined('DB_USERNAME')) define('DB_USERNAME', 'skillsak_GATLA');
if (!defined('DB_PASSWORD')) define('DB_PASSWORD', 'BOHPM6139n@');
if (!defined('DB_NAME')) define('DB_NAME', 'skillsak_gatla_foundation');
?>
