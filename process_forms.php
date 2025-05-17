<?php
// Connect to database
$conn = mysqli_connect("localhost", "root", "", "mindbridge_db");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle form submissions
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $form_type = $_POST['form_type'];

    if ($form_type === 'quiz') {
        // Get quiz form data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $country = $_POST['country'];
        $score = 0;

        // Calculate quiz score
        for ($i = 1; $i <= 4; $i++) {
            $score += intval($_POST["question$i"]);
        }

        // Insert quiz data
        $sql = "INSERT INTO quiz_submissions (name, email, phone, country, score, submission_date) 
                VALUES ('$name', '$email', '$phone', '$country', $score, NOW())";

        if (mysqli_query($conn, $sql)) {
            echo json_encode(['success' => true, 'score' => $score]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn)]);
        }
    } 
    elseif ($form_type === 'demo') {
        // Get demo form data
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $university = $_POST['university'];
        $studentStatus = $_POST['studentStatus'];
        $services = implode(', ', $_POST['services']);
        $message = $_POST['message'];
        $preferredTime = $_POST['preferredTime'];

        // Insert demo request data
        $sql = "INSERT INTO demo_requests (first_name, last_name, email, phone, university, 
                student_status, services, message, preferred_time, submission_date) 
                VALUES ('$firstName', '$lastName', '$email', '$phone', '$university', 
                '$studentStatus', '$services', '$message', '$preferredTime', NOW())";

        if (mysqli_query($conn, $sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn)]);
        }
    }
}

mysqli_close($conn);
?> 