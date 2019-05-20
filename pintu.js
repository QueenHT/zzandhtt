setTimeout(function(){
    $('.back').css('display','none');
    $('.img-div').css('display','block');
},3000)
$(function () {
    //获取到最初时Html的内容
    const $HT = $('ul').html();
    //Gallery answer 两个数组用于储存图片资源
    var Gallery = [
        ["url('01/01_01.jpg')", "url('01/01_02.jpg')", "url('01/01_03.jpg')",
            "url('01/01_04.jpg')", "url('01/01_05.jpg')", "url('01/01_06.jpg')",
            "url('01/01_07.jpg')", "url('01/01_08.jpg')"], ["url('02/02_01.jpg')", "url('02/02_02.jpg')", "url('02/02_03.jpg')",
            "url('02/02_04.jpg')", "url('02/02_05.jpg')", "url('02/02_06.jpg')",
            "url('02/02_07.jpg')", "url('02/02_08.jpg')"], 
             ["url('03/03_01.jpg')", "url('03/03_02.jpg')", "url('03/03_03.jpg')",
             "url('03/03_04.jpg')", "url('03/03_05.jpg')", "url('03/03_06.jpg')",
             "url('03/03_07.jpg')", "url('03/03_08.jpg')"]
    ];
    var answer = ["01/01-wz.jpg", "02/02-wz.jpg", "03/03-wz.jpg"];
    //随机生成第一张图
    var num = Math.floor(Math.random() * Gallery.length);
    for (var i = 0, n = 0; i < Gallery[num].length; i++, n++) {
        $('li').eq(i).css('background', Gallery[num][n]);
        $('li').eq(i).css('background-size', 'cover');
    }
    $('#div3 img').attr('src', answer[num]);
    //获取到添加完后的html内容
    var $HTML = $('ul').html();
    // console.log(Gallery,answer)
    //给更换图片按钮添加点击事件
    $('input').eq(1).click(function () {
        // alert(1)
        //先将html的内容进行清空
        $('ul').html($HT);
        // console.log($('ul').html());
        //将所有值重写为初值
        $('input').eq(0).val('开始');
        $('#num').html(0);
        $('#time').html(0 + '秒');
        //关闭定时器
        clearInterval($('#time').get(0).timer);
        //创建一个开关保证更换图片时不会出现上一张图片
        var onOff = true;
        // 生成一个新的随机数
        var num2 = Math.floor(Math.random() * Gallery.length);
        // 如果生成的随机数与上一个随机数相同则重新生成新的随机数，直到生成不同的数
        for (; onOff;) {
            if (num == num2) {
                num2 = Math.floor(Math.random() * Gallery.length);
            } else {
                onOff = !onOff;
            }
        }
        // console.log(num)
        // onOff = !onOff;************************
        num = num2;
        // 重新给li添加图片
        for (var i = 0, n = 0; i < Gallery[num2].length; i++, n++) {
            $('li').eq(i).css('background', Gallery[num2][n]);
            $('li').eq(i).css('background-size', 'cover');
        }
        $('img').attr('src', answer[num2]);
        // 将html的内容重新保存
        $HTML = $('ul').html();
        chongxin($HTML);
        // console.log($HTML);
    });
    chongxin($HTML);
    // console.log($HTML);
});

// 接受到的参数为当前html的内容
function chongxin(a) {
    console.log(a);
    var time = 0;
    // 创建定时器控制时间
    $('#time').attr('timer', null);
    //给开始按钮添加点击事件
    $('input').eq(0).click(function () {
        // var $html = $('ul').html();
        // $('ul').html(a);***************
        // 更改的val值
        $(this).val('重新开始');
        //调用star方法，将拼图顺序打乱
        star(a);
        // 控制时间
        time = 0;
        $('#time').html(time + '秒');
        $('#num').html(0);
        clearInterval($('#time').get(0).timer);
        $('#time').get(0).timer = setInterval(function () {
            time++;
            $('#time').html(time + '秒');
        }, 1000);
    });
}

// 传入的参数为选好图片之后排序之前的html内容
function star(as) {
    // console.log(as);
    $('ul').html(as);//莫名改好了bug
    console.log($('ul').html());
    // 遍历li给每一个li添加index属性
    $('li').each(function (i, elem) {
        $(elem).attr('index', i);
    });
    // 找到index为8的li（空白的li）
    var $li = $('li').filter('[index = 8]');
    // 调用生成随机数组的方法，控制打乱图片后的图片顺序
    suiji();
    // 将打乱后的图的节点位置按位置排好，并且此时的index变乱了，用index的顺序判断是否拼图成功
    // 让_index值可以对应上实际的位置，否则监听事件出现问题
    $($('ul')).prepend($('li[class="a d"]'));
    $($('li[class="a d"]')).after($('li[class="b d"]'));
    $($('li[class="b d"]')).after($('li[class="c d"]'));
    $($('li[class="c d"]')).after($('li[class="a e"]'));
    $($('li[class="a e"]')).after($('li[class="b e"]'));
    $($('li[class="b e"]')).after($('li[class="c e"]'));
    $($('li[class="c e"]')).after($('li[class="a f"]'));
    $($('li[class="a f"]')).after($('li[class="b f"]'));
    $($('li[class="b f"]')).after($('li[class="c f"]'));
    // $('li').eq(i).attr('asd',Narr[i]);
    // 遍历li给每一个li添加_index属性，用于li的点击事件
    $('li').each(function (i, elem) {
        $(elem).attr('_index', i);
        // $(elem).attr('asd', arr[i]);
    });
    //创建数组用于储存index的顺序，判断li随机的顺序是否有解
    var arrCheck = [];
    for (var i = 0; i < $('li').length; i++) {
        arrCheck.push($('li').eq(i).attr('index'));
    }
    ;
    // console.log(arrCheck);
    // 当走的步数与逆序数奇偶性相同时则拼图有解
    var a = GetReverseCount(arrCheck, arrCheck.length);
    // console.log(a);
    var b = Get_Parity(arrCheck, arrCheck.length - 1);
    // console.log(b);
    // 给每个li增加点击事件
    liClick($li);
    // 判断奇偶性是否相同,如果不同则重新生成
    var onOff = true;
    for (; onOff;) {
        if ((a % 2 == 0 && b == false) || (a % 2 != 0 && b == true)) {
            fna(as);
            var arrCheck = [];
            for (var i = 0; i < $('li').length; i++) {
                arrCheck.push($('li').eq(i).attr('index'));
            }
            ;
            // console.log(arrCheck);
            a = GetReverseCount(arrCheck, arrCheck.length);
            // console.log(a);
            b = Get_Parity(arrCheck, arrCheck.length - 1);
            // console.log(b);
        } else {
            onOff = !onOff;
        }
    }
}

function suiji() {
    // 创建一个储存位置的数组
    var arr = ['a d', 'b d', 'c d', 'a e', 'b e', 'c e', 'a f', 'b f', 'c f'];
    // 储存生成顺序的数组
    var Narr = [];
    // 生成0-8不重复的随机数
    for (var i = 0; i < arr.length;) {
        var num = Math.floor(Math.random() * arr.length);
        var check = 0;
        for (var i = 0; i < Narr.length; i++) {
            if (Narr[i] != num) {
                check++;
            }
        }
        if (check == Narr.length) {
            Narr.push(num);
            i++
        }
    }
    // console.log(Narr);
    // 给每一个图增加位置，打乱拼图
    for (var i = 0; i < $('li').length; i++) {
        $('li').eq(i).attr('class', arr[Narr[i]]);
    }
    // return Narr;***********************
}

// 用于判断走的步数为奇数还是偶数
function Get_Parity(pArray, ElementCount) {
    for (var i = 0; i != Math.sqrt(ElementCount); ++i) {
        for (var j = 0; j != Math.sqrt(ElementCount); ++j) {
            if (pArray[i * Math.sqrt(ElementCount) + j] == ElementCount) {
                if (((ElementCount - 1 - i) + (ElementCount - 1 - j)) % 2 == 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }
}

// 用于判断逆序数为奇数还是偶数
function GetReverseCount(pPanes, ElementCount) {
    var Reverse_Order = 0;
    for (var i = 0; i != ElementCount - 1; ++i) {
        for (var j = i + 1; j != ElementCount; ++j) {
            if (pPanes[i] > pPanes[j]) {
                ++Reverse_Order;
            }
        }
    }
    return Reverse_Order;
}

function liClick(a) {
    var sum = 0;
    // 给每一个li添加点击事件
    // 通过_index检测哪些可以点击
    $('li').click(function () {
//                alert($(this).attr('index'))
//         var $li = $('li').filter('[index = 9]');
//                alert($li.attr('index'))
        if (a.attr('_index') == 8 && ($(this).attr('_index') == 5 || $(this).attr('_index') == 7)) {
            // alert($(this).attr('index'))
            // alert(9);
            // 改变位置以及交换_index
            change(this, a);
        } else if (a.attr('_index') == 0 && ($(this).attr('_index') == 1 || $(this).attr('_index') == 3)) {
            // alert($(this).attr('index'))
            // alert(1);
            change(this, a);
        } else if (a.attr('_index') == 6 && ($(this).attr('_index') == 3 || $(this).attr('_index') == 7)) {
            // alert($(this).attr('index'))
            // alert(7);
            change(this, a);
        } else if (a.attr('_index') == 2 && ($(this).attr('_index') == 1 || $(this).attr('_index') == 5)) {
            // alert($(this).attr('index'))
            // alert(3);
            change(this, a);
        } else if (a.attr('_index') == 1 && ($(this).attr('_index') == 0 || $(this).attr('_index') == 2 || $(this).attr('_index') == 4)) {
            // alert($(this).attr('index'))
            // alert(2);
            change(this, a);
        } else if (a.attr('_index') == 3 && ($(this).attr('_index') == 0 || $(this).attr('_index') == 6 || $(this).attr('_index') == 4)) {
            // alert($(this).attr('index'))
            // alert(4);
            change(this, a);
        } else if (a.attr('_index') == 5 && ($(this).attr('_index') == 2 || $(this).attr('_index') == 8 || $(this).attr('_index') == 4)) {
            // alert($(this).attr('index'))
            // alert(6);
            change(this, a);
        } else if (a.attr('_index') == 7 && ($(this).attr('_index') == 6 || $(this).attr('_index') == 8 || $(this).attr('_index') == 4)) {
            // alert($(this).attr('index'))
            // alert(8);
            change(this, a);
        } else if (a.attr('_index') == 4 && ($(this).attr('_index') == 1 || $(this).attr('_index') == 3 || $(this).attr('_index') == 5 || $(this).attr('_index') == 7)) {
            // alert($(this).attr('index'))
            // alert(5);
            change(this, a);
        }
        // 计算步数
        sum++;
        $('#num').html(sum);
    });
}

function fna(a) {
    $('ul').html(a);
    star(a);
    time = 0;
    $('#time').html(time + '秒');
    $('#num').html(0);
    clearInterval($('#time').get(0).timer);
    $('#time').get(0).timer = setInterval(function () {
        time++;
        $('#time').html(time + '秒');
    }, 1000);
}

// a:点击的li   b:_index为8的li
function change(a, b) {
    // 获取点击的li的left跟top的值
    var cNX = $(a).css('left');
    var cNY = $(a).css('top');
    var bX = b.css('left');
    var bY = b.css('top');
    // 将_index为8的li的left跟top的值设置为点击的位置
    b.css('left', cNX).css('top', cNY);
    // 进行移动
    $(a).animate({
        left: bX,
        top: bY
    }, 250, function () {
        // 回调函数，将_index的值进行互换，保证_index为8的li始终为空白格
        var $li1 = b.attr('_index');
        var $li2 = $(a).attr('_index');
        $(a).attr('_index', $li1);
        b.attr('_index', $li2);
        // 调用检测函数，运动结束后检测拼图是否成功
        check();
    });
}

function check() {
    // 如果index的顺序为0-8排序则成功
    var onOff = false;
    for (var i = 0, n = 0; i < $('li').length; i++) {
        if ($('li').eq(i).attr('_index') == $('li').eq(i).attr('index')) {
            n++;
            // alert(n)
        }
        if (n == $('li').length) {
            onOff = true;
        }
    }
    if (onOff) {
        // 成功后关闭定时器，清空监听事件
        clearInterval($('#time').get(0).timer);
        $('li').off();
        alert('成功');
        $('input').eq(0).val('完成');
        $('input').eq(0).off();
    }
}
