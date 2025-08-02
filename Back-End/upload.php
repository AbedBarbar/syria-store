<?php
// upload.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
if ($_FILES['file']['name']) {
    $fileName = $_FILES['file']['name'];
    $fileTmp = $_FILES['file']['tmp_name'];
    $fileType = $_FILES['file']['type'];
    $filePath = "uploads/" . $fileName;

    move_uploaded_file($fileTmp, $filePath);
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "project";
    // قاعدة البيانات
    $connection = new mysqli($servername, $username, $password, $dbname);

    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }

    $sql = "UPDATE products SET Logo='$filePath' where id=1";

    if ($connection->query($sql) === TRUE) {
        echo "File uploaded and saved to database";
    } else {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }

    $connection->close();
}
