<?php
//phpinfo();
$mysqli = new mysqli("mysql:3306","root","12345678","laravel");
$result=$mysqli->query('select * from users');
print_r($result->fetch_assoc());
header("HTTP/1.1 200");
exit;
