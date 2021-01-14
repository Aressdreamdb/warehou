<?php

    // 接收前端的数据
    $one = $_GET['cat_one'];
    $sort = $_GET['sort'];
    $sortType = $_GET['sortType'];
    $current = $_GET['current'];
    $pagesize = $_GET['pagesize'];


    // 创建sql语句
    $sql = "SELECT * FROM `goods`";
    // 一级分类
    if ($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";

    $sql .= " ORDER BY `goods_$sort` $sortType";

    $start = ($current - 1) * $pagesize;
    $sql .= " LIMIT $start, $pagesize";

    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'wangbaigao');
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);

    $arr = array(
        "message" => "获取商品列表成功",
        "code" => 1,
        "list" => $data,
        "sql" => $sql
      );
    
      echo json_encode($arr);

?>