/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2") };

// Enter date in this format: January 1, 2017 12:00:00


// The strings to morph between. You can change these to anything you want!
const texts = [
"March 16th Pre-sale",
"Monthly Guest Speakers",
"Chummy Fun Club ",
"Startup Incubator",
"Fully Doxxed Team",
"Fund & Fincubator",
"Real World Events ",
"Investment literacy",
"Financial literacy"];


// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 4.2;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
  // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

// Start the animation.
animate();


/* jQuery
================================================== */
$(function() {
$('.acc__title').click(function(j) {
  
  var dropDown = $(this).closest('.acc__card').find('.acc__panel');
  $(this).closest('.acc').find('.acc__panel').not(dropDown).slideUp();
  
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  } else {
    $(this).closest('.acc').find('.acc__title.active').removeClass('active');
    $(this).addClass('active');
  }
  
  dropDown.stop(false, true).slideToggle();
  j.preventDefault();
});
});

function enable() {
  try {
      document.getElementsByClassName("mint")[0].disabled = false;
      document.getElementsByClassName("mint")[0].style.backgroundColor = "white";
  } catch(e) {
      console.log(".");
  }
}
      function countDownTimer(date) {
      var elem = $('#countDown');

      //$( "p" ).add( "div" ).addClass( "widget" );
      var futureTime = new Date(date).getTime();
        counting = true;
      main = setInterval(function() { 
        if (counting) {
            // Time left between future and current time in Seconds
            var timeLeft = Math.floor( (futureTime - new Date().getTime()) / 1000 );
            // console.log(timeLeft);
            
            // Days left = time left / Seconds per Day 
            var days =  Math.floor(timeLeft / 86400);
            // console.log(days);
            
            // 86400 seconds per Day
            timeLeft -= days * 86400;

            // console.log(timeLeft);
            
            // Hours left = time left / Seconds per Hour
            var hours = Math.floor(timeLeft / 3600) % 24;
            // console.log(hours);
            var mh = hours

            // 3600 seconds per Hour
            timeLeft -= hours * 3600;
            // console.log(timeLeft);
            
            // Minutes left = time left / Minutes per Hour
            var min = Math.floor(timeLeft / 60) % 60;
            var max = min;

            // console.log(min);
            
            // 60 seconds per minute
            timeLeft -= min * 60;
            // console.log(timeLeft);
            
            // Seconds Left
            var sec = timeLeft % 60;
            // Combined DAYS+HOURS+MIN+SEC
            if (mh > 2) {
              elem.html("Minting is live, ends tomorrow at 12 PM CST!");
              console.log("Minting live");
              counting = false;
              enable()
              setInterval(enable, 300);
            } else {
              var timeString = "Pre-Sale begins in "+
                              "<span class='hours'>"+hours+" hours "+"</span>"+
                              "<span class='minutes'>"+min+" minutes "+"</span>"+
                              "<span class='seconds'>"+sec+" seconds "+"</span>";
              elem.html(timeString);
            }
        }
          }, 1000);
      }

      document.addEventListener('DOMContentLoaded', function() {
        countDownTimer('March 16, 2021 12:00:00-05:00');
      }, false);