$(function(){
    //通过向后端发送请求获取数据
    // 获取到后端返回数据后根据数据渲染页面



    const list_info = {
        cat_one: 'all',
        sort: 'id',
        sortType: 'ASC',
        current: 1,
        pagesize: 8
    }


        // 请求一级分类列表

        getCatone();

        async function getCatone(){
            //   获取从后端请求的数据
            const {list} = await $.get('./server/list.php',null,null,'json')

            // 渲染页面
            let str = `<div class="active">全部</div>`;

            list.forEach(item => {
                str += `<div>${ item.cat_one_id }</div>`
            });

            $('.screen .scr_one').html(str);
        }


        // 设置一级分类点击事件

        $('.screen .scr_one').on('click','div',function(){
            // 奇幻点击标签类名
            $(this).addClass('active').siblings().removeClass('active');
            
        })


        // 请求商品列表
        getGoodsList();

        async function getGoodsList(){
            const { list } = await $.get('./server/getGoodsList.php',list_info,null,'json')
            console.log(list);

            let str = '';
            list.forEach(item => {
                str += `
                <li>
                    <a target="_blank" href="${ item.goods_small_logo }">
                        <img src="${ item.goods_small_logo }" alt="">
                    </a>
                    <div class="p1" data-id="${ item.goods_id }">${ item.goods_name }</div>
                    <div class="p2">
                        ￥
                        <span>${ item.goods_price }</span>
                    </div>
                    <div class="p3">
                        <button id="btn1">加入购物车</button>
                        <button id="btn2">去结算</button>
                    </div>
                </li>
                `
            })
            // 将数据渲染到页面中
            $('.list ul').html(str);

        }

        $('.screen .scr_sort').on('click', 'div', function () {

            if (list_info.sort === this.dataset.sort) {
              list_info.sortType = list_info.sortType === 'ASC' ? 'DESC' : 'ASC'
            } else {
              list_info.sortType = 'ASC'
            }
        
            console.log('切换排序方式')

            list_info.sort = this.dataset.sort
        
            list_info.current = 1
        
            $(this).addClass('active').siblings().removeClass('active')
        
            getGoodsList()
          })
        

          $('.list ul').on('click', 'div', function () {

            window.sessionStorage.setItem('goods_id', this.dataset.id)
        
            window.location.href = './shop_details.html'
    })
})
