function clickIt(e) {
    window.alert('Button is clicked');
}

var button = document.getElementById('#button')
//注册事件是基于事件驱动
button.addEventListener('click',clickIt)