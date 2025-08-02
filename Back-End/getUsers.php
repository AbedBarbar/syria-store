<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'db.php';


$sql = "SELECT id, Name,password, email, role FROM users";
$result = mysqli_query($conn, $sql);

// التحقق من وجود بيانات
$users = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }
}

// إرجاع البيانات بصيغة JSON
header('Content-Type: application/json');
echo json_encode($users);

// إغلاق الاتصال
mysqli_close($conn);
?>
