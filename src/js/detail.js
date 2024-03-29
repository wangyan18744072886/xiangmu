
$(function () {
  let info = null
  const id = getCookie('goods_id')
  getGoodsInfo()
  async function getGoodsInfo() {
    const goodsInfo = await $.get('./server/getGoodsInfo.php', { goods_id: id }, null, 'json')
    bindHtml(goodsInfo.info)
    info = goodsInfo.info
  }
  function bindHtml(info) {
    // console.log(info)
    $('.enlargeBox').html(`
      <div class="show">
        <img src="${ info.goods_big_logo }" alt="">
        <div class="mask"></div>
      </div>
      <div class="list">
        <p class="active">
          <img src="${ info.goods_small_logo }" show="${ info.goods_small_logo }" enlarge="${ info.goods_small_logo }">
        </p>
        <p>
        <img src="${ info.goods_small_logo }" show="${ info.goods_small_logo }" enlarge="${ info.goods_small_logo }">
         </p>
      </div>
      <div class="enlarge">
      </div>
    `)
    $('.goodsInfo').html(`
      <p class="desc">${ info.goods_name }</p>
      <div class="btn-group size">
        <button type="button" class="btn btn-default">S</button>
        <button type="button" class="btn btn-default">M</button>
        <button type="button" class="btn btn-default">L</button>
        <button type="button" class="btn btn-default">XL</button>
      </div>
      <p class="price">
        ￥ <span class="text-danger">${ info.goods_price }</span>
      </p>
      <div class="num">
        <button class="subNum">-</button>
        <input type="text" value="0" class="cartNum">
        <button class="addNum">+</button>
      </div>
      <div>
        <button class="btn btn-success addCart">加入购物车</button>
        <button class="btn btn-warning continue"><a href="./list.html">继续去购物</a></button>
      </div>
    `) 

    const e1 = new Enlarge('#box1')
  }
  $('.goodsInfo').on('click', '.addCart', function () {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    const flag = cart.some(item => item.goods_id === id)
    if (flag) {
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
    } else {
      info.cart_number = 1
      cart.push(info)
    }
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })
  $('.goodsInfo')
    .on('click', '.subNum', function () {
      let num = $('.cartNum').val() - 0
      if (num === 0) return
      $('.cartNum').val(num - 1)
    })
    .on('click', '.addNum', function () {
      let num = $('.cartNum').val() - 0
      $('.cartNum').val(num + 1)
    })
    function Enlarge(ele) {
      this.ele = document.querySelector(ele)
      this.show = this.ele.querySelector('.show')
      this.mask = this.ele.querySelector('.mask')
      this.enlarge = this.ele.querySelector('.enlarge')
      this.show_width = this.show.clientWidth
      this.show_height = this.show.clientHeight
      this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
      this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)
      this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
      this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
      this.list = this.ele.querySelector('.list')
      this.init()
    }
    Enlarge.prototype.init = function () {
      this.setScale()
      this.overOut()
      this.move()
      this.change()
    }
    
    Enlarge.prototype.setScale = function () {
      this.mask_width = this.show_width * this.enlarge_width / this.bg_width
      this.mask_height = this.show_height * this.enlarge_height / this.bg_height
      this.mask.style.width = this.mask_width + 'px'
      this.mask.style.height = this.mask_height + 'px'
    }
    Enlarge.prototype.overOut = function () {
      this.show.addEventListener('mouseover', () => {
        this.mask.style.display = 'block'
        this.enlarge.style.display = 'block'
      })
      this.show.addEventListener('mouseout', () => {
        this.mask.style.display = 'none'
        this.enlarge.style.display = 'none'
      })
    }
    Enlarge.prototype.move = function () {
      this.show.addEventListener('mousemove', e => {
        e = e || window.event
        let x = e.offsetX - this.mask_width / 2
        let y = e.offsetY - this.mask_height / 2
        if (x <= 0) x = 0
        if (y <= 0) y = 0
        if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
        if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height
        this.mask.style.left = x + 'px'
        this.mask.style.top = y + 'px'
        const bg_x = this.enlarge_width * x / this.mask_width
        const bg_y = this.enlarge_height * y / this.mask_height
        this.enlarge.style.backgroundPosition = `-${bg_x }px -${bg_y }px`
      })
    
    }
    Enlarge.prototype.change = function () {
      this.list.addEventListener('click', e => {
        e = e || window.event
        const target = e.target || e.srcElement
        console.log(target)
        if (target.nodeName === 'IMG') {
          const show_url = target.getAttribute('show')
          const enlarge_url = target.getAttribute('enlarge')
          console.log(target.getAttribute('show'))
          this.show.firstElementChild.src = show_url
          this.enlarge.style.backgroundImage = `url(${ enlarge_url })`
          for (let i = 0; i < this.list.children.length; i++) {
            this.list.children[i].classList.remove('active')
          }
          target.parentElement.classList.add('active')
        }
      })
    }
    
   
})
