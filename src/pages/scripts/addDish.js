var form = $('.main-wrapper__menuitem');
form.on('submit', sendForm);

function sendForm() {
    var sendData = $(this).serialize();
    jQuery.ajax({
        data: sendData,
        type: $(this).attr('method'),
        url: $(this).attr('action')
    }).done(function (dish) {
        var dishInOrders = false;
        $('.order').each(function () {
            if ($(this).find('.order__input').eq(0).val() == dish._id) {
                $(this).find('.order__value').eq(0).text(+$(this).find('.order__value').eq(0).text() + 1);
                
                dishInOrders = true;
            }
        });
        
        if (!dishInOrders) addOrder(dish.title, dish.price, dish._id);

        var close = $('.order').find('.order__close');
        close.off('click', sendOrder);
        close.on('click', sendOrder);

        var more = $('.order__more');
        more.off('click', sendIconMore);
        more.on('click', sendIconMore);

        var less = $('.order__less');
        less.off('click', sendIconLess);
        less.on('click', sendIconLess);

        updateSum();
    });
    return false;
}

function addOrder(title, sum, id) {
    var order = $("<div/>", {
        "class": "order",
        id: id
    }).appendTo($('.orders'));

    var order__close = $("<a/>", {
        "class": "order__close"
    }).appendTo(order);

    $("<i/>", {
        "class": "order__icon order__icon_close"
    }).appendTo(order__close);

    $("<div/>", {
        "class": "order__info",
        text: title
    }).appendTo(order);

    $("<input/>", {
        "class": "order__input",
        style: 'display: none',
        value: id
    }).appendTo(order);

    var order__cost = $("<div/>", {
        "class": "order__cost"
    }).appendTo(order);

    $("<span/>", {
        "class": "order__cost_val",
        text: sum
    }).appendTo(order__cost);

    $("<span/>", {
        text: ' руб. x '
    }).appendTo(order__cost);

    var order__less = $("<a/>", {
        "class": "order__less"
    }).appendTo(order);

    $("<i/>", {
        "class": "order__icon order__icon_less"
    }).appendTo(order__less);

    $("<div/>", {
        "class": "order__value",
        text: '1'
    }).appendTo(order);

    var order__more = $("<a/>", {
        "class": "order__more"
    }).appendTo(order);

    $("<i/>", {
        "class": "order__icon order__icon_more"
    }).appendTo(order__more);

    var order__cost_sum = $("<div/>", {
        "class": "order__cost_sum"
    }).appendTo(order);

    $("<span/>", {
        text: ' = '
    }).appendTo(order__cost_sum);

    $("<span/>", {
        "class": "order__cost_val",
        text: sum
    }).appendTo(order__cost_sum);
}