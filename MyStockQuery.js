/**
 * Created by ZG on 2016/3/14.
 */
 'use strict';

$(document).ready(function () {

    $('form').submit(function (e) {
        getPrice();
        //e.preventDefault();
        //e.stopPropagation();
        return false;
    });

});


//对于URL：http://api.money.126.net/data/feed/......?callback=refreshPrice
//将得到如下返回：
//refreshPrice({......});
//因此需要首先在页面中准备好回调函数：
function refreshPrice(data) {
    console.log(data);

    var trs = $(createTrDOMs(data));
    trs.hide();

    $('tbody tr').remove();
    //$('#tbody tr').hide(1200, function () {
    //    $(this).remove();
    //});

    $('#tbody').append(trs);
    trs.show(400);
}

function getPrice() {
    var inputText = $('form input').val().trim(); // 使用了原生trim()
    //inputText = $.trim(inputText); // jQuery trim();
    var stockNums = inputText.split(' ');
    console.log(stockNums);

    var js = document.createElement('script');
    js.src = 'http://api.money.126.net/data/feed/' + stockNums.join(',') + '?callback=refreshPrice';

// 'http://apis.baidu.com/apistore/stockservice/stock?stockid=sz002230&list=1'  -H 'apikey:您自己的apikey'

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(js);
}

function createTrDOMs(data) {
    var trDOMs = [];

    for (var i in data) {
        var tr = document.createElement('tr');
        tr.innerHTML =  '<td>' + data[i].name + '<br>(' + data[i].symbol + ')' + '</td>' +
                        '<td>' + data[i].time + '</td>' +
                        '<td>' + data[i].price + '</td>' +
                        '<td>' + data[i].updown + '</td>' +
                        '<td>' + (data[i].percent * 100).toFixed(2) + '</td>' +

                        '<td>' + data[i].open + '</td>' +
                        '<td>' + data[i].yestclose + '</td>' +
                        '<td>' + data[i].high + '</td>' +
                        '<td>' + data[i].low + '</td>' +

                        '<td>' + (data[i].volume / 1e8).toFixed(2) + '</td>' +
                        '<td>' + (data[i].turnover / 1e8).toFixed(2) + '</td>';
        // 等于0的时候不变色
        if (data[i].updown > 0) tr.style.color = 'red';
        if (data[i].updown < 0) tr.style.color = 'green';
        trDOMs.push(tr);
    }
    // console.log(trDOMs);
    return trDOMs;
}
