import Swiper, { Navigation, Pagination, Thumbs, Autoplay, EffectFade } from "swiper"
// import "swiper/css"
// import 'swiper/css/effect-fade'
import {debounce} from './functions.js'

function buildSliders(enableZoom = false) {
    document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)').forEach((slider) => {
        slider.parentElement.classList.add("swiper")
        slider.classList.add("swiper-wrapper")
        Array.prototype.forEach.call(slider.children, (el) => el.classList.add("swiper-slide"))
    })
}

export function initSliders() {
    indexSlider()
    teachersSlider(".teachers")
    awardsSlider(".awards")
    singlePageSlider()
}
function indexSlider() {
    const mainSlider = document.querySelector(".first-screen__slider")
    const thumbsSlider = document.querySelector(".first-screen__thumbs-slider")
    if (mainSlider && thumbsSlider) {
        const thumbsOptions = {
            allowTouchMove: true,
            slidesPerView: 4,
            slidesPerGroup: 1,
            breakpoints: {
                769: {
                    direction: "vertical",
                    spaceBetween: 18,
                },
                601: {
                    direction: "vertical",
                    spaceBetween: 10,
                },
                500: {
                    direction: "horizontal",
                    spaceBetween: 10,
                },
                320: {
                    direction: "horizontal",
                    spaceBetween: 7,
                },
            },
            observer: true,
            observeParents: true,
            loop: true,
            loopedSlides: 6,
        }
        let thumbs = new Swiper(thumbsSlider, thumbsOptions)
        const mainOptions = {
            modules: [Thumbs, Autoplay, EffectFade],
            // allowTouchMove: true,
            autoplay: {
                disableOnInteraction: false,
                delay: 5000
            },
            speed: 1000,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            observer: true,
            observeParents: true,
            resizeObserver: true,
            updateOnWindowResize: true,
            loop: true,
            slidesPerView: 1,
            loopedSlides: 6,
            thumbs: {
                swiper: thumbs,
            },
        }
        let main = new Swiper(mainSlider, mainOptions)

        let prevWidth = window.innerWidth
        function reinit() {
            // console.log("reinit! ", prevWidth, window.innerWidth)
            // main.destroy()
            // thumbs.destroy()
            thumbs = new Swiper(thumbsSlider, thumbsOptions)
            main = new Swiper(mainSlider, mainOptions)
            // main.controller.control = thumbs
        }
        window.addEventListener("resize", (e) => {
            if (window.innerWidth <= 600 && prevWidth > 600) {
                reinit()
            } else if (window.innerWidth > 600 && prevWidth <= 600) {
                reinit()
            }
            prevWidth = window.innerWidth
        })
    }
}
function teachersSlider(selector) {
    const teachersSliderEl = document.querySelector(selector + "__slider")
    if (teachersSliderEl) {
        const teachersSliderOptions = {
            modules: [Pagination, Navigation],
            allowTouchMove: true,
            spaceBetween: 200,
            loop: true,
            loopedSlides: 2,
            speed: 500,
            autoHeight: true,
            slidesPerView: 1,
            navigation: {
                nextEl: selector + "__slider .swiper-button-next",
                prevEl: selector + "__slider .swiper-button-prev",
            },
            pagination: {
                el: selector + "__container .swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            breakpoints: {
                1281: {
                    spaceBetween: 130,
                },
                480: {
                    spaceBetween: 200,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                320: {
                    pagination: {
                        dynamicBullets: true,
                    },
                },
            },
        }
        const teachersSlider = new Swiper(teachersSliderEl, teachersSliderOptions)

        const slides = teachersSliderEl.querySelectorAll(".swiper-slide")
        window.addEventListener("resize", resize)
        let prevWidth = Number.MAX_SAFE_INTEGER
        resize()
        function resize() {
            if (window.innerWidth <= 700 && prevWidth > 700) {
                slides.forEach((slide) => {
                    const name = slide.querySelector(".teacher__name")
                    const image = slide.querySelector(".teacher__image")
                    image.append(name)
                })
            } else if (window.innerWidth > 700 && prevWidth <= 700) {
                slides.forEach((slide) => {
                    const name = slide.querySelector(".teacher__name")
                    const image = slide.querySelector(".teacher__image")
                    const description = slide.querySelector(".teacher__text")
                    description.prepend(name)
                })
            }
            prevWidth = window.innerWidth
        }
    }
}
function awardsSlider(selector) {
    const awardsSliderEl = document.querySelector(selector + "__slider")
    if (awardsSliderEl) {
        const awardsSliderOptions = {
            modules: [Pagination, Navigation],
            allowTouchMove: true,
            spaceBetween: 130,
            loop: true,
            loopedSlides: 2,
            speed: 500,
            autoHeight: true,
            slidesPerView: 1,
            navigation: {
                nextEl: selector + "__slider .swiper-button-next",
                prevEl: selector + "__slider .swiper-button-prev",
            },
            pagination: {
                el: selector + "__container .swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            breakpoints: {
                481: {
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                320: {
                    pagination: {
                        dynamicBullets: true,
                    },
                },
            },
        }
        const awardsSlider = new Swiper(awardsSliderEl, awardsSliderOptions)
    }
}
function singlePageSlider() {
    const commonOptions = {
        observer: true,
        observeParents: true,
        // allowTouchMove: true,
        loopedSlides: 6,
        loop: true,
    }
    const commonMainOptions = {
        ...commonOptions,
        ...{
            resizeObserver: true,
            updateOnWindowResize: true,
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                1440: {
                    spaceBetween: 200,
                },
                1321: {
                    spaceBetween: 150,
                },
                992: {
                    spaceBetween: 120,
                },
                768: {
                    spaceBetween: 45,
                },
            },
        },
    }
    const thumbsOptions = {
        ...commonOptions,
        ...{
            slidesPerGroup: 1,
            slidesPerView: 4,
            spaceBetween: 8,
            breakpoints: {
                993 : {
                    spaceBetween: 24,
                    slidesPerView: 5
                },
                769: {
                    spaceBetween: 12,
                    slidesPerView: 5,
                },
                481: {
                    spaceBetween: 12,
                    slidesPerView: 5,
                },
                320: {
                    slidesPerView: 4,
                    spaceBetween: 8,
                },
            },
        },
    }
    const sliders = document.querySelectorAll('.single-page-slider')
    for(const slider of sliders) {
        const mainSlider = slider.querySelector(".single-page-main-slider")
        const thumbsSlider = slider.querySelector(".single-page-thumbs-slider")
        let thumbs
        let main
        function initThumbsSlider(){
            if(thumbs) thumbs.destroy(true, true)
            const slides = thumbsSlider.querySelectorAll('.swiper-slide')
            updateOptions(slides)
            // console.log('thumbsOptions', thumbsOptions)
            thumbs = new Swiper(thumbsSlider, thumbsOptions)
            // console.log('initialized thumbs', thumbs)
        }
        function initMainSlider(){
            if(main) main.destroy(true, true)
            const mainOptions = {
                ...commonMainOptions,
                ...{
                    modules: [Navigation],
                    navigation: {
                        prevEl: slider.querySelector(".swiper-button-prev"),
                        nextEl: slider.querySelector(".swiper-button-next"),
                    },
                },
            }
            if (thumbsSlider) {
                Object.assign(mainOptions, {
                    modules: [Thumbs, Navigation],
                    thumbs: {
                        swiper: thumbs,
                    },
                })
            }
            main = new Swiper(mainSlider, mainOptions)
            if (thumbsSlider) {
                // main.controller.control = thumbs
            }
            // console.log('initialized main', main)
        }
        function initSlider(){
            if (thumbsSlider) {
                initThumbsSlider()
            }
            if (mainSlider) {
                initMainSlider()
            }
        }
        function updateOptions(slides){
            const slidesPerView = determineSlidesPerView(thumbsOptions)
            const breakpointWidth = findBreakpointWidth(thumbsOptions)
            if(slides.length <= slidesPerView) {
                thumbsOptions.loop = false
                // console.log('thumbsOptions.breakpoints[breakpoint]', thumbsOptions.breakpoints[breakpoint])
                if(thumbsOptions.breakpoints[breakpointWidth]) {
                    thumbsOptions.breakpoints[breakpointWidth].loop = false
                }
                if(thumbs && thumbs.destroyed !== true) {
                    // console.log('thumbs', thumbs)
                    thumbs.params.loop = false
                    thumbs.params.breakpoints[breakpointWidth].loop = false
                }
                // console.log('updated options and params', thumbs?.params, thumbs)
            } else {
                // reset settings!
                thumbsOptions.loop = true
                thumbsOptions.centeredSlides = false
                // console.log('thumbsOptions.breakpoints[breakpoint]', thumbsOptions.breakpoints[breakpoint])
                if(thumbsOptions.breakpoints[breakpointWidth]) {
                    thumbsOptions.breakpoints[breakpointWidth].loop = true
                }
                if(thumbs && thumbs.destroyed !== true) {
                    // console.log('thumbs', thumbs)
                    thumbs.params.loop = true
                    thumbs.params.breakpoints[breakpointWidth].loop = true
                }
            }
        }
        initSlider()
        window.addEventListener('resize', debounce(initSlider))

    }
}
initSliders()
function determineSlidesPerView(options){
    let slidesPerView
    // find the applicable breakpoint
    const breakpoint = findBreakpoint(options, window.innerWidth)
    if(breakpoint) {
        slidesPerView = breakpoint.slidesPerView
    } 
    // if there is no breakpoint or breakpoint.slidesPerView
    // is not set then use options.slidePerView
    // if it is not set then use 1
    if(!slidesPerView) slidesPerView = options.slidesPerView || 1
    return slidesPerView
}
// find the breakpoint objectthat is active at a particular window width
function findBreakpoint(options, windowWidth = window.innerWidth){
    let currentBreakpoint
    if(options.breakpoints) {
        for(const breakpoint of Object.keys(options.breakpoints)) {
            // console.log('breakpoint', breakpoint, options.breakpoints[breakpoint])
            if(breakpoint > windowWidth) break
            currentBreakpoint = options.breakpoints[breakpoint]
        }
    }
    return currentBreakpoint
}
// find the breakpoint width that is active at a particular 
// window width
function findBreakpointWidth(options, windowWidth = window.innerWidth){
    let currentBreakpoint
    if(options.breakpoints) {
        for(const breakpoint of Object.keys(options.breakpoints)) {
            // console.log('breakpoint', breakpoint, options.breakpoints[breakpoint])
            if(breakpoint > windowWidth) break
            currentBreakpoint = breakpoint
        }
    }
    return currentBreakpoint
}
