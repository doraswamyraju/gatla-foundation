<?php
require 'config.php';
$c = connectDB();
$r = $c->query('SHOW TABLES');
while ($row = $r->fetch_row()) {
    echo $row[0] . "\n";
}
$r = $c->query('DESCRIBE admin');
if ($r) {
    echo "Admin table schema:\n";
    while ($row = $r->fetch_assoc()) {
        print_r($row);
    }
}
$r = $c->query('SELECT * FROM admin');
if ($r) {
    echo "Admin table data:\n";
    while ($row = $r->fetch_assoc()) {
        print_r($row);
    }
}
