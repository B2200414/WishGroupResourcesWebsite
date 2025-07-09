<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name    = $_POST['name'] ?? '';
  $email   = $_POST['email'] ?? '';
  $phone   = $_POST['phone'] ?? '';
  $message = $_POST['message'] ?? '';
  $cv      = $_FILES['cv'];

  // Validate file upload
  $allowedTypes = ['pdf', 'doc', 'docx'];
  $fileExt = pathinfo($cv['name'], PATHINFO_EXTENSION);

  if (!in_array(strtolower($fileExt), $allowedTypes)) {
    die("Invalid file type.");
  }

  // Save file to uploads/
  $uploadDir = 'uploads/';
  if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
  }

  $uniqueFilename = uniqid('cv_') . '.' . $fileExt;
  $uploadPath = $uploadDir . $uniqueFilename;

  if (move_uploaded_file($cv['tmp_name'], $uploadPath)) {
    // Insert into DB
    $stmt = $pdo->prepare("INSERT INTO cv_submissions (name, email, phone, message, filename) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $message, $uniqueFilename]);

    echo "Success! Your CV has been submitted.";
  } else {
    echo "Error uploading file.";
  }
} else {
  echo "Invalid request method.";
}
?>
