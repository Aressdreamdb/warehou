<?php

    // 验证登录逻辑
    // 1 接收前端传来的数据
    // 2 去数据库进行数据比对
    // 3 将比对的结果返回前端

    // 前端发送请求用post
    // 后端接收请求用$_POST(大写)

    // 1 定义变量
    $username = $_POST['username'];
    $password = $_POST['password'];


    // 2 去数据库查询比对
        // ①创建SQL语句
            $sql = "SELECT * FROM `users` WHERE `username` = '$username' AND `password` = '$password'";
        // ②连接数据库
            $link = mysqli_connect('127.0.0.1','root','root','wangbaigao');
        // ③执行sql语句
            $res = mysqli_query($link, $sql);
        // ④解析结果
            $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
        // ⑤关闭连接(断开连接)
            mysqli_close($link);
        
    // 3 php通过count获取数组的长度
        if(count($data)){
            $arr = array(
                "message" => "登录成功",
                "code" => "1",
                "nickname" => $data[0]['nickname']
            );
        }else{
            $arr = array(
                "message" => "登录失败",
                "code" => "0",
            );
        }
    echo json_encode($arr);
?>