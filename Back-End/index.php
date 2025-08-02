<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    $data = array();
    while ($row = $result->fetch_assoc()) {
        $row['Logo'] = 'http://localhost/' . $row['Logo'];  // إضافة المسار الكامل
        $data[] = $row;
    }
    echo json_encode($data);
}
