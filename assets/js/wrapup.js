let sFullHeight = document.getElementsByClassName("fullHeight");
function adjustFullHeight(els){
    let wh = window.innerHeight;
    for(let i = 0; i < els.length; i++)
    {
        els[i].style.height = wh + 'px';
    }
}
window.addEventListener('load', function(){
    adjustFullHeight(sFullHeight);
});
window.addEventListener('resize', function(){
    adjustFullHeight(sFullHeight);
});
