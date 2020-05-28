/* Hero Slider Constants */
const heroslides = document.querySelectorAll("#hero_slider .heroslide");
const heroprev = document.querySelector(".heroprev");
const heronext = document.querySelector(".heronext");
const heroindicator = document.querySelector(".heroindicator");
const herotime = 5000;
var heroindex = 0;


/* Game Display Slider Constants */
const gdslides = document.querySelectorAll("#unseregames_slider .slide");
const gdprev = document.querySelector(".gdprev");
const gdnext = document.querySelector(".gdnext");
const gdindicator = document.querySelector(".gdindicator");
const gdtime = 8000;
var gdindex = 0;


/* Prev/Next Button Event Listeners********************************************/
/* Hero */
heroprev.addEventListener("click", function(){
  prevSlide(heroslides, "heroindex");
  updateCircleIndicator("heroindex", heroindicator);
  resetTimer("herotimer", herotime, heroslides, "heroindex", heroindicator);
});

heronext.addEventListener("click", function(){
  nextSlide(heroslides, "heroindex");
  updateCircleIndicator("heroindex", heroindicator);
  resetTimer("herotimer", herotime, heroslides, "heroindex", heroindicator);
});

/* Game Display */
gdprev.addEventListener("click", function(){
  prevSlide(gdslides, "gdindex");
  updateCircleIndicator("gdindex", gdindicator);
  resetTimer("gdtimer", gdtime, gdslides, "gdindex", gdindicator);
});

gdnext.addEventListener("click", function(){
  nextSlide(gdslides, "gdindex");
  updateCircleIndicator("gdindex", gdindicator);
  resetTimer("gdtimer", gdtime, gdslides, "gdindex", gdindicator);
});

/* Circle Indicators **********************************************************/
function circleIndicator(){
  for(let i = 0; i < heroslides.length; i++){
    const div = document.createElement("div");
    div.addEventListener("click", function(){
      indicateSlide("herotimer", herotime, heroslides, "heroindex", heroindicator, i);
    });
    if(i == 0){
      div.className="active";
    }
    heroindicator.appendChild(div);
  }
  for(let i = 0; i < gdslides.length; i++){
    const div = document.createElement("div");
    div.addEventListener("click", function(){
      indicateSlide("gdtimer", gdtime, gdslides, "gdindex", gdindicator, i);
    });
    if(i == 0){
      div.className="active";
    }
    gdindicator.appendChild(div);
  }
}
circleIndicator();

function indicateSlide(timer, time, slides, index, indicator, id){
  window[index] = id
  changeSlide(slides, index);
  updateCircleIndicator(index, indicator);
  resetTimer(timer, time, slides, index, indicator);
}

function updateCircleIndicator(index, indicator){
  for(let i = 0; i < indicator.children.length; i++){
    indicator.children[i].classList.remove("active");
  }
  indicator.children[window[index]].classList.add("active");
}

function prevSlide(slides, index){
  if(window[index] == 0){
    window[index] = slides.length - 1;
  }else{
    window[index]--;
  }
  changeSlide(slides, index);
}

function nextSlide(slides, index){
  if(window[index] == slides.length -1){
    window[index] = 0;
  }else{
    window[index]++;
  }
  changeSlide(slides, index);
}

function changeSlide(slides, index){
  for(let i = 0; i < slides.length; i++){
    slides[i].classList.remove("active");
  }
  slides[window[index]].classList.add("active");
}

function resetTimer(timer, time, slides, index, indicator){
  clearInterval(window[timer]);
  window[timer] = setInterval(autoplay, time, slides, index, indicator);
}

function autoplay(slides, index, indicator){
  nextSlide(slides, index);
  updateCircleIndicator(index, indicator);
}

//Hero Timer
var herotimer = setInterval(autoplay, herotime, heroslides, "heroindex", heroindicator);

//Game Display Timer
var gdtimer = setInterval(autoplay, gdtime, gdslides, "gdindex", gdindicator);
