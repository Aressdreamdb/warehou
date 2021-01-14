<?php

// 准备aql语句
$sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";

// 连接数据库
$link = mysqli_connect('127.0.0.1','root','root','wangbaigao');

// 执行sql语句
$res = mysqli_query($link,$sql);

// 解析结果
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

// 关闭连接
mysqli_close($link);


$arr = array(
    "massage" => "获取一级列表成功",
    "code" => "1",
    "list" => $data
);

echo json_encode($arr);

?>