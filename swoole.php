<?php
//
//function game ($a,$b){
//    return $a+$b;
//}
//function call_something($a,$b, callable $fn) {
//    //  echo $a + $b;
////     var_dump($fn);
//    $msg = "custom message";
//    return call_user_func($fn,$msg);
//}
//
//$callback = function ($msg) {
////    echo 'promise';
//};
//
//
//$a=6;
//$b=7;
////echo 'asd';
//sleep(2);
// call_something(3,4,$callback);
//
//header('Content-Type: application/json; charset=utf-8','false','200');
//
//
//?>

<?php
$client = new Swoole\Client(SWOOLE_SOCK_TCP);
if (!$client->connect('127.0.0.1', 9508, 0.5)) {
    exit("connect failed. Error: {$client->errCode}\n");
}
$client->send("hello world\n");
echo $client->recv();
$client->close();
