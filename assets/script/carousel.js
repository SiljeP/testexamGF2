(function () {
    const TRACK = document.querySelector(".carousel__track")
    const SLIDES = Array.from(TRACK.children)
    const NEXT_BUTTON = document.querySelector(".carousel__button--right")
    const PREV_BUTTON = document.querySelector(".carousel__button--left")
    const DOTS_NAV = document.querySelector(".carousel__nav")
    const DOTS = Array.from(DOTS_NAV.children)
    
    const SLIDE_WIDTH = SLIDES[0].getBoundingClientRect().width
    
    
    
    //arrange the slides next to eachother 
    const SET_SLIDE_POSITION = (SLIDE, index) => {
        SLIDE.style.left = SLIDE_WIDTH * index + "px"
        }
    
    SLIDES.forEach(SET_SLIDE_POSITION)
    
    const MOVE_TO_SLIDE = (TRACK, CURRENT_SLIDE, TARGET_SLIDE) =>{
        TRACK.style.transform = 'translateX(-' + TARGET_SLIDE.style.left + ')'
        CURRENT_SLIDE.classList.remove('current-slide')
        TARGET_SLIDE.classList.add("current-slide")
    
    }
    
    const UPDATE_DOTS = (CURRENT_DOT,TARGET_DOT) => {
        CURRENT_DOT.classList.remove("current-slide")
        TARGET_DOT.classList.add("current-slide")
    }
    
    
    const HIDE_SHOW_ARROWS = (SLIDES, PREV_BUTTON, NEXT_BUTTON, TARGET_INDEX) => {
        if(TARGET_INDEX === 0){
            PREV_BUTTON.classList.add("is-hidden")
            NEXT_BUTTON.classList.remove("is-hidden")
        } else if(TARGET_INDEX === SLIDES.length - 1){
            PREV_BUTTON.classList.remove("is-hidden")
            NEXT_BUTTON.classList.add("is-hidden")
        } else{
            PREV_BUTTON.classList.remove("is-hidden")
            NEXT_BUTTON.classList.remove ("is-hidden")
        }
    
    }
    
    //when i click left, slides move to the left
    PREV_BUTTON.addEventListener("click", e => {
        const CURRENT_SLIDE = TRACK.querySelector(".current-slide")
        const PREV_SLIDE = CURRENT_SLIDE.previousElementSibling
        const CURRENT_DOT = DOTS_NAV.querySelector('.current-slide')
        const PREV_DOT = CURRENT_DOT.previousElementSibling
        const PREV_INDEX = SLIDES.findIndex(slide => slide === PREV_SLIDE)
    
        MOVE_TO_SLIDE(TRACK, CURRENT_SLIDE, PREV_SLIDE)
        UPDATE_DOTS(CURRENT_DOT, PREV_DOT)
        HIDE_SHOW_ARROWS(SLIDES, PREV_BUTTON, NEXT_BUTTON, PREV_INDEX)
    })
    
    //when i click right, slides move to the right
    NEXT_BUTTON.addEventListener("click", e => {
        const CURRENT_SLIDE = TRACK.querySelector(".current-slide")
        const NEXT_SLIDE = CURRENT_SLIDE.nextElementSibling
        const CURRENT_DOT = DOTS_NAV.querySelector('.current-slide')
        const NEXT_DOT = CURRENT_DOT.nextElementSibling
        const NEXT_INDEX = SLIDES.findIndex(slide => slide === NEXT_SLIDE)
    
        MOVE_TO_SLIDE(TRACK, CURRENT_SLIDE, NEXT_SLIDE)
        UPDATE_DOTS(CURRENT_DOT, NEXT_DOT)
        HIDE_SHOW_ARROWS(SLIDES, PREV_BUTTON, NEXT_BUTTON, NEXT_INDEX)
       
    })
    
    
    //when i click the nav indicator, move to that slide
    DOTS_NAV.addEventListener("click", e =>{
        //what indicator was clicked on
    
        const TARGET_DOT = e.target.closest("button")
        if(!TARGET_DOT) return
    
        const CURRENT_SLIDE = TRACK.querySelector(".current-slide")
        const CURRENT_DOT = DOTS_NAV.querySelector(".current-slide")
        const TARGET_INDEX = DOTS.findIndex(dot => dot === TARGET_DOT)
        const TARGET_SLIDE = SLIDES[TARGET_INDEX]
    
        MOVE_TO_SLIDE(TRACK, CURRENT_SLIDE, TARGET_SLIDE)
        UPDATE_DOTS(CURRENT_DOT, TARGET_DOT)
        HIDE_SHOW_ARROWS(SLIDES, PREV_BUTTON, NEXT_BUTTON, TARGET_INDEX)
    
    })
    })()