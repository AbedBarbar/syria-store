<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// تفعيل عرض الأخطاء
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// اتصال قاعدة البيانات
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        'status' => 'error',
        'message' => 'Connection failed: ' . $conn->connect_error
    ]));
}

// دالة معالجة الصورة
function uploadImage($file) {
    $uploadDir = __DIR__ . '/uploads/';
    
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            throw new Exception("Failed to create upload directory");
        }
    }
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Upload error code: " . $file['error']);
    }
    
    $fileType = mime_content_type($file['tmp_name']);
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (!in_array($fileType, $allowedTypes)) {
        throw new Exception("Invalid file type. Only JPG, PNG, GIF are allowed");
    }
    
    if ($file['size'] > 5000000) {
        throw new Exception("File size exceeds 5MB limit");
    }
    
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '.' . $extension;
    $targetPath = $uploadDir . $filename;
    
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new Exception("Failed to move uploaded file");
    }
    
    return 'uploads/' . $filename;
}

try {
    // التحقق من طريقة الطلب
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Only POST method is allowed");
    }

    // استقبال البيانات
    $productId = $_POST['id'] ?? null;
    $productName = $_POST['product_name'] ?? '';
    $price = $_POST['price'] ?? '';
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';
    $imagePath = null;

    // التحقق من أن ID المنتج مُرسل
    if (empty($productId)) {
        throw new Exception("Product ID is required for update.");
    }

    // التحقق من الحقول المطلوبة
    if (empty($productName) || empty($price) || empty($description) || empty($category)) {
        throw new Exception("All fields are required: product_name, price, description, category.");
    }

    // معالجة الصورة إذا تم رفعها
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imagePath = uploadImage($_FILES['image']);
    }

    // إعداد استعلام التحديث
    $sql = "UPDATE products SET name = ?, price = ?, Type = ?, benefits = ?";
    $params = ["sdss", $productName, $price, $category, $description];

    // إذا تم رفع صورة جديدة، أضفها إلى التحديث
    if ($imagePath) {
        $sql .= ", logo = ?";
        $params[0] .= "s";
        $params[] = $imagePath;
    }

    $sql .= " WHERE id = ?";
    $params[0] .= "i";
    $params[] = $productId;

    // تنفيذ التحديث
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(...$params);

    if (!$stmt->execute()) {
        throw new Exception("Database error: " . $stmt->error);
    }

    // الاستجابة الناجحة
    echo json_encode([
        'status' => 'success',
        'message' => 'Product updated successfully',
        'product_id' => $productId,
        'image_path' => $imagePath
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>
