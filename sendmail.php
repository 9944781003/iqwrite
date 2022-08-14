<?php 

$header = "From: ".$_POST["email"]."\r\n";
$header.= "MIME-Version: 1.0\r\n";
$header.= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$header.= "X-Priority: 1\r\n";

    $message='You have received a website message from ';
    $message.=" the email ".$_POST['email'].",";
    $message.=" phone :".$_POST['phone'].",";
    $message.=" name".$_POST['name'].",";
    $message.=" with the following comments -> ".$_POST['comment']."\n";
    
    if(mail("rnd@iqwriter.com",$header,$message)){
        echo "Thanks for your comments ".$_POST['name'];
    }else{
        echo "Sorry. We could not recieve your comment. Still you can contact us by phone and email";
        
    }
  

   
?>