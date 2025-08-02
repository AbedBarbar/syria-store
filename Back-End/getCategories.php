<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


include 'db.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $sql = "SELECT DISTINCT Type FROM products";
    $result = $conn->query($sql);


    if (!$result) {
        echo json_encode(['error' => 'Database query failed']);
        exit;
    }


    $types = [];
    while ($row = $result->fetch_assoc()) {
        $types[] = $row['Type'];
    }


    echo json_encode($types);
} else {

    echo json_encode(['error' => 'Invalid request method']);
}
?>
