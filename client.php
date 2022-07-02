<?php
$client = new Swoole\Client(SWOOLE_SOCK_TCP);
echo 'hey';
if (!$client->connect('127.0.0.1', 9501, 0.5)) {
    exit("connect failed. Error: {$client->errCode}\n");
}
$client->send("hello world\n");
echo $client->recv();
$client->close();