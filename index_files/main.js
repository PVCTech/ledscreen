const ledScreen =
    document.getElementById("ledScreen");

const ledText =
    document.getElementById("ledText");

const closeBtn =
    document.getElementById("closeBtn");

const startBtn =
    document.getElementById("startBtn");

let animationId = null;
let hideTimer = null;

function showCloseButton(){

    closeBtn.style.display = "block";

    clearTimeout(hideTimer);

    hideTimer = setTimeout(()=>{

        closeBtn.style.display = "none";

    },5000);
}

function startAnimation(){

    let x = window.innerWidth;

    function frame(){

        const speed =
            parseInt(
                document.getElementById("speed").value
            );

        const width =
            ledText.offsetWidth;

        x -= speed;

        if(x < -width){

            x = window.innerWidth;
        }

        ledText.style.left =
            x + "px";

        animationId =
            requestAnimationFrame(frame);
    }

    frame();
}

async function startLed(){

    const text =
        (document
        .getElementById("message")
        .value || "PVC APP XIN CHÀO")
        .trim();

    ledText.textContent = text;

    ledText.style.color =
        document
        .getElementById("textColor")
        .value;

    ledScreen.style.background =
        document
        .getElementById("bgColor")
        .value;

    ledScreen.style.display =
        "block";

    try{

        await ledScreen.requestFullscreen();

    }catch(e){

        console.log(e);
    }

    cancelAnimationFrame(animationId);

    startAnimation();

    showCloseButton();
}

async function closeLed(){

    cancelAnimationFrame(animationId);

    ledScreen.style.display =
        "none";

    closeBtn.style.display =
        "none";

    if(document.fullscreenElement){

        await document.exitFullscreen();
    }
}

startBtn.addEventListener(
    "click",
    startLed
);

closeBtn.addEventListener(
    "click",
    closeLed
);

ledScreen.addEventListener(
    "mousemove",
    showCloseButton
);

ledScreen.addEventListener(
    "touchstart",
    showCloseButton
);

ledScreen.addEventListener(
    "click",
    function(e){

        if(e.target !== closeBtn){

            showCloseButton();
        }
    }
);

document.addEventListener(
    "fullscreenchange",
    function(){

        if(!document.fullscreenElement){

            cancelAnimationFrame(
                animationId
            );

            ledScreen.style.display =
                "none";

            closeBtn.style.display =
                "none";
        }
    }
);

document.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Escape"){

            closeLed();
        }
    }
);
