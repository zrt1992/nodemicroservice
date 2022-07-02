<?php
$string = "abxca";
$store = [];
function minPal($string, $low, $high)
{
    global $store;
    if (isset($store[$low][$high])) {
        return $store[$low][$high];
    }
    if ($low >= $high) {
        return 0;
    }
    if ($string[$low] == $string[$high]) {
        return $store[$low][$high] = minPal($string, $low + 1, $high - 1);
    } else {
        return $store[$low][$high] = 1 + min(minPal($string, $low, $high - 1), minPal($string, $low + 1, $high));
    }
}

echo minPal($string, 0, strlen($string) - 1);
echo '<pre>';
print_r($store);

