var swiper
$(document).ready(function () {
    swiper = {
        activeItem: 0,
        autoPlay: true,
        data: [],
        delayTime: 1000,
        init: function(opts) {
            this.activeItem = opts.activeItem || 0
            this.autoPlay = !!opts.autoPlay
            this.data = opts.data || []
            this.delayTime = opts.delayTime || 1000
            this.addElement(opts.dom, opts.data)
            this.handlePageItem(this.activeItem)
            if (this.autoPlay) {
                this.autoPlaySlide()
            }
        },
        addElement: function(dom, data) {
            let container = $(dom)
            let slideStr = ''
            let pageStr = ''
            let slideBox = '<div class="slideBox"></div>'
            let pageBox = '<div class="pageBox"></div>'
            let prebtn = '<div class="prePage"><</div>'
            let nextbtn = '<div class="nextPage">></div>'
            container.append(slideBox, pageBox, prebtn, nextbtn)
            data.forEach((item,index) => {
                slideStr += `<div class="slideItem" style="background-image: url(${item})"></div>`
                pageStr += `<div class="pageItem">${index + 1}</div>`
            })
            $('.slideBox').html(slideStr)
            $('.pageBox').html(pageStr)
        },
        handlePreSlide: function(){
            this.activeItem = this.activeItem === 0 ? this.data.length -1 : this.activeItem - 1
            this.handlePageItem(this.activeItem)
        },
        handleNextSlide: function(){
            this.activeItem = this.activeItem === this.data.length -1 ? 0 : this.activeItem + 1
            this.handlePageItem(this.activeItem)
        },
        handlePageItem: function() {
            let width = $('#swiper').width()
            $('.pageItem').removeClass('activePageItem')
            $('.pageItem').eq(this.activeItem).addClass('activePageItem')
            $('.slideBox').css({'transition-duration': '300ms','transform': `translate3d(-${this.activeItem * width}px, 0px, 0px)`})
        },
        autoPlaySlide: function() {
            const _this = this
            setInterval(function() {
                _this.handleNextSlide()
            }, this.delayTime)
        }
    }

    $('#swiper').on('click', '.prePage', function(){
        swiper.handlePreSlide()
    })
    
    $('#swiper').on('click', '.nextPage', function(){
        swiper.handleNextSlide()
    })
    
    $('#swiper').on('click', '.pageItem', function(){
        swiper.activeItem = $('.pageItem').index(this)
        swiper.handlePageItem()
    })

})