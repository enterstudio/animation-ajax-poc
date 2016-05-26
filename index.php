<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('./');
$twig = new Twig_Environment($loader);

$url = 'index.twig';

if ( isset($_GET['page']) ) {
    $url = $_GET['page'] . '.twig';
}

$headers = getallheaders();
$vars = array();

if ( isset($headers['ajax']) ) {
    $vars['ajax'] = true;
}

echo $twig->render($url, $vars);