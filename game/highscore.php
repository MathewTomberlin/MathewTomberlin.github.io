<?php
session_start();
$newHighscore = $_REQUEST['highscore'];
if(!isset($_SESSION['highscore']) || $newHighscore>$_SESSION['highscore']){
    $_SESSION['highscore'] = $newHighscore;
    echo $_SESSION['highscore'];
} else {
    echo $_SESSION['highscore'];
}
?>