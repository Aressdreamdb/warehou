$(function(){

    // 给登录按钮添加点击事件
    $('.in').click(async()=>{
        // 获取用户名文本框中的内容
        const username = $('#username').val();
        const password = $('#password').val();
    
        if(!username || !password) return alert('请完整填写信息');
        if(!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{6,12}$/i.test(password)) return alert('表单不符合规则');
        
    
        // 将信息用post请求提交到后端
        // 用解构赋值的方法定义两个变量接收数据
        const { code , nickname } = await $.post('./server/login.php',{username,password},null,'json');

        console.log(code);
        // 对请求返回的结果进行操作
        if(code === '0') return alert('用户名或密码错误，请重新输入');
    
        // 在cookie里面存储一个昵称标识符，以便能够在其他页面识别登录信息
    
        setCookie('nickname',nickname,1000*60*60*24*7);
        
        window.location.href = './index.html';
    
        })  
    
    })