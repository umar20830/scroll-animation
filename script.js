
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


const index = {
    intialIndex: 0,
    finalIndex: 382
}

let imagesLoaded = 0;
const images = [];


function imagePreloader() {
    for (var i = 1; i <= index.finalIndex; i++) {
        const imageURL = `/frames/frame_${i.toString().padStart(4, "0")}.jpeg`
        let img = new Image;
        img.src = imageURL;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === index.finalIndex) {
                loadImg(index.intialIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImg(ind) {
    if (ind >= 0 && ind <= index.finalIndex) {
        const img = images[ind];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) /100;
        const offsetY = (canvas.width - newHeight) /100;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img,offsetX,offsetY,newWidth,newHeight);
        index.intialIndex = ind;

    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger:{
            trigger:".parent",
            start:"top top",
            scrub:2,
            end:"bottom bottom",
            // markers:true
        }
    })

    tl.to(index,{
        currentIndex: index.finalIndex,
        onUpdate:function(){
            loadImg(Math.floor(index.currentIndex))
        }
    })
}

imagePreloader();