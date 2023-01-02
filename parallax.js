let stars = document.querySelector('#stars');
let moon = document.querySelector('#moon');
let behind = document.querySelector('#hallowen-behind');
let front = document.querySelector('#hallowen-front');
let header = document.querySelector('#text');
let btn = document.querySelector('#btn');

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    stars.style.left = value * 0.3 + 'px';
    moon.style.top = value   + 'px';
    behind.style.top = value * 0.7 + 'px';
    header.style.marginTop = value *1.75 + 'px';
    // header.style.marginTop = value *1 + 'px';
    btn.style.marginTop = value *1 + 'px';

})