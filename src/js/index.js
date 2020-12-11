
$(function () {
  const nickname = getCookie('nickname')
  if (nickname) {
    $('.off').addClass('hide')
    $('.on').removeClass('hide').text(`欢迎您: ${nickname}`)
    setCartNum()
  } else {
    $('.off').removeClass('hide')
    $('.on').addClass('hide')
  }
  function setCartNum() {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    if (!cart.length) {
      $('.cartNum').html('0')
     return
    }else{
      $('.cartNum').html(`${total}`)
    }
    let count = 0
    cart.forEach(item => count += item.cart_number - 0)
    $('.cartNum').html(count)
  }
})
const ul = document.querySelector('.down')
const inp = document.querySelector('input')
inp.addEventListener('input', function () {
  const value = this.value.trim()
  if (!value) return
  const script = document.createElement('script')
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
  script.src = url
  document.body.appendChild(script)
  script.remove()
})
function bindHtml(res) {
  if(!res.g){
    ul.classList.remove('active')
    return
  }
  let str = ''
  for (let i = 0; i < res.g.length; i++) {
    str += `
      <li>${ res.g[i].q }</li>
    `
  }
  ul.innerHTML = str
  ul.classList.add('active')
}
const close = document.querySelector('.close')
const box = document.querySelector('.box')
close.addEventListener('click' ,function(){
box.style.display = "none"
})





