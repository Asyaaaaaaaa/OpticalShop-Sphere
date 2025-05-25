<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$name = $data['name'];
$tel = $data['tel'];
$date = $data['date'];
$ODSph = $data['ODSph'];
$ODcyl = $data['ODcyl'];
$ODax = $data['ODax'];
$OSSph = $data['OSSph'];
$OScyl = $data['OScyl'];
$OSax = $data['OSax'];
$ODaxis = $data['ODaxis'];
$OSaxis = $data['OSaxis'];
$type = $data['type'];
$age = $data['age'];
$note = $data['note'];
$preferences = $data['preferences'];

// Контент письма
$title = 'Заявка с сайта'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>' .
        '<p>Телефон: <strong>'.$tel.'</strong></p>' .
        '<p>Дата: <strong>'.$date.'</strong></p>' .
        '<p>ODSph: <strong>'.$ODSph.'</strong></p>' .
        '<p>ODcyl: <strong>'.$ODcyl.'</strong></p>' .
        '<p>ODax: <strong>'.$ODax.'</strong></p>' .
        '<p>OSSph: <strong>'.$OSSph.'</strong></p>' .
        '<p>OScyl: <strong>'.$OScyl.'</strong></p>' .
        '<p>OSax: <strong>'.$OSax.'</strong></p>' .
        '<p>ODaxis: <strong>'.$ODaxis.'</strong></p>' .
        '<p>OSaxis: <strong>'.$OSaxis.'</strong></p>' .
        '<p>Тип: <strong>'.$type.'</strong></p>' .
        '<p>Возраст: <strong>'.$age.'</strong></p>' .
        '<p>Примечание: <strong>'.$note.'</strong></p>' .
        '<p>Предпочтения: <strong>'.$preferences.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;

    // Настройки почты отправителя
    $mail->Host       = 'smtp.yandex.com'; // SMTP сервера вашей почты
    $mail->Username   = 'starushkinaanastasia@yandex.ru'; // Логин на почте
    $mail->Password   = 'qsmjtxucqlskjpjf'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    $mail->setFrom('starushkinaanastasia@yandex.ru', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('starushkinaanastasia@yandex.ru');

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();

    // Сообщение об успешной отправке
    echo ('Сообщение отправлено успешно!');

} catch (Exception $e) {
    header('HTTP/1.1 400 Bad Request');
    echo('Сообщение не было отправлено! Причина ошибки: ' . $mail->ErrorInfo);
}