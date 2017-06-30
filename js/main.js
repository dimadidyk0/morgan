var thisDoc = document;
var timeout;

// #########################
// ##      PRELOADER      ##
// #########################

// function setPreloader() {
//     let 
//         images             = thisDoc.images, 
//         images_total_count = images.length,
//         images_load_count  = 0,
//         counter = thisDoc.querySelector('.preloader span');

//     for (let i = 0; i < images_total_count; i++) {
//         let 
//             image_clone = new Image();
//             image_clone.onload = image_loaded;
//             image_clone.onerror = image_loaded;
//             image_clone.src = images[i].src;
//     }

//     function image_loaded() {
//         images_load_count++;
//     }
// }

// function for preloader to show progress

// #########################
// ####     MACHINE     ####
// #########################

window.onload = function() {

    localStorage.setItem('isGifPlays', 'false');

    let preloader = thisDoc.querySelector('#preloader')
    if (preloader) preloader.remove();
    else console.log('Preloader not found')

    if (window.location.pathname === '/morgan/' || window.location.pathname === '/morgan/index.html') {

        let isVisited = localStorage.getItem('visited'),
            main = document.querySelector('.main');

        if (!isVisited) {
            setTimeout(function(){
                steamPage();
            }, 2500);    
        } else {
            main.remove();
            // if (thisDoc.querySelector('.machine__slider')) {
                getProducts()
                let machineSliderObj = {
                    slider      : thisDoc.querySelector('.machine__slider'), 
                    nextBtn     : thisDoc.querySelector('.machine__next'),
                    prevBtn     : thisDoc.querySelector('.machine__prev'),
                    playPause   : thisDoc.querySelector('.machine__play-pause')
                }

                setListSlider(machineSliderObj, true, true);
            // }
        }

        function steamPage() {

            localStorage.setItem('visited', true);

            let 
                steamInterval     = 500,
                steamImages       = 8,
                containerTimeout  = 6000,
                mainTimeout       = 11000;
            //  animationDuration = 8s (in CSS)
            //  main & container transition = 1s (in CSS)

            let firstImg = main.querySelector('img[src*=steam]');
                firstImg.classList.add('main__steam');
                

            var createSteam = setInterval(function() {

                let steam          = firstImg.cloneNode(true),
                    left           = ( Math.round(Math.random() * 50) - 45) + '%',
                    bottom         = ( Math.round(Math.random() * 60)) + '%',
                    steamContainer = main.querySelector('.steam-container');

                steam.setAttribute('style', `left: ${left}; margin-bottom: -${bottom};`);
                steamContainer.appendChild(steam);

            }, steamInterval);

                setTimeout(function() {
                clearInterval(createSteam);
            }, steamImages * steamInterval);

            setTimeout(function() {
                let container = main.querySelector('.main__container');
                container.style.opacity = '0';

                getProducts();
                let machineSliderObj = {
                    slider      : thisDoc.querySelector('.machine__slider'), 
                    nextBtn     : thisDoc.querySelector('.machine__next'),
                    prevBtn     : thisDoc.querySelector('.machine__prev'),
                    playPause   : thisDoc.querySelector('.machine__play-pause')
                }
                setListSlider(machineSliderObj, true, true);
            }, containerTimeout)

            setTimeout(function() {
                main.style.opacity = '0';
            }, mainTimeout);

            setTimeout(function() {
                main.remove();
            }, mainTimeout + 1000);
        }
        
    }

    if (thisDoc.querySelector('.categories')) {
        let categories = thisDoc.querySelectorAll('.category-item');
        categories.forEach(c => {
            let video = c.querySelector('video');
            c.onmouseover = function() {
                video.style.zIndex = '0';
                video.play();
            }
            c.onmouseout = function() {
                video.removeAttribute('style'); 
                video.pause();
            }
         });
    }

    if (thisDoc.querySelector('.about')) {
        let about = thisDoc.querySelector('.about');
        about.classList.add('about--active');
    }
    
}

// #########################
// ####      FORM       ####
// #########################

thisDoc.addEventListener("DOMContentLoaded", function() {

    

    let cactus  = thisDoc.querySelector('.header__cactus'),
        cog     = thisDoc.querySelector('.machine__cog'),
        nut     = thisDoc.querySelector('.machine__nut'),
        bug     = thisDoc.querySelector('.about__bug'),
        cube    = thisDoc.querySelector('.header__cube-rotates'),
        feather = thisDoc.querySelector('img[class*=feather]'),
        ball    = thisDoc.querySelector('img[class*=about__ball]');

    if (localStorage.getItem('cactus') && cactus) cactus.remove();
    else if (cactus) activateEasterEgg(cactus, 'cactus',  6700);
    
    if (localStorage.getItem('cog') && cog) cog.remove();
    else if (cog) activateEasterEgg(cog, 'cog',  5600);
    
    if (localStorage.getItem('nut') && nut) nut.remove();
    else if (nut) activateEasterEgg(nut, 'nut', 9100);

    if (localStorage.getItem('bug') && bug) bug.remove();
    else if (bug) activateEasterEgg(bug, 'bug',  5000);

    if (localStorage.getItem('feather') && feather) feather.remove();
    else if (feather) activateEasterEgg(feather, "feather", 10000);

    if (localStorage.getItem('ball') && ball) ball.remove();
    else if (ball) activateEasterEgg(ball, "ball", 7000);

    if (localStorage.getItem('allEggs') && cube) {
        cube.remove();
        thisDoc.querySelector('.header__butterfly-static').removeAttribute('style');
    } else if (cube) {
        let eggs   = +localStorage.getItem('eggs') || 0,
            src    = cube.getAttribute('src'),
            newSrc = src.replace('0', eggs);
        cube.setAttribute('src', newSrc);
    }


    // #########################
    // ##     PRODUCT       ####
    // #########################

    if (thisDoc.querySelector('.gallery__filter')) buildFilterForm();
    if (thisDoc.querySelector('.categories')) {
        buildCategories();

        let productForm = thisDoc.querySelector('#order-pop-up form');
        if (productForm) {
            var remove;
            productForm.oninput = function() {
                let img = thisDoc.querySelector('.place-order__img-container img');
                img.style.opacity = '1';
                off(remove);
                on(img, remove);
            }

            let 
                layout      = thisDoc.getElementById('layout'),
                orderPopUp  = thisDoc.getElementById('order-pop-up'),
                specRequest = thisDoc.querySelector('.special-request');
                thankYou    = thisDoc.getElementById('thank');

            specRequest.onclick = function() { 
                showHideLayout(layout, orderPopUp);
            };

            layout.onclick   = function() { showHideLayout(layout, orderPopUp) };

            productForm.onsubmit = function(e) {
                e.preventDefault();
                orderPopUp.removeAttribute('style');
                thankYou.className = 'thank--active';

                reloadGif(thankYou.querySelector('img'));

                let a = setTimeout(function a() {
                    thankYou.removeAttribute('class');
                    clearTimeout(a);
                } , 4000);

                let b = setTimeout(function b() {
                    layout.removeAttribute('style');
                    clearTimeout(b);
                } , 5000);

            }
        }
    }

    if (thisDoc.querySelector('.product')) {
        
        buildProductCard();
        
        let 
            product     = thisDoc.querySelector('.product'),
            previewList = Array.from(product.querySelectorAll('.product__slides li')),
            face        = product.querySelector('.product__face'),
            faceList    = Array.from(face.querySelectorAll('li'));


        previewList.forEach( (li,i)  => {

            if (li.querySelector('video')) faceList[i].style.opacity = '1';
            li.onclick = function() {
                let previous = face.querySelector('[style]');
                if (previous) previous.removeAttribute('style');
                faceList[i].style.opacity = '1';
            }
        }); 

        // ### PRICE #####
        let price       = product.querySelector('.product__price'),
            priceInner  = price.innerText,
            priceArray  = priceInner.split('');
        price.innerHTML = '';

        priceArray.forEach(i => {
            let span = thisDoc.createElement('span');
            span.setAttribute('data-content', i);
            span.innerHTML = i;
            if (i === '.') i = 'point';
            span.style.backgroundImage = `url(/morgan/img/price-${i}.png)`;
            price.appendChild(span);
        });

        let productForm = thisDoc.querySelector('#order-pop-up form');

        if (productForm) {
            var remove;
            productForm.oninput = function() {
                let img = thisDoc.querySelector('.place-order__img-container img');
                img.style.opacity = '1';
                off(remove);
                on(img, remove);
            }

            let 
                layout      = thisDoc.getElementById('layout'),
                orderPopUp  = thisDoc.getElementById('order-pop-up'),
                orderBtn    = thisDoc.querySelector('input[type="button"]'),
                specRequest = thisDoc.querySelector('.special-request');
                thankYou    = thisDoc.getElementById('thank');

            orderBtn.onclick = function() { 

                let newImg = new Image();
                newImg.src = '/morgan/img/buy-btn.gif';
                newImg.onload = function() {
                    orderBtn.classList.add('product__btn--active');
                }

                setTimeout(function() {
                    orderBtn.classList.remove('product__btn--active');
                    let btn   = orderPopUp.querySelector('.place-order__submit');
                    btn.value = 'Order'; 
                    showHideLayout(layout, orderPopUp);                    
                }, 1000);
            };

            specRequest.onclick = function() { 
                let btn   = orderPopUp.querySelector('.place-order__submit');
                btn.value = 'Request'; 
                showHideLayout(layout, orderPopUp);
            };

            layout.onclick   = function() { showHideLayout(layout, orderPopUp) };

            productForm.onsubmit = function(e) {
                e.preventDefault();
                orderPopUp.removeAttribute('style');
                thankYou.className = 'thank--active';

                reloadGif(thankYou.querySelector('img'));

                let a = setTimeout(function a() {
                    thankYou.removeAttribute('class');
                    clearTimeout(a);
                } , 4000);

                let b = setTimeout(function b() {
                    layout.removeAttribute('style');
                    clearTimeout(b);
                } , 5000);

            }
        }

        let container         = thisDoc.querySelector('.product__other'),
            allProducts       = JSON.parse(localStorage.getItem('json'))['products'];
            keys              = Object.keys(allProducts),
            currentProduct    = localStorage.getItem('currentProduct'),
            index             = keys.indexOf(currentProduct),

            other = [allProducts[keys[++index%keys.length]],
                     allProducts[keys[++index%keys.length]], 
                     allProducts[keys[++index%keys.length]], 
                     allProducts[keys[++index%keys.length]]];



        other.forEach(obj => {
            let div = thisDoc.createElement('div');
                
            div.innerHTML = 
                `
                <img src="${obj.images[0]}" alt="${obj.title}">
                <div>
                    <h5>${obj.category}, ${obj.year}</h5>
                    <h3>${obj.title}</h3>
                    <span>$${obj.price}</span>
                </div>
                <div class="gridzy__video-container">
                    <video muted class="category-item__video">
                        <source src="${obj.video}.mp4" type="video/mp4">
                        <source src="${obj.video}.webm" type="video/webm">
                        <source src="${obj.video}.ogv" type="video/ogg">
                    </video>
                </div>
                `;

            let a = document.createElement('a');
            a.setAttribute('href', "");
            a.onclick = function(e) {
                e.preventDefault();
                localStorage.setItem('currentProduct', obj.self)
                window.location = obj.link;
            }

            div.appendChild(a);
            container.appendChild(div);
        });

        setTimeout(function() {
        buildSlider();
        }, 200)
    }
});

function showHideLayout(layout, popUp) {

    if (layout.getAttribute('style')) {
        layout.removeAttribute('style');
        popUp.removeAttribute('style');
    } else {
        layout.style.display = 'block';
        popUp.style.visibility = 'initial';
    }

}

function on(img, timeout) {
    timeout = setTimeout(function() {
        img.removeAttribute('style');
    }, 5000);
}

function off(timeout) {
    clearTimeout(timeout);
}

// #########################
// ##     PROJECTOR     ####
// #########################

function setListSlider(obj, date, yearSlider) {
    
    let 
        slider      = obj.slider, 
        nextBtn     = obj.nextBtn,
        prevBtn     = obj.prevBtn,
        playPause   = obj.playPause,
        slides      = slider.querySelectorAll('li'),
        current     = 0,
        playing     = true;

    slides[0].classList.add('current-slide');

    if (date) changeProductDate();
    
    function nextSlide() {
        slides[current].classList.remove('current-slide');
        current = (current + slides.length + 1) % slides.length;
        slides[current].classList.add('current-slide');
        if (date) {
            changeProductDate();
            animateMachine();
        }
    };

    function prevSlide() {
        slides[current].classList.remove('current-slide');
        current = (current + slides.length - 1) % slides.length;
        slides[current].classList.add('current-slide');
        if (date) {
            changeProductDate();
            animateMachine();
        }
    };

    function animateMachine() {
        let noise   = thisDoc.querySelector('.machine__noise');
            machine = thisDoc.querySelector('.machine');

        machine.classList.add('machine--shake');
        noise.style.display = 'block';
        
        setTimeout(function() {
            noise.removeAttribute('style');
            machine.classList.remove('machine--shake');
        }, 1000);

        reloadGif(machine.querySelector('.machine__main-img'));
        reloadGif(machine.querySelector('.machine__wheel3'));

        // machine.querySelector('')
    };

    function changeProductDate() {
        let 
            dateBlock = document.querySelector('.machine__date-inner'),
            dateLampBlock = document.querySelector('.machine__lamp-date');
            date = thisDoc.querySelector('.current-slide').getAttribute('data-year'),
            dateArr =  date.split('');

        dateBlock.innerHTML = date;

        let dataBlockBefore = thisDoc.querySelector('.machine__date-inner--before'),
            dataBlockAfter  = thisDoc.querySelector('.machine__date-inner--after');

        dataBlockBefore.innerHTML = '';
        dataBlockAfter.innerHTML  = '';

        dateArr.forEach(e => {
            let before, after;
            if (e == 0) before = 9;
            else before = +e - 1;

            if (e == 9) after = 0
            else after = +e + 1;

            dataBlockBefore.innerHTML += before;
            dataBlockAfter.innerHTML  += after;
        });

        
        dateLampBlock.innerHTML = '';
            
        dateArr.forEach(i => {
            let lamp  = thisDoc.createElement('span'),
                value = thisDoc.createElement('span');
            value.setAttribute('data-content', i);
            if (i === '.') i = '12';
            else if (i === '-') i = '11';
            value.style.backgroundPositionY = `calc(${i} * -54px )`;
            value.style.animation = 'lampDate .5s 1';
            lamp.appendChild(value);
            dateLampBlock.appendChild(lamp);
        });
    
    } 

    nextBtn.onclick = function() {
        nextSlide();
        pauseSlideShow();
        pauseProjector()
    };

    prevBtn.onclick = function() {
        prevSlide();
        pauseSlideShow();
        pauseProjector();
    };

    playPause.onclick = function() {
        if (playing) pauseSlideShow();
        else playSlideShow();

        if (playPause.className === "gallery-projector__play-pause") playPauseProjector();
    };

    var slideInterval;

    setTimeout( function() {
        slideInterval = setInterval(function() {
            nextSlide();
        }, 4000);
    }, 5000);

    function pauseSlideShow() {
        playing = false;
        clearInterval(slideInterval);
    };

    function playSlideShow() {
        playing = true;
        slideInterval = setInterval(function() {
            nextSlide();
        }, 4000);
    };


    let 
        zoom       = thisDoc.querySelector('.machine__zoom'),
        photosBtn  = thisDoc.querySelector('.machine__photos-btn'),
        videoBtn   = thisDoc.querySelector('.machine__video-btn');

    photosBtn.onclick = function() {
        pauseSlideShow();
        showHideProjector();
        getProductImages();
        buildProjectorSlider();
    }

    videoBtn.onclick = function() {
        pauseSlideShow();
        showHideProjector();
        getProductVideo();
        animateProjector();
    }


    zoom.onclick = function() {
        pauseSlideShow();
        showHideProjector();
        getProductImages();
        buildProjectorSlider();
    };

    

    if (yearSlider) {
        function setNextSlide(sign) {
            pauseSlideShow();
            
            let 
                currentSlide = thisDoc.querySelector('.current-slide'),
                currentYear  = currentSlide.getAttribute('data-year'),
                nextSlide    = getNextSlide(sign, currentYear);

            currentSlide.classList.remove('current-slide');
            nextSlide.classList.add('current-slide');


            if (date) changeProductDate();

            let slides = Array.from(slider.querySelectorAll('li'));
            current = slides.indexOf(nextSlide);

            reloadGif(thisDoc.querySelector('.machine__tubes'));
            
            let wheel = thisDoc.querySelector('.machine__wheel2');
            wheel.classList.add('machine__wheel2--active');
            setTimeout(function() {
                wheel.classList.remove('machine__wheel2--active');
            }, 1000);
        }

        thisDoc.querySelector('.machine__date-prev').onclick = function() {setNextSlide('-')};
        thisDoc.querySelector('.machine__date-next').onclick = function() {setNextSlide('+')};
        
    }
};

function reloadGif(img) {
    img.setAttribute('src', img.getAttribute('src'));
}

function activateEasterEgg(elem, string, timeout) {

   
    elem.addEventListener('mouseover',  function activate() {  

        let isGifPlays = localStorage.getItem('isGifPlays');
        if ( isGifPlays !== 'true') {
            localStorage.setItem('isGifPlays', 'true');
            let eggCount = localStorage.getItem('eggs');
            if (eggCount) {
                localStorage.setItem('eggs', (+eggCount + 1));
                eggCount++;
            } else {
                localStorage.setItem('eggs', 1);
                eggCount = 1;
            }

            console.log(eggCount);
            
            if (!elem.getAttribute('data-png')) {
                let src    = elem.getAttribute('src'),
                    newSrc = src.replace('.png', '.gif');

                let image_clone = new Image();
                image_clone.src = newSrc;
                image_clone.onload = function() {
                    elem.setAttribute('src', newSrc);
                    elem.className += '-gif';
                }
            } else {
                elem.className += '-gif';
            }

            let cube         = thisDoc.querySelector('.header__cube-rotates'),
                cubeSrc      = cube.getAttribute('src')
                cubeSmoke    = new Image(),
                cubeSmokeSrc = cubeSrc.replace(`cube-${eggCount-1}`, 'cube-open');
            cubeSmoke.src = cubeSmokeSrc;
            cubeSmoke.onload = function() {
                setTimeout(function() {
                    cube.setAttribute('src', cubeSmokeSrc);
                    cube.className = 'header__cube';
                }, +timeout - 1500)

                setTimeout(function() {
                    elem.remove();
                }, timeout);

                setTimeout(function() {
                    cube.className = 'header__cube-rotates';
                    cube.setAttribute('src', cubeSrc.replace(`cube-${eggCount-1}`, `cube-${eggCount}`));
                    localStorage.setItem('isGifPlays', 'false');
                    if (eggCount === 6) activateButterfly(cube);
                }, +timeout + 1500)     

                elem.removeEventListener('mouseover', activate);
                localStorage.setItem(string, true);
            }

        } else {
            console.log('Wait until current gif end. ')
        }
    }); 
}


function activateButterfly(cube) {

            let batterfly = new Image();
            batterfly.src = '/morgan/img/butterfly.gif';
            batterfly.onload = function() {
                setTimeout(function() {
                    let img = thisDoc.createElement('img');
                    img.setAttribute('src', batterfly.src);
                    img.className = 'header__butterfly';
                    img.setAttribute('style', 'display: none;')
                    thisDoc.querySelector('header').appendChild(img);

                    cube.className = 'header__cube';
                    cube.setAttribute('src', cubeSmokeSrc);     
                    setTimeout(function() {
                        cube.remove();
                        img.removeAttribute('style');
                    }, 1500);

                    setTimeout(function() {
                        img.remove()
                        thisDoc.querySelector('.header__butterfly-static').removeAttribute('style');
                    }, 9500)
                }, 2000)
                
            } 

            localStorage.setItem('allEggs', true);

}
// var json = JSON.stringify({

//     "products" : {
//         "product-1" : {
//             "year"        : "2000",
//             "images"      : ["http://lorempixel.com/400/400/", "http://lorempixel.com/300/100/", "http://lorempixel.com/350/350/", "http://lorempixel.com/400/300/"], 
//             "video"       : "/morgan/img/video/header",
//             "self"        : "product-1",
//             "title"       : "title 1",
//             "link"        : "/product.html",
//             "size"        : "small",
//             "category"    : "category 1",
//             "price"       : "1999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-2"     : {
//             "year"      : "2000",
//             "images"    : ["http://lorempixel.com/401/400/","http://lorempixel.com/300/120/","http://lorempixel.com/360/350/","http://lorempixel.com/405/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-2",
//             "title"     : "title 2",
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "6999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-3"     : {
//             "year"      : "2002",
//             "images"    : ["http://lorempixel.com/402/400/","http://lorempixel.com/300/110/","http://lorempixel.com/340/350/","http://lorempixel.com/420/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-3",
//             "title"     : 'title 3',
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "5999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-4"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/403/400/","http://lorempixel.com/320/100/","http://lorempixel.com/350/320/","http://lorempixel.com/405/301/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-4",
//             "title"     : "title 4",
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "4999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-5"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/404/400/","http://lorempixel.com/310/100/","http://lorempixel.com/350/340/","http://lorempixel.com/420/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-5",
//             "title"     : "title 5",
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "2999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-6"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-6",
//             "title"     : "title 6",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-7"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-7",
//             "title"     : "title 7",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-8"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-8",
//             "title"     : "title 8",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 8",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-9"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-9",
//             "title"     : "title 9",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 9",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-10"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-10",
//             "title"     : "title 10",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-11"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/morgan/img/video/header",
//             "self"      : "product-11",
//             "title"     : "title 11",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//     },

//     "categories" : {
//         "category 1" : {
//             "self"        : "category 1",
//             "products"    : ["product-1","product-2","product-3","product-4","product-5"],
//             "description" : "Some text about category"
//         },
        
//         "category 2" : {
//             "self"        : "category 2",
//             "products"    : ["product-6","product-7","product-10","product-11"],
//             "description" : "Some text about category"
//         },
        
//         "category 8" : {
//             "self"        : "category 8",
//             "products"    : ["product-8"],
//             "description" : "Some text about category"
//         },

//         "category 9" : {
//             "self"        : "category 9",
//             "products"    : ["product-9"],
//             "description" : "Some text about category"
//         }
//     }
// });

var json = JSON.stringify( {
    "products" : {
        "product-1" : {
            "year"        : "2000",
            "images"      : ["/morgan/img/image-1.jpg"], 
            "video"       : "/morgan/img/video/credits",
            "self"        : "product-1",
            "title"       : "PLAYBOY",
            "link"        : "/product.html",
            "size"        : "small",
            "category"    : "Theme",
            "price"       : "1999",
            "description" : "some text about the product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-2"     : {
            "year"      : "2001",
            "images"    : ["/morgan/img/image-2.jpg"], 
            "video"     : "/morgan/img/video/credits",
            "self"      : "product-2",
            "title"     : "PLAYBOY",
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "6999",
            "description" : "some text about the product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-3"     : {
            "year"      : "2002",
            "images"    : ["/morgan/img/image-3.jpg","/morgan/img/image-3-1.jpg"], 
            "video"     : "/morgan/img/video/credits",
            "self"      : "product-3",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "5999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-4"     : {
            "year"      : "2002",
            "images"    : ["/morgan/img/image-3.jpg","/morgan/img/image-3-1.jpg"], 
            "video"     : "/morgan/img/video/credits",
            "self"      : "product-4",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "3999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-5"     : {
            "year"      : "2002",
            "images"    : ["/morgan/img/image-3.jpg","/morgan/img/image-3-1.jpg"], 
            "video"     : "/morgan/img/video/credits",
            "self"      : "product-5",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "4999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },
        
        "product-6"     : {
            "year"      : "2002",
            "images"    : ["/morgan/img/image-3.jpg","/morgan/img/image-3-1.jpg"], 
            "video"     : "/morgan/img/video/credits",
            "self"      : "product-6",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "1999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },
        
        "product-7"     : {
            "year"      : "2002",
            "images"    : ["/morgan/img/image-3.jpg","/morgan/img/image-3-1.jpg"], 
            "video"     : "/morgan/img/video/credits",
            "self"      : "product-7",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "2999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },
        
    },

    "categories" : {
        "Theme" : {
            "self"        : "Theme",
            "products"    : ["product-1"],
            "description" : "Some text about category Theme"
        },
        
        "Lampe" : {
            "self"        : "Lampe",
            "products"    : ["product-2","product-3","product-4","product-5","product-6","product-7"],
            "description" : "Some text about category Lampe"
        }     
    }
});


function fillLocalStorage() {

    let date = new Date();
    let today = `` + date.getFullYear() + date.getMonth() + date.getDate();

    if (localStorage.getItem('LOADED') === today) return null;

    let 
        parsedJSON  = JSON.parse(json),
        productKeys = Object.keys(parsedJSON["products"]),

        yearLinks      = {},
        sizeLinks      = {},
        categoryLinks  = {},

        years          = {},
        sizes          = {},
        categories     = {},
        selfLinks      = {},
        titles         = {};
        
        
    productKeys.forEach(k => {
        let obj = parsedJSON["products"][k];

        years[obj.year]          = true;
        categories[obj.category] = true;
        sizes[obj.size]          = true;
        selfLinks[obj.self]      = true;
        titles[obj.title]        = true;


        if (yearLinks[obj.year]) yearLinks[obj.year].push(obj.self);
        else yearLinks[obj.year] = [obj.self];
        
        if (sizeLinks[obj.size]) sizeLinks[obj.size].push(obj.self);
        else sizeLinks[obj.size] = [obj.self];
        
        if (categoryLinks[obj.category]) categoryLinks[obj.category].push(obj.self);
        else categoryLinks[obj.category] = [obj.self];


        localStorage.setItem(obj.self, JSON.stringify(obj));
    });

    localStorage.setItem("yearLinks",     JSON.stringify(yearLinks));
    localStorage.setItem("sizeLinks",     JSON.stringify(sizeLinks));
    localStorage.setItem("categoryLinks", JSON.stringify(categoryLinks));

    localStorage.setItem('years',      Object.keys(years));
    localStorage.setItem('sizes',      Object.keys(sizes));
    localStorage.setItem('categories', Object.keys(categories));
    localStorage.setItem('titles',     Object.keys(titles));
    localStorage.setItem('selfLinks',  Object.keys(selfLinks));

    localStorage.setItem('allProducts', productKeys);
    localStorage.setItem('json',        json);
    localStorage.setItem('LOADED',      today);
}



fillLocalStorage();

function getProducts() {

    var 
        parsedJSON  = JSON.parse(localStorage.getItem('json'))['products'],
        keys        = Object.keys(parsedJSON);

    keys.forEach(k => {
        let obj = parsedJSON[k];

        let 
            item    = thisDoc.createElement('li'),
            img     = thisDoc.createElement('img'),
            a       = thisDoc.createElement('a');

        img.setAttribute('src', obj.images[0]);
        img.setAttribute('alt', obj.title || 'Product image');
        img.setAttribute('title', obj.title || 'Product image');

        a.setAttribute('href', '');
        a.onclick = function(e) {
            e.preventDefault();
            localStorage.setItem('currentProduct', obj.self);
            window.location = obj.link;
        }

        item.appendChild(img);
        item.appendChild(a);
        item.setAttribute('data-key', obj.self);
        item.setAttribute('data-year', obj.year);
        
        thisDoc.querySelector('.machine__slider').appendChild(item);
        
    }); 
    
}
function getNextSlide(sign, year) {
    var 
        sequent = '',
        years   = localStorage.getItem('years').split(','),
        current = +years.indexOf(year);

    if      (sign == '-')   sequent = (current + years.length - 1) % years.length;
    else if (sign == '+')   sequent = (current + years.length + 1) % years.length;

    else {
        console.log('sign is not correct. sign can be "+" or "-"')
        return false;
    }

    return thisDoc.querySelector('.machine [data-year="' + years[sequent] +'"]');
}



function showHideProjector() {
    let 
        machine     = thisDoc.querySelector('.machine'),
        projector   = thisDoc.querySelector('.gallery-projector'),
        back        = projector.querySelector('.gallery-projector__back');

    projector.style.bottom = '0';

    back.onclick = function() {
        projector.removeAttribute('style');   
        projector.removeAttribute('data-condition');   
        clearTimeout(timeout);
        pauseProjector();
    }
}

function getProductImages() {
    let 
        slider      = thisDoc.querySelector('.gallery-projector__slider'),
        urn         = thisDoc.querySelector('.current-slide').getAttribute('data-key'),
        product     = JSON.parse(localStorage.getItem(urn));
        images      = product.images;
        
    slider.innerHTML = '<span class="gallery-projector__layer"></span>';
    images.forEach(i => {
        let 
            li = thisDoc.createElement('li'),
            img = thisDoc.createElement('img');

        img.setAttribute('alt', product.title || 'Product image');
        img.setAttribute('title', product.title || 'Product image');
        img.setAttribute('src', i);

        li.appendChild(img);
        slider.appendChild(li);
    });
}

function getProductVideo() {
    let 
        slider      = thisDoc.querySelector('.gallery-projector__slider'),
        urn         = thisDoc.querySelector('.current-slide').getAttribute('data-key'),
        product     = JSON.parse(localStorage.getItem(urn));
        videoSrc    = product.video,
        projector   = slider.parentNode;

    slider.innerHTML = '<span class="gallery-projector__layer"></span>';
    let 
        li      = thisDoc.createElement('li'),
        video   = thisDoc.createElement('video');
    
    video.load();
    video.setAttribute('loop', '');
    video.setAttribute('autobuffer', '');
    video.innerHTML = 
    `
        <source src="${videoSrc}.mp4" type="video/mp4">
        <source src="${videoSrc}.webm" type="video/webm">
        <source src="${videoSrc}.ogv" type="video/ogg">
    `;

    li.appendChild(video);
    slider.appendChild(video);

    let 
        playPause   = projector.querySelector('.gallery-projector__play-pause'),
        next        = projector.querySelector('.gallery-projector__next'),
        prev        = projector.querySelector('.gallery-projector__prev');

    playPause.onclick = function() {
        if (video.paused == false) video.pause();
        else video.play();
    }

    next.onclick = function() {
        video.currentTime =  video.currentTime + video.duration / 10;
    }

    prev.onclick = function() {
        video.currentTime =  video.currentTime - video.duration / 10;
    }


}

function buildProjectorSlider() {

    let projectorSliderObj  = {
        slider      : thisDoc.querySelector('.gallery-projector__slider'), 
        nextBtn     : thisDoc.querySelector('.gallery-projector__next'),
        prevBtn     : thisDoc.querySelector('.gallery-projector__prev'),
        playPause   : thisDoc.querySelector('.gallery-projector__play-pause')
    }

    animateProjector();

    setListSlider(projectorSliderObj);
}
function animateProjector( ) {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite'),
        animation = 'animation: projectorStart .6s  steps(1, end) infinite;',
        layer = thisDoc.querySelector('.gallery-projector__layer');
    projector.setAttribute('style', 'display:none;')

    timeout = setTimeout(function() {
        projector.setAttribute('style', animation);
        setTimeout(function(){
            playProjector();
            layer.classList.add('gallery-projector__layer--active');
        }, 600)
    },500)

}   

function playPauseProjector() {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite'),
        condition = projector.getAttribute('data-condition');

    if (condition === 'play') pauseProjector();
    else playProjector();
    
}

function playProjector() {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite');
    projector.setAttribute('style', 'animation: projectorMain .5s  steps(1, end) infinite;');
    projector.setAttribute('data-condition', 'play');
}

function pauseProjector() {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite');  
    projector.setAttribute('style', '');
    projector.setAttribute('data-condition', 'pause');
}

function myMap() {
    var a = +localStorage.getItem('zoom');
    var mapProp= {
        center: new google.maps.LatLng(46.461275,6.845362),
        mapTypeId           : 'satellite',
        zoom                : a || 15,
        panControl          : false,
        zoomControl         : false,
        mapTypeControl      : false,
        scaleControl        : false,
        streetViewControl   : false,
        overviewMapControl  : false,
        rotateControl       : false
    };


    let minus = document.querySelector('.map-minus');
    let plus = document.querySelector('.map-plus');

    plus.onclick = function(e) {
        e.preventDefault();
        let a  = mapProp.zoom + 1;
        localStorage.setItem('zoom', a);
        myMap();
    }

    minus.onclick = function(e) {
        e.preventDefault();
        let a  = mapProp.zoom - 1;
        localStorage.setItem('zoom', a);
        myMap();
    }
    
    var map = new google.maps.Map(document.getElementById("contacts__map"),mapProp);
    var marker = new google.maps.Marker({position:mapProp.center});
    marker.setMap(map);
}

function scorePressed() {
    let pressedAnimationCount = localStorage.getItem('pressed');
    if (pressedAnimationCount) {
        localStorage.setItem('pressed', ++pressedAnimationCount);
    }
    else {
        localStorage.setItem('pressed', 1);
    }
}




if (thisDoc.querySelector('.gallery__filter')) filterGellery()

function filterGellery() {
    let filter     = thisDoc.querySelector('.gallery__filter'),
        submit     = filter.querySelector('input[type=submit]'),
        categories = JSON.parse(localStorage.getItem('categoryLinks')),
        years      = JSON.parse(localStorage.getItem('yearLinks')),
        sizes      = JSON.parse(localStorage.getItem('sizeLinks')),
        result;


        let selects = Array.from(filter.querySelectorAll('select'));

    selects.forEach(s => {
        

        s.onchange = function() {
            let 
                filters     = getFilters(filter),
                yearArr     = findInObj(filters.year, years),
                categoryArr = findInObj(filters.category, categories),
                sizesArr    = findInObj(filters.size, sizes);

            let products; 

            if ( yearArr === 'all' && categoryArr === 'all' && sizesArr === 'all' ) {
                products = localStorage.getItem('allProducts');
            } else {
                products = filterProducts(sizesArr, yearArr, categoryArr);
            }

            localStorage.setItem('currentCategory', filters.category);
            localStorage.setItem('currentYear', filters.year);
            localStorage.setItem('currentSize', filters.size);
            localStorage.setItem('currentGalleryList', products);

            buildGallery();
        }
    });

    submit.onclick = function(e) {
        e.preventDefault();

        let inputInner = filter.querySelector('input[type=text]').value;
        let products = [];

        let titles    = localStorage.getItem('titles').split(','),
            selfLinks = localStorage.getItem('selfLinks').split(',');

        titles.forEach( (t, i) => {
            if (t.indexOf(inputInner) != -1) {
                products.push(selfLinks[i]);
            }
        }); 


        localStorage.setItem('currentGalleryList', products);
        buildGallery();
    }

    function filterProducts() {

        var prevList = result = [];
        Array.from(arguments).forEach( (current, i)  => {

            result = [];
            if (prevList.length > 0 && current !== 'all' && prevList !== 'all') {

                prevList.forEach( j => {
                    if (current.indexOf(j) != -1) result.push(j);
                })
                prevList = result;

            } else if (i == 0 || prevList === 'all') prevList = current;
        });
        
        return prevList;
    }
            
}

function getFilters(filter)  {
    let obj =  {
        year     : filter.querySelector('#filter-year').value,
        category : filter.querySelector('#filter-category').value,
        size     : filter.querySelector('#filter-size').value
    }
    return obj;
}

function findInObj(value, obj) {
    if (value == 'all')  return 'all'
    else if (obj[value]) return obj[value];
    else                 return [];
}    

function buildSlider() {
    let container = document.querySelector('.gridzy');
    let elements  = Array.from(container.children);

    if (elements.length > 2 ) {
        new Gridzy(document.querySelector('.gridzy'));
    } else {
        elements.forEach(e => {
            e.className = 'gridzyItemContent gridzyItem gridzyItem--another'
        })
    }

    elements.forEach(b => {
        let video = b.querySelector('video');
        b.onmouseover = function() {video.play();}
        b.onmouseout  = function() {video.pause();}
    })


    let galleryList = Array.from(document.querySelectorAll('.gridzyItemContent'));
    galleryList.forEach(b => {

        let 
            title         = b.querySelector('h3'),
            blockW        = b.clientWidth,
            blockH        = b.clientHeight,
            textContainer = b.querySelector('div');

        if (blockH > blockW) {
            textContainer.style.alignItems  = 'flex-start';
            title.style.fontSize = (blockW * 0.12) + 'px';
            title.style.lineHeight = (blockW * .14) + 'px';
        } else {
            title.style.fontSize = (blockW * 0.08) + 'px';
            title.style.lineHeight = (blockW * .11) + 'px';
        }

    });
}


function buildGallery() {
    let 
        container = thisDoc.querySelector('.gridzy'),
        prevElem  = container.nextElementSibling,
        clone     = container.cloneNode(false),
        notFound  = thisDoc.querySelector('.gallery__not-found'),
        json      = JSON.parse(localStorage.getItem('json')),
        products;


    if (localStorage.getItem('currentGalleryList')) {
        products  = localStorage.getItem('currentGalleryList').split(',');
    } else if (localStorage.getItem('currentGalleryList') == '') {
        products = [];
    } else if (localStorage.getItem('allProducts')) {
        products = localStorage.getItem('allProducts').split(',');
    } else {
        products = [];
    }
    
    
    
    if (products.length > 0 && products[0] !== '') {
    
        notFound.setAttribute('style', '');

        document.querySelector('body').insertBefore(clone, prevElem);
        container.remove();
        container = thisDoc.querySelector('.gridzy');

        products.forEach(product => {
            let obj = json["products"][product];
            let div = thisDoc.createElement('div');
                
            div.innerHTML = 
                `
                <img src="${obj.images[0]}" alt="${obj.title}">
                <div>
                    <h5>${obj.category}, ${obj.year}</h5>
                    <h3>${obj.title}</h3>
                    <span>$${obj.price}</span>
                </div>
                <div class="gridzy__video-container">
                    <video muted class="category-item__video">
                        <source src="${obj.video}.mp4" type="video/mp4">
                        <source src="${obj.video}.webm" type="video/webm">
                        <source src="${obj.video}.ogv" type="video/ogg">
                    </video>
                </div>
                `;

            let a = document.createElement('a');
            a.setAttribute('href', "");
            a.onclick = function(e) {
                e.preventDefault();
                localStorage.setItem('currentProduct', obj.self)
                window.location = obj.link;
            }
            div.appendChild(a);
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '';
        notFound.style.display = 'block';
    }

    setTimeout(function() {
        buildSlider();
    }, 200);
}   

function buildFilterForm() {
    let container = thisDoc.querySelector('.gallery__filter-list');

    let 
        option      = thisDoc.createElement('option');
        years       = localStorage.getItem('years').split(','),
        categories  = localStorage.getItem('categories').split(','),
        sizes       = localStorage.getItem('sizes').split(','),

    filterCategory = container.querySelector('#filter-category'),
    filterYear = container.querySelector('#filter-year'),
    filterSize = container.querySelector('#filter-size');

    createOptions(filterCategory, categories, 'currentCategory');
    createOptions(filterYear, years, 'currentYear');
    createOptions(filterSize, sizes, 'currentSize');

    function createOptions(select, array, localCurrent) {
        array.forEach( j => {
            let item = thisDoc.createElement('option');
            item.setAttribute('value', j);
            item.innerHTML = j;
            current = localStorage.getItem(`${localCurrent}`);
            if (j == current) item.setAttribute('selected', '')
            select.appendChild(item);
        })
    } 

    setTimeout(function() {
        buildGallery();
    }, 200);
}
// buildFilterForm();


function buildCategories() {
    let container       = thisDoc.querySelector('.categories'),
        json            = JSON.parse(localStorage.getItem('json')),
        categories      = json['categories'];
        categoriesKeys  = Object.keys(categories);

    categoriesKeys.forEach(c => {
        let current = categories[c];
            obj     = json['products'][current['products'][0]];

        let category = thisDoc.createElement('div');
        category.className = 'category-item';
        category.innerHTML = 
        `
            
            <video muted class="category-item__video">
                <source src="${obj.video}.mp4" type="video/mp4">
                <source src="${obj.video}.webm" type="video/webm">
                <source src="${obj.video}.ogv" type="video/ogg">
            </video>
            <div class="category-item__text-block">
                <h3 class="category-item__header">${obj.category}</h3>
                <h4 class="category-item__subheader">${current["description"]}</h4>
            </div>
        `;


        let link = thisDoc.createElement('a');
        link.setAttribute('href', '');
        link.onclick = function(e) {
            e.preventDefault();
            localStorage.setItem('currentCategory', current['self']);
            localStorage.setItem('currentGalleryList', json['categories'][c]['products'])
            window.location = '/morgan/gallery.html';
        }

        let span = thisDoc.createElement('span');
        span.setAttribute('style', `background-image: url(${obj.images[0]});`);

        category.appendChild(link);
        category.appendChild(span);
        container.appendChild(category);
    });
}

function buildProductCard() {
    let container       = thisDoc.querySelector('.product'),
        json            = JSON.parse(localStorage.getItem('json')),
        currentProduct  = localStorage.getItem('currentProduct'),
        obj             = json['products'][currentProduct],
        product         = thisDoc.createElement('div');
       

    let images = obj['images'],
        list   = thisDoc.createElement('ul');

    images.forEach(src => {
        let li  = thisDoc.createElement('li');
        let img = thisDoc.createElement('img');
        img.setAttribute('src', src);
        li.appendChild(img);
        list.appendChild(li);
    });

    let parameterList = thisDoc.createElement('div'),
        parameters    = obj.parameters;
    
    Object.keys(parameters).forEach(p => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${p}:</span> ${parameters[p]}</li>`;
        parameterList.appendChild(li);
    });

    container.innerHTML  =  
        `
        <div class="product__container">
            <div class="product__face">
                <ul>
                    ${list.innerHTML || ''}
                    <li>
                        <video muted controls>
                            <source src="${obj.video}.mp4" type="video/mp4">
                            <source src="${obj.video}.webm" type="video/webm">
                            <source src="${obj.video}.ogv" type="video/ogg">
                        </video>
                    </li>
                </ul>
            </div>

            <div class="product__info-block">
                <span class="product__year">${obj.year}</span>
                <h3 class="product__name" title="${obj.title|| ''}"><span>${obj.title|| ''}</span></h3>
                <p class="product__description">${obj.description || ''}</p>

                <ul class="product__parameters">
                    ${parameterList.innerHTML || ''}
                </ul>
                <div class="product__buy-block">
                    <div class="product__price">${obj.price || ''}</div>
                    <input type="button" class="product__btn" value="buy">
                </div>
            </div>
        </div>

        <ul class="product__slides">
            ${list.innerHTML || ''}
            <li>
                <video muted class="category-item__video">
                    <source src="${obj.video}.mp4" type="video/mp4">
                    <source src="${obj.video}.webm" type="video/webm">
                    <source src="${obj.video}.ogv" type="video/ogg">
                </video>
            </li>
        </ul>
        `;

    
}
'use strict';

// window.onload = function() {
//     let windowW = window.innerWidth;
//     let totalW = 0;
//     let gallery = document.querySelector('.gallery');
//     if (gallery) {


//         let items = document.querySelectorAll('.gallery>div');
//         let images = Array.from(gallery.querySelectorAll('img'));


//         items.forEach(i => {
//             let img = i.querySelector('img');
//             let h = getComputedStyle(img).height;
//             let w = getComputedStyle(img).width;
//             i.style.height = h;
//             i.style.width = w;
//             totalW += parseInt(w);
//             // задаю параметры блока, который будут идентичны параметрам картинки
//             // + определяю суммарную ширину всех картинок для определения количества строк
//         });

//         let rows = Math.round(totalW / windowW);
//         // количество строк
//         let diff = 0.9;
//         // возможная разница параметров блока


//         // for (let i = 0; i < rows; i++) { 
//         // console.log(Array.isArray(images));
//         createRow(images, windowW, rows, diff);

//         // }

//         function createRow(arr, rowWidth, rows, diff) {
//             let windowW = window.innerWidth;

//             for (let i = 0; i < rows && arr.length > 0; i++) {

//                 for (let w = 0, z = 0;
//                     (diff * w < windowW && windowW > w / diff);) {

//                     if (z > 100) break;

//                     let itemW = parseInt(getComputedStyle(arr[0]).width);
//                     arr[0].classList.add(i);
//                     arr.shift();
//                     w += itemW;
//                     z++;
//                     console.log(diff * w);
//                     console.log(w / diff);
//                     console.log(arr);
//                 }

//                 // let w = parseInt(getComputedStyle(arr[z]).width);
//                 // y += 1;
//                 // z++;
//             }

//             // diff * w < windowW && windowW < diff / w
//         }

//         items.forEach(i => {
//             // let w = parseInt(getComputedStyle(i).height); 
//             // let newW = w - w * diff;
//             // i.style.height = newW + 'px';
//         })
//     }
//     // columns.forEach((c, i) => {

//     // });
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzR2lmUGxheXMnLCAnZmFsc2UnKTtcblxuICAgIGxldCBwcmVsb2FkZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNwcmVsb2FkZXInKVxuICAgIGlmIChwcmVsb2FkZXIpIHByZWxvYWRlci5yZW1vdmUoKTtcbiAgICBlbHNlIGNvbnNvbGUubG9nKCdQcmVsb2FkZXIgbm90IGZvdW5kJylcblxuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvaW5kZXguaHRtbCcpIHtcblxuICAgICAgICBsZXQgaXNWaXNpdGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Zpc2l0ZWQnKSxcbiAgICAgICAgICAgIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuXG4gICAgICAgIGlmICghaXNWaXNpdGVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3RlYW1QYWdlKCk7XG4gICAgICAgICAgICB9LCAyNTAwKTsgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYWluLnJlbW92ZSgpO1xuICAgICAgICAgICAgLy8gaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgICAgICAgICAgZ2V0UHJvZHVjdHMoKVxuICAgICAgICAgICAgICAgIGxldCBtYWNoaW5lU2xpZGVyT2JqID0ge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19uZXh0JyksXG4gICAgICAgICAgICAgICAgICAgIHByZXZCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcHJldicpLFxuICAgICAgICAgICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldExpc3RTbGlkZXIobWFjaGluZVNsaWRlck9iaiwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdGVhbVBhZ2UoKSB7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd2aXNpdGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBzdGVhbUludGVydmFsICAgICA9IDUwMCxcbiAgICAgICAgICAgICAgICBzdGVhbUltYWdlcyAgICAgICA9IDgsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyVGltZW91dCAgPSA2MDAwLFxuICAgICAgICAgICAgICAgIG1haW5UaW1lb3V0ICAgICAgID0gMTEwMDA7XG4gICAgICAgICAgICAvLyAgYW5pbWF0aW9uRHVyYXRpb24gPSA4cyAoaW4gQ1NTKVxuICAgICAgICAgICAgLy8gIG1haW4gJiBjb250YWluZXIgdHJhbnNpdGlvbiA9IDFzIChpbiBDU1MpXG5cbiAgICAgICAgICAgIGxldCBmaXJzdEltZyA9IG1haW4ucXVlcnlTZWxlY3RvcignaW1nW3NyYyo9c3RlYW1dJyk7XG4gICAgICAgICAgICAgICAgZmlyc3RJbWcuY2xhc3NMaXN0LmFkZCgnbWFpbl9fc3RlYW0nKTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgdmFyIGNyZWF0ZVN0ZWFtID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RlYW0gICAgICAgICAgPSBmaXJzdEltZy5jbG9uZU5vZGUodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgICAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA1MCkgLSA0NSkgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA2MCkpICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICBzdGVhbUNvbnRhaW5lciA9IG1haW4ucXVlcnlTZWxlY3RvcignLnN0ZWFtLWNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAgICAgc3RlYW0uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAke2xlZnR9OyBtYXJnaW4tYm90dG9tOiAtJHtib3R0b219O2ApO1xuICAgICAgICAgICAgICAgIHN0ZWFtQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZWFtKTtcblxuICAgICAgICAgICAgfSwgc3RlYW1JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY3JlYXRlU3RlYW0pO1xuICAgICAgICAgICAgfSwgc3RlYW1JbWFnZXMgKiBzdGVhbUludGVydmFsKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcubWFpbl9fY29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG5cbiAgICAgICAgICAgICAgICBnZXRQcm9kdWN0cygpO1xuICAgICAgICAgICAgICAgIGxldCBtYWNoaW5lU2xpZGVyT2JqID0ge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19uZXh0JyksXG4gICAgICAgICAgICAgICAgICAgIHByZXZCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcHJldicpLFxuICAgICAgICAgICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRMaXN0U2xpZGVyKG1hY2hpbmVTbGlkZXJPYmosIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgfSwgY29udGFpbmVyVGltZW91dClcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtYWluLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICB9LCBtYWluVGltZW91dCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbWFpbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIG1haW5UaW1lb3V0ICsgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmNhdGVnb3JpZXMnKSkge1xuICAgICAgICBsZXQgY2F0ZWdvcmllcyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvckFsbCgnLmNhdGVnb3J5LWl0ZW0nKTtcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgbGV0IHZpZGVvID0gYy5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICAgICAgYy5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZpZGVvLnN0eWxlLnpJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjLm9ubW91c2VvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7IFxuICAgICAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKSkge1xuICAgICAgICBsZXQgYWJvdXQgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dCcpO1xuICAgICAgICBhYm91dC5jbGFzc0xpc3QuYWRkKCdhYm91dC0tYWN0aXZlJyk7XG4gICAgfVxuICAgIFxufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyMjICAgICAgRk9STSAgICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbnRoaXNEb2MuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBcblxuICAgIGxldCBjYWN0dXMgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jYWN0dXMnKSxcbiAgICAgICAgY29nICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2NvZycpLFxuICAgICAgICBudXQgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbnV0JyksXG4gICAgICAgIGJ1ZyAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fYnVnJyksXG4gICAgICAgIGN1YmUgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2N1YmUtcm90YXRlcycpLFxuICAgICAgICBmZWF0aGVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdpbWdbY2xhc3MqPWZlYXRoZXJdJyksXG4gICAgICAgIGJhbGwgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJ2ltZ1tjbGFzcyo9YWJvdXRfX2JhbGxdJyk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhY3R1cycpICYmIGNhY3R1cykgY2FjdHVzLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGNhY3R1cykgYWN0aXZhdGVFYXN0ZXJFZ2coY2FjdHVzLCAnY2FjdHVzJywgIDY3MDApO1xuICAgIFxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29nJykgJiYgY29nKSBjb2cucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoY29nKSBhY3RpdmF0ZUVhc3RlckVnZyhjb2csICdjb2cnLCAgNTYwMCk7XG4gICAgXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdudXQnKSAmJiBudXQpIG51dC5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChudXQpIGFjdGl2YXRlRWFzdGVyRWdnKG51dCwgJ251dCcsIDkxMDApO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdidWcnKSAmJiBidWcpIGJ1Zy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChidWcpIGFjdGl2YXRlRWFzdGVyRWdnKGJ1ZywgJ2J1ZycsICA1MDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmVhdGhlcicpICYmIGZlYXRoZXIpIGZlYXRoZXIucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoZmVhdGhlcikgYWN0aXZhdGVFYXN0ZXJFZ2coZmVhdGhlciwgXCJmZWF0aGVyXCIsIDEwMDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFsbCcpICYmIGJhbGwpIGJhbGwucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoYmFsbCkgYWN0aXZhdGVFYXN0ZXJFZ2coYmFsbCwgXCJiYWxsXCIsIDcwMDApO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxFZ2dzJykgJiYgY3ViZSkge1xuICAgICAgICBjdWJlLnJlbW92ZSgpO1xuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1dHRlcmZseS1zdGF0aWMnKS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSBlbHNlIGlmIChjdWJlKSB7XG4gICAgICAgIGxldCBlZ2dzICAgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VnZ3MnKSB8fCAwLFxuICAgICAgICAgICAgc3JjICAgID0gY3ViZS5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICAgICAgbmV3U3JjID0gc3JjLnJlcGxhY2UoJzAnLCBlZ2dzKTtcbiAgICAgICAgY3ViZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIG5ld1NyYyk7XG4gICAgfVxuXG5cbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gIyMgICAgIFBST0RVQ1QgICAgICAgIyMjI1xuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSkgYnVpbGRGaWx0ZXJGb3JtKCk7XG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmNhdGVnb3JpZXMnKSkge1xuICAgICAgICBidWlsZENhdGVnb3JpZXMoKTtcblxuICAgICAgICBsZXQgcHJvZHVjdEZvcm0gPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNvcmRlci1wb3AtdXAgZm9ybScpO1xuICAgICAgICBpZiAocHJvZHVjdEZvcm0pIHtcbiAgICAgICAgICAgIHZhciByZW1vdmU7XG4gICAgICAgICAgICBwcm9kdWN0Rm9ybS5vbmlucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnBsYWNlLW9yZGVyX19pbWctY29udGFpbmVyIGltZycpO1xuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgICAgIG9mZihyZW1vdmUpO1xuICAgICAgICAgICAgICAgIG9uKGltZywgcmVtb3ZlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGxheW91dCAgICAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnbGF5b3V0JyksXG4gICAgICAgICAgICAgICAgb3JkZXJQb3BVcCAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdvcmRlci1wb3AtdXAnKSxcbiAgICAgICAgICAgICAgICBzcGVjUmVxdWVzdCA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnNwZWNpYWwtcmVxdWVzdCcpO1xuICAgICAgICAgICAgICAgIHRoYW5rWW91ICAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgndGhhbmsnKTtcblxuICAgICAgICAgICAgc3BlY1JlcXVlc3Qub25jbGljayA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG5cbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdS5jbGFzc05hbWUgPSAndGhhbmstLWFjdGl2ZSc7XG5cbiAgICAgICAgICAgICAgICByZWxvYWRHaWYodGhhbmtZb3UucXVlcnlTZWxlY3RvcignaW1nJykpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGEoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYW5rWW91LnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGEpO1xuICAgICAgICAgICAgICAgIH0gLCA0MDAwKTtcblxuICAgICAgICAgICAgICAgIGxldCBiID0gc2V0VGltZW91dChmdW5jdGlvbiBiKCkge1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoYik7XG4gICAgICAgICAgICAgICAgfSAsIDUwMDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpKSB7XG4gICAgICAgIFxuICAgICAgICBidWlsZFByb2R1Y3RDYXJkKCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgXG4gICAgICAgICAgICBwcm9kdWN0ICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSxcbiAgICAgICAgICAgIHByZXZpZXdMaXN0ID0gQXJyYXkuZnJvbShwcm9kdWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19zbGlkZXMgbGknKSksXG4gICAgICAgICAgICBmYWNlICAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2ZhY2UnKSxcbiAgICAgICAgICAgIGZhY2VMaXN0ICAgID0gQXJyYXkuZnJvbShmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuXG5cbiAgICAgICAgcHJldmlld0xpc3QuZm9yRWFjaCggKGxpLGkpICA9PiB7XG5cbiAgICAgICAgICAgIGlmIChsaS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpKSBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgbGkub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91cyA9IGZhY2UucXVlcnlTZWxlY3RvcignW3N0eWxlXScpO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cykgcHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcblxuICAgICAgICAvLyAjIyMgUFJJQ0UgIyMjIyNcbiAgICAgICAgbGV0IHByaWNlICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fcHJpY2UnKSxcbiAgICAgICAgICAgIHByaWNlSW5uZXIgID0gcHJpY2UuaW5uZXJUZXh0LFxuICAgICAgICAgICAgcHJpY2VBcnJheSAgPSBwcmljZUlubmVyLnNwbGl0KCcnKTtcbiAgICAgICAgcHJpY2UuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgcHJpY2VBcnJheS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gaTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAncG9pbnQnO1xuICAgICAgICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9pbWcvcHJpY2UtJHtpfS5wbmcpYDtcbiAgICAgICAgICAgIHByaWNlLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcHJvZHVjdEZvcm0gPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNvcmRlci1wb3AtdXAgZm9ybScpO1xuXG4gICAgICAgIGlmIChwcm9kdWN0Rm9ybSkge1xuICAgICAgICAgICAgdmFyIHJlbW92ZTtcbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uaW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucGxhY2Utb3JkZXJfX2ltZy1jb250YWluZXIgaW1nJyk7XG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICAgICAgb2ZmKHJlbW92ZSk7XG4gICAgICAgICAgICAgICAgb24oaW1nLCByZW1vdmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgbGF5b3V0ICAgICAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdsYXlvdXQnKSxcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ29yZGVyLXBvcC11cCcpLFxuICAgICAgICAgICAgICAgIG9yZGVyQnRuICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJyksXG4gICAgICAgICAgICAgICAgc3BlY1JlcXVlc3QgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5zcGVjaWFsLXJlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdSAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ3RoYW5rJyk7XG5cbiAgICAgICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgXG5cbiAgICAgICAgICAgICAgICBsZXQgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9ICcvaW1nL2J1eS1idG4uZ2lmJztcbiAgICAgICAgICAgICAgICBuZXdJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3RfX2J0bi0tYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdF9fYnRuLS1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biAgID0gb3JkZXJQb3BVcC5xdWVyeVNlbGVjdG9yKCcucGxhY2Utb3JkZXJfX3N1Ym1pdCcpO1xuICAgICAgICAgICAgICAgICAgICBidG4udmFsdWUgPSAnT3JkZXInOyBcbiAgICAgICAgICAgICAgICAgICAgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3BlY1JlcXVlc3Qub25jbGljayA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICBsZXQgYnRuICAgPSBvcmRlclBvcFVwLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1vcmRlcl9fc3VibWl0Jyk7XG4gICAgICAgICAgICAgICAgYnRuLnZhbHVlID0gJ1JlcXVlc3QnOyBcbiAgICAgICAgICAgICAgICBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG5cbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdS5jbGFzc05hbWUgPSAndGhhbmstLWFjdGl2ZSc7XG5cbiAgICAgICAgICAgICAgICByZWxvYWRHaWYodGhhbmtZb3UucXVlcnlTZWxlY3RvcignaW1nJykpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGEoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYW5rWW91LnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGEpO1xuICAgICAgICAgICAgICAgIH0gLCA0MDAwKTtcblxuICAgICAgICAgICAgICAgIGxldCBiID0gc2V0VGltZW91dChmdW5jdGlvbiBiKCkge1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoYik7XG4gICAgICAgICAgICAgICAgfSAsIDUwMDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29udGFpbmVyICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19vdGhlcicpLFxuICAgICAgICAgICAgYWxsUHJvZHVjdHMgICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpWydwcm9kdWN0cyddO1xuICAgICAgICAgICAga2V5cyAgICAgICAgICAgICAgPSBPYmplY3Qua2V5cyhhbGxQcm9kdWN0cyksXG4gICAgICAgICAgICBjdXJyZW50UHJvZHVjdCAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcpLFxuICAgICAgICAgICAgaW5kZXggICAgICAgICAgICAgPSBrZXlzLmluZGV4T2YoY3VycmVudFByb2R1Y3QpLFxuXG4gICAgICAgICAgICBvdGhlciA9IFthbGxQcm9kdWN0c1trZXlzWysraW5kZXgla2V5cy5sZW5ndGhdXSxcbiAgICAgICAgICAgICAgICAgICAgIGFsbFByb2R1Y3RzW2tleXNbKytpbmRleCVrZXlzLmxlbmd0aF1dLCBcbiAgICAgICAgICAgICAgICAgICAgIGFsbFByb2R1Y3RzW2tleXNbKytpbmRleCVrZXlzLmxlbmd0aF1dLCBcbiAgICAgICAgICAgICAgICAgICAgIGFsbFByb2R1Y3RzW2tleXNbKytpbmRleCVrZXlzLmxlbmd0aF1dXTtcblxuXG5cbiAgICAgICAgb3RoZXIuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgbGV0IGRpdiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gXG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtvYmouaW1hZ2VzWzBdfVwiIGFsdD1cIiR7b2JqLnRpdGxlfVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNT4ke29iai5jYXRlZ29yeX0sICR7b2JqLnllYXJ9PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPiR7b2JqLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiQke29iai5wcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWR6eV9fdmlkZW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgXCJcIik7XG4gICAgICAgICAgICBhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcsIG9iai5zZWxmKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG9iai5saW5rO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRTbGlkZXIoKTtcbiAgICAgICAgfSwgMjAwKVxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBzaG93SGlkZUxheW91dChsYXlvdXQsIHBvcFVwKSB7XG5cbiAgICBpZiAobGF5b3V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICBwb3BVcC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGF5b3V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBwb3BVcC5zdHlsZS52aXNpYmlsaXR5ID0gJ2luaXRpYWwnO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBvbihpbWcsIHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9LCA1MDAwKTtcbn1cblxuZnVuY3Rpb24gb2ZmKHRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjICAgICBQUk9KRUNUT1IgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gc2V0TGlzdFNsaWRlcihvYmosIGRhdGUsIHllYXJTbGlkZXIpIHtcbiAgICBcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gb2JqLnNsaWRlciwgXG4gICAgICAgIG5leHRCdG4gICAgID0gb2JqLm5leHRCdG4sXG4gICAgICAgIHByZXZCdG4gICAgID0gb2JqLnByZXZCdG4sXG4gICAgICAgIHBsYXlQYXVzZSAgID0gb2JqLnBsYXlQYXVzZSxcbiAgICAgICAgc2xpZGVzICAgICAgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcbiAgICAgICAgY3VycmVudCAgICAgPSAwLFxuICAgICAgICBwbGF5aW5nICAgICA9IHRydWU7XG5cbiAgICBzbGlkZXNbMF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuXG4gICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgXG4gICAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoICsgMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICAgICAgICAgIGFuaW1hdGVNYWNoaW5lKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJldlNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoIC0gMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICAgICAgICAgIGFuaW1hdGVNYWNoaW5lKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZU1hY2hpbmUoKSB7XG4gICAgICAgIGxldCBub2lzZSAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbm9pc2UnKTtcbiAgICAgICAgICAgIG1hY2hpbmUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lJyk7XG5cbiAgICAgICAgbWFjaGluZS5jbGFzc0xpc3QuYWRkKCdtYWNoaW5lLS1zaGFrZScpO1xuICAgICAgICBub2lzZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub2lzZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBtYWNoaW5lLmNsYXNzTGlzdC5yZW1vdmUoJ21hY2hpbmUtLXNoYWtlJyk7XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgIHJlbG9hZEdpZihtYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19tYWluLWltZycpKTtcbiAgICAgICAgcmVsb2FkR2lmKG1hY2hpbmUucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3doZWVsMycpKTtcblxuICAgICAgICAvLyBtYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJycpXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoYW5nZVByb2R1Y3REYXRlKCkge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBkYXRlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1pbm5lcicpLFxuICAgICAgICAgICAgZGF0ZUxhbXBCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19sYW1wLWRhdGUnKTtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgIGRhdGVBcnIgPSAgZGF0ZS5zcGxpdCgnJyk7XG5cbiAgICAgICAgZGF0ZUJsb2NrLmlubmVySFRNTCA9IGRhdGU7XG5cbiAgICAgICAgbGV0IGRhdGFCbG9ja0JlZm9yZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtaW5uZXItLWJlZm9yZScpLFxuICAgICAgICAgICAgZGF0YUJsb2NrQWZ0ZXIgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1pbm5lci0tYWZ0ZXInKTtcblxuICAgICAgICBkYXRhQmxvY2tCZWZvcmUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGRhdGFCbG9ja0FmdGVyLmlubmVySFRNTCAgPSAnJztcblxuICAgICAgICBkYXRlQXJyLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgYmVmb3JlLCBhZnRlcjtcbiAgICAgICAgICAgIGlmIChlID09IDApIGJlZm9yZSA9IDk7XG4gICAgICAgICAgICBlbHNlIGJlZm9yZSA9ICtlIC0gMTtcblxuICAgICAgICAgICAgaWYgKGUgPT0gOSkgYWZ0ZXIgPSAwXG4gICAgICAgICAgICBlbHNlIGFmdGVyID0gK2UgKyAxO1xuXG4gICAgICAgICAgICBkYXRhQmxvY2tCZWZvcmUuaW5uZXJIVE1MICs9IGJlZm9yZTtcbiAgICAgICAgICAgIGRhdGFCbG9ja0FmdGVyLmlubmVySFRNTCAgKz0gYWZ0ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICBkYXRlTGFtcEJsb2NrLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgXG4gICAgICAgIGRhdGVBcnIuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBsYW1wICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB2YWx1ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICcxMic7XG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSAnLScpIGkgPSAnMTEnO1xuICAgICAgICAgICAgdmFsdWUuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IGBjYWxjKCR7aX0gKiAtNTRweCApYDtcbiAgICAgICAgICAgIHZhbHVlLnN0eWxlLmFuaW1hdGlvbiA9ICdsYW1wRGF0ZSAuNXMgMSc7XG4gICAgICAgICAgICBsYW1wLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2suYXBwZW5kQ2hpbGQobGFtcCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIH0gXG5cbiAgICBuZXh0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKClcbiAgICB9O1xuXG4gICAgcHJldkJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICBwbGF5UGF1c2Uub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocGxheWluZykgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgZWxzZSBwbGF5U2xpZGVTaG93KCk7XG5cbiAgICAgICAgaWYgKHBsYXlQYXVzZS5jbGFzc05hbWUgPT09IFwiZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2VcIikgcGxheVBhdXNlUHJvamVjdG9yKCk7XG4gICAgfTtcblxuICAgIHZhciBzbGlkZUludGVydmFsO1xuXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICB9LCA0MDAwKTtcbiAgICB9LCA1MDAwKTtcblxuICAgIGZ1bmN0aW9uIHBhdXNlU2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVJbnRlcnZhbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBsYXlTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgNDAwMCk7XG4gICAgfTtcblxuXG4gICAgbGV0IFxuICAgICAgICB6b29tICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fem9vbScpLFxuICAgICAgICBwaG90b3NCdG4gID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGhvdG9zLWJ0bicpLFxuICAgICAgICB2aWRlb0J0biAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdmlkZW8tYnRuJyk7XG5cbiAgICBwaG90b3NCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgdmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICAgICAgYW5pbWF0ZVByb2plY3RvcigpO1xuICAgIH1cblxuXG4gICAgem9vbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBpZiAoeWVhclNsaWRlcikge1xuICAgICAgICBmdW5jdGlvbiBzZXROZXh0U2xpZGUoc2lnbikge1xuICAgICAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhciAgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgICAgPSBnZXROZXh0U2xpZGUoc2lnbiwgY3VycmVudFllYXIpO1xuXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IEFycmF5LmZyb20oc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuICAgICAgICAgICAgY3VycmVudCA9IHNsaWRlcy5pbmRleE9mKG5leHRTbGlkZSk7XG5cbiAgICAgICAgICAgIHJlbG9hZEdpZih0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX190dWJlcycpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHdoZWVsID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fd2hlZWwyJyk7XG4gICAgICAgICAgICB3aGVlbC5jbGFzc0xpc3QuYWRkKCdtYWNoaW5lX193aGVlbDItLWFjdGl2ZScpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aGVlbC5jbGFzc0xpc3QucmVtb3ZlKCdtYWNoaW5lX193aGVlbDItLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLXByZXYnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCctJyl9O1xuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLW5leHQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCcrJyl9O1xuICAgICAgICBcbiAgICB9XG59O1xuXG5mdW5jdGlvbiByZWxvYWRHaWYoaW1nKSB7XG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykpO1xufVxuXG5mdW5jdGlvbiBhY3RpdmF0ZUVhc3RlckVnZyhlbGVtLCBzdHJpbmcsIHRpbWVvdXQpIHtcblxuICAgXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7ICBcblxuICAgICAgICBsZXQgaXNHaWZQbGF5cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0dpZlBsYXlzJyk7XG4gICAgICAgIGlmICggaXNHaWZQbGF5cyAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNHaWZQbGF5cycsICd0cnVlJyk7XG4gICAgICAgICAgICBsZXQgZWdnQ291bnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWdncycpO1xuICAgICAgICAgICAgaWYgKGVnZ0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VnZ3MnLCAoK2VnZ0NvdW50ICsgMSkpO1xuICAgICAgICAgICAgICAgIGVnZ0NvdW50Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZ2dzJywgMSk7XG4gICAgICAgICAgICAgICAgZWdnQ291bnQgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlZ2dDb3VudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG5nJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3JjICAgID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICAgICAgICAgICAgICBuZXdTcmMgPSBzcmMucmVwbGFjZSgnLnBuZycsICcuZ2lmJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VfY2xvbmUgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWFnZV9jbG9uZS5zcmMgPSBuZXdTcmM7XG4gICAgICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdTcmMpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjdWJlICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2N1YmUtcm90YXRlcycpLFxuICAgICAgICAgICAgICAgIGN1YmVTcmMgICAgICA9IGN1YmUuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgICAgIGN1YmVTbW9rZSAgICA9IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgICAgIGN1YmVTbW9rZVNyYyA9IGN1YmVTcmMucmVwbGFjZShgY3ViZS0ke2VnZ0NvdW50LTF9YCwgJ2N1YmUtb3BlbicpO1xuICAgICAgICAgICAgY3ViZVNtb2tlLnNyYyA9IGN1YmVTbW9rZVNyYztcbiAgICAgICAgICAgIGN1YmVTbW9rZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNtb2tlU3JjKTtcbiAgICAgICAgICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlJztcbiAgICAgICAgICAgICAgICB9LCArdGltZW91dCAtIDE1MDApXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlLXJvdGF0ZXMnO1xuICAgICAgICAgICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNyYy5yZXBsYWNlKGBjdWJlLSR7ZWdnQ291bnQtMX1gLCBgY3ViZS0ke2VnZ0NvdW50fWApKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzR2lmUGxheXMnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVnZ0NvdW50ID09PSA2KSBhY3RpdmF0ZUJ1dHRlcmZseShjdWJlKTtcbiAgICAgICAgICAgICAgICB9LCArdGltZW91dCArIDE1MDApICAgICBcblxuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgYWN0aXZhdGUpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0cmluZywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXYWl0IHVudGlsIGN1cnJlbnQgZ2lmIGVuZC4gJylcbiAgICAgICAgfVxuICAgIH0pOyBcbn1cblxuXG5mdW5jdGlvbiBhY3RpdmF0ZUJ1dHRlcmZseShjdWJlKSB7XG5cbiAgICAgICAgICAgIGxldCBiYXR0ZXJmbHkgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGJhdHRlcmZseS5zcmMgPSAnL2ltZy9idXR0ZXJmbHkuZ2lmJztcbiAgICAgICAgICAgIGJhdHRlcmZseS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYmF0dGVyZmx5LnNyYyk7XG4gICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc05hbWUgPSAnaGVhZGVyX19idXR0ZXJmbHknO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignaGVhZGVyJykuYXBwZW5kQ2hpbGQoaW1nKTtcblxuICAgICAgICAgICAgICAgICAgICBjdWJlLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2N1YmUnO1xuICAgICAgICAgICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNtb2tlU3JjKTsgICAgIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3ViZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnV0dGVyZmx5LXN0YXRpYycpLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgOTUwMClcbiAgICAgICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbEVnZ3MnLCB0cnVlKTtcblxufVxuLy8gdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeSh7XG5cbi8vICAgICBcInByb2R1Y3RzXCIgOiB7XG4vLyAgICAgICAgIFwicHJvZHVjdC0xXCIgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgICAgOiBcIjIwMDBcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDAvNDAwL1wiLCBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTAwL1wiLCBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzUwL1wiLCBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcInByb2R1Y3QtMVwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICAgIDogXCJ0aXRsZSAxXCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgICA6IFwic21hbGxcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICAgIDogXCIxOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0yXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMFwiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDEvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMjAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzYwLzM1MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0yXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSAyXCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNjk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtM1wiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAyLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTEwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM0MC8zNTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDIwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICd0aXRsZSAzJyxcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI1OTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC00XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDMvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMyMC8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMyMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvMzAxL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC00XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA0XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNDk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtNVwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA0LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMTAvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zNDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDIwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNVwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgNVwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjI5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTZcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTZcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDZcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC03XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC03XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA3XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtOFwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtOFwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgOFwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDhcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTlcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTlcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDlcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSA5XCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0xMFwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMTBcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDEwXCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtMTFcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTExXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSAxMVwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICB9LFxuXG4vLyAgICAgXCJjYXRlZ29yaWVzXCIgOiB7XG4vLyAgICAgICAgIFwiY2F0ZWdvcnkgMVwiIDoge1xuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTFcIixcInByb2R1Y3QtMlwiLFwicHJvZHVjdC0zXCIsXCJwcm9kdWN0LTRcIixcInByb2R1Y3QtNVwiXSxcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5XCJcbi8vICAgICAgICAgfSxcbiAgICAgICAgXG4vLyAgICAgICAgIFwiY2F0ZWdvcnkgMlwiIDoge1xuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTZcIixcInByb2R1Y3QtN1wiLFwicHJvZHVjdC0xMFwiLFwicHJvZHVjdC0xMVwiXSxcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5XCJcbi8vICAgICAgICAgfSxcbiAgICAgICAgXG4vLyAgICAgICAgIFwiY2F0ZWdvcnkgOFwiIDoge1xuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJjYXRlZ29yeSA4XCIsXG4vLyAgICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LThcIl0sXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJjYXRlZ29yeSA5XCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDlcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtOVwiXSxcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5XCJcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0pO1xuXG52YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KCB7XG4gICAgXCJwcm9kdWN0c1wiIDoge1xuICAgICAgICBcInByb2R1Y3QtMVwiIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICAgIDogXCIyMDAwXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgICAgOiBbXCIvaW1nL2ltYWdlLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcInByb2R1Y3QtMVwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICAgIDogXCJQTEFZQk9ZXCIsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgICA6IFwiVGhlbWVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgICA6IFwiMTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtMlwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDFcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTIuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0yXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJQTEFZQk9ZXCIsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjY5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTNcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0zLmpwZ1wiLFwiL2ltZy9pbWFnZS0zLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ1BMQVlCT1kgTFVYRScsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjU5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0IFBMQVlCT1kgTFVYRVwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC00XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtNVwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTMuanBnXCIsXCIvaW1nL2ltYWdlLTMtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTVcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAnUExBWUJPWSBMVVhFJyxcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNDk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3QgUExBWUJPWSBMVVhFXCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcInByb2R1Y3QtNlwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTMuanBnXCIsXCIvaW1nL2ltYWdlLTMtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTZcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAnUExBWUJPWSBMVVhFJyxcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3QgUExBWUJPWSBMVVhFXCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcInByb2R1Y3QtN1wiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTMuanBnXCIsXCIvaW1nL2ltYWdlLTMtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTdcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAnUExBWUJPWSBMVVhFJyxcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMjk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3QgUExBWUJPWSBMVVhFXCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBcImNhdGVnb3JpZXNcIiA6IHtcbiAgICAgICAgXCJUaGVtZVwiIDoge1xuICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJUaGVtZVwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC0xXCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnkgVGhlbWVcIlxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXCJMYW1wZVwiIDoge1xuICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC0yXCIsXCJwcm9kdWN0LTNcIixcInByb2R1Y3QtNFwiLFwicHJvZHVjdC01XCIsXCJwcm9kdWN0LTZcIixcInByb2R1Y3QtN1wiXSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5IExhbXBlXCJcbiAgICAgICAgfSAgICAgXG4gICAgfVxufSk7XG5cblxuZnVuY3Rpb24gZmlsbExvY2FsU3RvcmFnZSgpIHtcblxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdG9kYXkgPSBgYCArIGRhdGUuZ2V0RnVsbFllYXIoKSArIGRhdGUuZ2V0TW9udGgoKSArIGRhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdMT0FERUQnKSA9PT0gdG9kYXkpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UoanNvbiksXG4gICAgICAgIHByb2R1Y3RLZXlzID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTltcInByb2R1Y3RzXCJdKSxcblxuICAgICAgICB5ZWFyTGlua3MgICAgICA9IHt9LFxuICAgICAgICBzaXplTGlua3MgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yeUxpbmtzICA9IHt9LFxuXG4gICAgICAgIHllYXJzICAgICAgICAgID0ge30sXG4gICAgICAgIHNpemVzICAgICAgICAgID0ge30sXG4gICAgICAgIGNhdGVnb3JpZXMgICAgID0ge30sXG4gICAgICAgIHNlbGZMaW5rcyAgICAgID0ge30sXG4gICAgICAgIHRpdGxlcyAgICAgICAgID0ge307XG4gICAgICAgIFxuICAgICAgICBcbiAgICBwcm9kdWN0S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltcInByb2R1Y3RzXCJdW2tdO1xuXG4gICAgICAgIHllYXJzW29iai55ZWFyXSAgICAgICAgICA9IHRydWU7XG4gICAgICAgIGNhdGVnb3JpZXNbb2JqLmNhdGVnb3J5XSA9IHRydWU7XG4gICAgICAgIHNpemVzW29iai5zaXplXSAgICAgICAgICA9IHRydWU7XG4gICAgICAgIHNlbGZMaW5rc1tvYmouc2VsZl0gICAgICA9IHRydWU7XG4gICAgICAgIHRpdGxlc1tvYmoudGl0bGVdICAgICAgICA9IHRydWU7XG5cblxuICAgICAgICBpZiAoeWVhckxpbmtzW29iai55ZWFyXSkgeWVhckxpbmtzW29iai55ZWFyXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSB5ZWFyTGlua3Nbb2JqLnllYXJdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzaXplTGlua3Nbb2JqLnNpemVdKSBzaXplTGlua3Nbb2JqLnNpemVdLnB1c2gob2JqLnNlbGYpO1xuICAgICAgICBlbHNlIHNpemVMaW5rc1tvYmouc2l6ZV0gPSBbb2JqLnNlbGZdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XSkgY2F0ZWdvcnlMaW5rc1tvYmouY2F0ZWdvcnldLnB1c2gob2JqLnNlbGYpO1xuICAgICAgICBlbHNlIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XSA9IFtvYmouc2VsZl07XG5cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmouc2VsZiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgfSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInllYXJMaW5rc1wiLCAgICAgSlNPTi5zdHJpbmdpZnkoeWVhckxpbmtzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaXplTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHNpemVMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2F0ZWdvcnlMaW5rc1wiLCBKU09OLnN0cmluZ2lmeShjYXRlZ29yeUxpbmtzKSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgneWVhcnMnLCAgICAgIE9iamVjdC5rZXlzKHllYXJzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NpemVzJywgICAgICBPYmplY3Qua2V5cyhzaXplcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yaWVzJywgT2JqZWN0LmtleXMoY2F0ZWdvcmllcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aXRsZXMnLCAgICAgT2JqZWN0LmtleXModGl0bGVzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGZMaW5rcycsICBPYmplY3Qua2V5cyhzZWxmTGlua3MpKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxQcm9kdWN0cycsIHByb2R1Y3RLZXlzKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnanNvbicsICAgICAgICBqc29uKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9BREVEJywgICAgICB0b2RheSk7XG59XG5cblxuXG5maWxsTG9jYWxTdG9yYWdlKCk7XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RzKCkge1xuXG4gICAgdmFyIFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSlbJ3Byb2R1Y3RzJ10sXG4gICAgICAgIGtleXMgICAgICAgID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTik7XG5cbiAgICBrZXlzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGxldCBvYmogPSBwYXJzZWRKU09OW2tdO1xuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGl0ZW0gICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICAgICAgICAgIGEgICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmouaW1hZ2VzWzBdKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG5cbiAgICAgICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XG4gICAgICAgIGEub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcsIG9iai5zZWxmKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG9iai5saW5rO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGEpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBvYmouc2VsZik7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCBvYmoueWVhcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgXG4gICAgfSk7IFxuICAgIFxufVxuZnVuY3Rpb24gZ2V0TmV4dFNsaWRlKHNpZ24sIHllYXIpIHtcbiAgICB2YXIgXG4gICAgICAgIHNlcXVlbnQgPSAnJyxcbiAgICAgICAgeWVhcnMgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGN1cnJlbnQgPSAreWVhcnMuaW5kZXhPZih5ZWFyKTtcblxuICAgIGlmICAgICAgKHNpZ24gPT0gJy0nKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCAtIDEpICUgeWVhcnMubGVuZ3RoO1xuICAgIGVsc2UgaWYgKHNpZ24gPT0gJysnKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCArIDEpICUgeWVhcnMubGVuZ3RoO1xuXG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduIGlzIG5vdCBjb3JyZWN0LiBzaWduIGNhbiBiZSBcIitcIiBvciBcIi1cIicpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZSBbZGF0YS15ZWFyPVwiJyArIHllYXJzW3NlcXVlbnRdICsnXCJdJyk7XG59XG5cblxuXG5mdW5jdGlvbiBzaG93SGlkZVByb2plY3RvcigpIHtcbiAgICBsZXQgXG4gICAgICAgIG1hY2hpbmUgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpLFxuICAgICAgICBwcm9qZWN0b3IgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yJyksXG4gICAgICAgIGJhY2sgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fYmFjaycpO1xuXG4gICAgcHJvamVjdG9yLnN0eWxlLmJvdHRvbSA9ICcwJztcblxuICAgIGJhY2sub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgIFxuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicpOyAgIFxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0SW1hZ2VzKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICBpbWFnZXMgICAgICA9IHByb2R1Y3QuaW1hZ2VzO1xuICAgICAgICBcbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZ2FsbGVyeS1wcm9qZWN0b3JfX2xheWVyXCI+PC9zcGFuPic7XG4gICAgaW1hZ2VzLmZvckVhY2goaSA9PiB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxpID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0VmlkZW8oKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIHZpZGVvU3JjICAgID0gcHJvZHVjdC52aWRlbyxcbiAgICAgICAgcHJvamVjdG9yICAgPSBzbGlkZXIucGFyZW50Tm9kZTtcblxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJnYWxsZXJ5LXByb2plY3Rvcl9fbGF5ZXJcIj48L3NwYW4+JztcbiAgICBsZXQgXG4gICAgICAgIGxpICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgIHZpZGVvICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgXG4gICAgdmlkZW8ubG9hZCgpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9idWZmZXInLCAnJyk7XG4gICAgdmlkZW8uaW5uZXJIVE1MID0gXG4gICAgYFxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgPHNvdXJjZSBzcmM9XCIke3ZpZGVvU3JjfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgPHNvdXJjZSBzcmM9XCIke3ZpZGVvU3JjfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgYDtcblxuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xuXG4gICAgbGV0IFxuICAgICAgICBwbGF5UGF1c2UgICA9IHByb2plY3Rvci5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKSxcbiAgICAgICAgbmV4dCAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19uZXh0JyksXG4gICAgICAgIHByZXYgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpO1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCA9PSBmYWxzZSkgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgZWxzZSB2aWRlby5wbGF5KCk7XG4gICAgfVxuXG4gICAgbmV4dC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gIHZpZGVvLmN1cnJlbnRUaW1lICsgdmlkZW8uZHVyYXRpb24gLyAxMDtcbiAgICB9XG5cbiAgICBwcmV2Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAgdmlkZW8uY3VycmVudFRpbWUgLSB2aWRlby5kdXJhdGlvbiAvIDEwO1xuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCkge1xuXG4gICAgbGV0IHByb2plY3RvclNsaWRlck9iaiAgPSB7XG4gICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLCBcbiAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbmV4dCcpLFxuICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcmV2JyksXG4gICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKVxuICAgIH1cblxuICAgIGFuaW1hdGVQcm9qZWN0b3IoKTtcblxuICAgIHNldExpc3RTbGlkZXIocHJvamVjdG9yU2xpZGVyT2JqKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVQcm9qZWN0b3IoICkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpLFxuICAgICAgICBhbmltYXRpb24gPSAnYW5pbWF0aW9uOiBwcm9qZWN0b3JTdGFydCAuNnMgIHN0ZXBzKDEsIGVuZCkgaW5maW5pdGU7JyxcbiAgICAgICAgbGF5ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbGF5ZXInKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmU7JylcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsIGFuaW1hdGlvbik7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBsYXlQcm9qZWN0b3IoKTtcbiAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktcHJvamVjdG9yX19sYXllci0tYWN0aXZlJyk7XG4gICAgICAgIH0sIDYwMClcbiAgICB9LDUwMClcblxufSAgIFxuXG5mdW5jdGlvbiBwbGF5UGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyksXG4gICAgICAgIGNvbmRpdGlvbiA9IHByb2plY3Rvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7XG5cbiAgICBpZiAoY29uZGl0aW9uID09PSAncGxheScpIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgZWxzZSBwbGF5UHJvamVjdG9yKCk7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHBsYXlQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYW5pbWF0aW9uOiBwcm9qZWN0b3JNYWluIC41cyAgc3RlcHMoMSwgZW5kKSBpbmZpbml0ZTsnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwbGF5Jyk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlUHJvamVjdG9yKCkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpOyAgXG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nLCAncGF1c2UnKTtcbn1cblxuZnVuY3Rpb24gbXlNYXAoKSB7XG4gICAgdmFyIGEgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3pvb20nKTtcbiAgICB2YXIgbWFwUHJvcD0ge1xuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDYuNDYxMjc1LDYuODQ1MzYyKSxcbiAgICAgICAgbWFwVHlwZUlkICAgICAgICAgICA6ICdzYXRlbGxpdGUnLFxuICAgICAgICB6b29tICAgICAgICAgICAgICAgIDogYSB8fCAxNSxcbiAgICAgICAgcGFuQ29udHJvbCAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICB6b29tQ29udHJvbCAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sICAgICAgOiBmYWxzZSxcbiAgICAgICAgc2NhbGVDb250cm9sICAgICAgICA6IGZhbHNlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbCAgIDogZmFsc2UsXG4gICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbCAgOiBmYWxzZSxcbiAgICAgICAgcm90YXRlQ29udHJvbCAgICAgICA6IGZhbHNlXG4gICAgfTtcblxuXG4gICAgbGV0IG1pbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1taW51cycpO1xuICAgIGxldCBwbHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1wbHVzJyk7XG5cbiAgICBwbHVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tICsgMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG5cbiAgICBtaW51cy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBhICA9IG1hcFByb3Auem9vbSAtIDE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd6b29tJywgYSk7XG4gICAgICAgIG15TWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFjdHNfX21hcFwiKSxtYXBQcm9wKTtcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7cG9zaXRpb246bWFwUHJvcC5jZW50ZXJ9KTtcbiAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG59XG5cbmZ1bmN0aW9uIHNjb3JlUHJlc3NlZCgpIHtcbiAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICBpZiAocHJlc3NlZEFuaW1hdGlvbkNvdW50KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmVzc2VkJywgKytwcmVzc2VkQW5pbWF0aW9uQ291bnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCAxKTtcbiAgICB9XG59XG5cblxuXG5cbmlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSkgZmlsdGVyR2VsbGVyeSgpXG5cbmZ1bmN0aW9uIGZpbHRlckdlbGxlcnkoKSB7XG4gICAgbGV0IGZpbHRlciAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSxcbiAgICAgICAgc3VibWl0ICAgICA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXN1Ym1pdF0nKSxcbiAgICAgICAgY2F0ZWdvcmllcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5TGlua3MnKSksXG4gICAgICAgIHllYXJzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFyTGlua3MnKSksXG4gICAgICAgIHNpemVzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplTGlua3MnKSksXG4gICAgICAgIHJlc3VsdDtcblxuXG4gICAgICAgIGxldCBzZWxlY3RzID0gQXJyYXkuZnJvbShmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpO1xuXG4gICAgc2VsZWN0cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICBcblxuICAgICAgICBzLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgZmlsdGVycyAgICAgPSBnZXRGaWx0ZXJzKGZpbHRlciksXG4gICAgICAgICAgICAgICAgeWVhckFyciAgICAgPSBmaW5kSW5PYmooZmlsdGVycy55ZWFyLCB5ZWFycyksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlBcnIgPSBmaW5kSW5PYmooZmlsdGVycy5jYXRlZ29yeSwgY2F0ZWdvcmllcyksXG4gICAgICAgICAgICAgICAgc2l6ZXNBcnIgICAgPSBmaW5kSW5PYmooZmlsdGVycy5zaXplLCBzaXplcyk7XG5cbiAgICAgICAgICAgIGxldCBwcm9kdWN0czsgXG5cbiAgICAgICAgICAgIGlmICggeWVhckFyciA9PT0gJ2FsbCcgJiYgY2F0ZWdvcnlBcnIgPT09ICdhbGwnICYmIHNpemVzQXJyID09PSAnYWxsJyApIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGZpbHRlclByb2R1Y3RzKHNpemVzQXJyLCB5ZWFyQXJyLCBjYXRlZ29yeUFycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50Q2F0ZWdvcnknLCBmaWx0ZXJzLmNhdGVnb3J5KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50WWVhcicsIGZpbHRlcnMueWVhcik7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFNpemUnLCBmaWx0ZXJzLnNpemUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIHByb2R1Y3RzKTtcblxuICAgICAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHN1Ym1pdC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGlucHV0SW5uZXIgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLnZhbHVlO1xuICAgICAgICBsZXQgcHJvZHVjdHMgPSBbXTtcblxuICAgICAgICBsZXQgdGl0bGVzICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RpdGxlcycpLnNwbGl0KCcsJyksXG4gICAgICAgICAgICBzZWxmTGlua3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZkxpbmtzJykuc3BsaXQoJywnKTtcblxuICAgICAgICB0aXRsZXMuZm9yRWFjaCggKHQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0LmluZGV4T2YoaW5wdXRJbm5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKHNlbGZMaW5rc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcblxuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnLCBwcm9kdWN0cyk7XG4gICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlclByb2R1Y3RzKCkge1xuXG4gICAgICAgIHZhciBwcmV2TGlzdCA9IHJlc3VsdCA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKGFyZ3VtZW50cykuZm9yRWFjaCggKGN1cnJlbnQsIGkpICA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgaWYgKHByZXZMaXN0Lmxlbmd0aCA+IDAgJiYgY3VycmVudCAhPT0gJ2FsbCcgJiYgcHJldkxpc3QgIT09ICdhbGwnKSB7XG5cbiAgICAgICAgICAgICAgICBwcmV2TGlzdC5mb3JFYWNoKCBqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaW5kZXhPZihqKSAhPSAtMSkgcmVzdWx0LnB1c2goaik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBwcmV2TGlzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDAgfHwgcHJldkxpc3QgPT09ICdhbGwnKSBwcmV2TGlzdCA9IGN1cnJlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHByZXZMaXN0O1xuICAgIH1cbiAgICAgICAgICAgIFxufVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJzKGZpbHRlcikgIHtcbiAgICBsZXQgb2JqID0gIHtcbiAgICAgICAgeWVhciAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJykudmFsdWUsXG4gICAgICAgIGNhdGVnb3J5IDogZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY2F0ZWdvcnknKS52YWx1ZSxcbiAgICAgICAgc2l6ZSAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zaXplJykudmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZmluZEluT2JqKHZhbHVlLCBvYmopIHtcbiAgICBpZiAodmFsdWUgPT0gJ2FsbCcpICByZXR1cm4gJ2FsbCdcbiAgICBlbHNlIGlmIChvYmpbdmFsdWVdKSByZXR1cm4gb2JqW3ZhbHVlXTtcbiAgICBlbHNlICAgICAgICAgICAgICAgICByZXR1cm4gW107XG59ICAgIFxuXG5mdW5jdGlvbiBidWlsZFNsaWRlcigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWR6eScpO1xuICAgIGxldCBlbGVtZW50cyAgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5jaGlsZHJlbik7XG5cbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgbmV3IEdyaWR6eShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBlLmNsYXNzTmFtZSA9ICdncmlkenlJdGVtQ29udGVudCBncmlkenlJdGVtIGdyaWR6eUl0ZW0tLWFub3RoZXInXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZWxlbWVudHMuZm9yRWFjaChiID0+IHtcbiAgICAgICAgbGV0IHZpZGVvID0gYi5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICBiLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7dmlkZW8ucGxheSgpO31cbiAgICAgICAgYi5vbm1vdXNlb3V0ICA9IGZ1bmN0aW9uKCkge3ZpZGVvLnBhdXNlKCk7fVxuICAgIH0pXG5cblxuICAgIGxldCBnYWxsZXJ5TGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWR6eUl0ZW1Db250ZW50JykpO1xuICAgIGdhbGxlcnlMaXN0LmZvckVhY2goYiA9PiB7XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgdGl0bGUgICAgICAgICA9IGIucXVlcnlTZWxlY3RvcignaDMnKSxcbiAgICAgICAgICAgIGJsb2NrVyAgICAgICAgPSBiLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgYmxvY2tIICAgICAgICA9IGIuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgdGV4dENvbnRhaW5lciA9IGIucXVlcnlTZWxlY3RvcignZGl2Jyk7XG5cbiAgICAgICAgaWYgKGJsb2NrSCA+IGJsb2NrVykge1xuICAgICAgICAgICAgdGV4dENvbnRhaW5lci5zdHlsZS5hbGlnbkl0ZW1zICA9ICdmbGV4LXN0YXJ0JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gKGJsb2NrVyAqIDAuMTIpICsgJ3B4JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmxpbmVIZWlnaHQgPSAoYmxvY2tXICogLjE0KSArICdweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IChibG9ja1cgKiAwLjA4KSArICdweCc7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5saW5lSGVpZ2h0ID0gKGJsb2NrVyAqIC4xMSkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZEdhbGxlcnkoKSB7XG4gICAgbGV0IFxuICAgICAgICBjb250YWluZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKSxcbiAgICAgICAgcHJldkVsZW0gID0gY29udGFpbmVyLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgY2xvbmUgICAgID0gY29udGFpbmVyLmNsb25lTm9kZShmYWxzZSksXG4gICAgICAgIG5vdEZvdW5kICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX25vdC1mb3VuZCcpLFxuICAgICAgICBqc29uICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpLFxuICAgICAgICBwcm9kdWN0cztcblxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKSkge1xuICAgICAgICBwcm9kdWN0cyAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0Jykuc3BsaXQoJywnKTtcbiAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKSA9PSAnJykge1xuICAgICAgICBwcm9kdWN0cyA9IFtdO1xuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJykpIHtcbiAgICAgICAgcHJvZHVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvZHVjdHMnKS5zcGxpdCgnLCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3RzID0gW107XG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIGlmIChwcm9kdWN0cy5sZW5ndGggPiAwICYmIHByb2R1Y3RzWzBdICE9PSAnJykge1xuICAgIFxuICAgICAgICBub3RGb3VuZC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbnNlcnRCZWZvcmUoY2xvbmUsIHByZXZFbGVtKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICBjb250YWluZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKTtcblxuICAgICAgICBwcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgbGV0IG9iaiA9IGpzb25bXCJwcm9kdWN0c1wiXVtwcm9kdWN0XTtcbiAgICAgICAgICAgIGxldCBkaXYgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IFxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7b2JqLmltYWdlc1swXX1cIiBhbHQ9XCIke29iai50aXRsZX1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDU+JHtvYmouY2F0ZWdvcnl9LCAke29iai55ZWFyfTwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDxoMz4ke29iai50aXRsZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4kJHtvYmoucHJpY2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkenlfX3ZpZGVvLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX192aWRlb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIFwiXCIpO1xuICAgICAgICAgICAgYS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2R1Y3QnLCBvYmouc2VsZilcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBvYmoubGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG5vdEZvdW5kLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1aWxkU2xpZGVyKCk7XG4gICAgfSwgMjAwKTtcbn0gICBcblxuZnVuY3Rpb24gYnVpbGRGaWx0ZXJGb3JtKCkge1xuICAgIGxldCBjb250YWluZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXItbGlzdCcpO1xuXG4gICAgbGV0IFxuICAgICAgICBvcHRpb24gICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIHllYXJzICAgICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJzJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2F0ZWdvcmllcyAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2F0ZWdvcmllcycpLnNwbGl0KCcsJyksXG4gICAgICAgIHNpemVzICAgICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NpemVzJykuc3BsaXQoJywnKSxcblxuICAgIGZpbHRlckNhdGVnb3J5ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY2F0ZWdvcnknKSxcbiAgICBmaWx0ZXJZZWFyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXIteWVhcicpLFxuICAgIGZpbHRlclNpemUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zaXplJyk7XG5cbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlckNhdGVnb3J5LCBjYXRlZ29yaWVzLCAnY3VycmVudENhdGVnb3J5Jyk7XG4gICAgY3JlYXRlT3B0aW9ucyhmaWx0ZXJZZWFyLCB5ZWFycywgJ2N1cnJlbnRZZWFyJyk7XG4gICAgY3JlYXRlT3B0aW9ucyhmaWx0ZXJTaXplLCBzaXplcywgJ2N1cnJlbnRTaXplJyk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVPcHRpb25zKHNlbGVjdCwgYXJyYXksIGxvY2FsQ3VycmVudCkge1xuICAgICAgICBhcnJheS5mb3JFYWNoKCBqID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGopO1xuICAgICAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBqO1xuICAgICAgICAgICAgY3VycmVudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2xvY2FsQ3VycmVudH1gKTtcbiAgICAgICAgICAgIGlmIChqID09IGN1cnJlbnQpIGl0ZW0uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKVxuICAgICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICB9KVxuICAgIH0gXG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICB9LCAyMDApO1xufVxuLy8gYnVpbGRGaWx0ZXJGb3JtKCk7XG5cblxuZnVuY3Rpb24gYnVpbGRDYXRlZ29yaWVzKCkge1xuICAgIGxldCBjb250YWluZXIgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJyksXG4gICAgICAgIGpzb24gICAgICAgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIGNhdGVnb3JpZXMgICAgICA9IGpzb25bJ2NhdGVnb3JpZXMnXTtcbiAgICAgICAgY2F0ZWdvcmllc0tleXMgID0gT2JqZWN0LmtleXMoY2F0ZWdvcmllcyk7XG5cbiAgICBjYXRlZ29yaWVzS2V5cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBsZXQgY3VycmVudCA9IGNhdGVnb3JpZXNbY107XG4gICAgICAgICAgICBvYmogICAgID0ganNvblsncHJvZHVjdHMnXVtjdXJyZW50Wydwcm9kdWN0cyddWzBdXTtcblxuICAgICAgICBsZXQgY2F0ZWdvcnkgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYXRlZ29yeS5jbGFzc05hbWUgPSAnY2F0ZWdvcnktaXRlbSc7XG4gICAgICAgIGNhdGVnb3J5LmlubmVySFRNTCA9IFxuICAgICAgICBgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdGV4dC1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX2hlYWRlclwiPiR7b2JqLmNhdGVnb3J5fTwvaDM+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fc3ViaGVhZGVyXCI+JHtjdXJyZW50W1wiZGVzY3JpcHRpb25cIl19PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG5cbiAgICAgICAgbGV0IGxpbmsgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XG4gICAgICAgIGxpbmsub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50Q2F0ZWdvcnknLCBjdXJyZW50WydzZWxmJ10pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIGpzb25bJ2NhdGVnb3JpZXMnXVtjXVsncHJvZHVjdHMnXSlcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZ2FsbGVyeS5odG1sJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtvYmouaW1hZ2VzWzBdfSk7YCk7XG5cbiAgICAgICAgY2F0ZWdvcnkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgIGNhdGVnb3J5LmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2F0ZWdvcnkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2R1Y3RDYXJkKCkge1xuICAgIGxldCBjb250YWluZXIgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgIGpzb24gICAgICAgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIGN1cnJlbnRQcm9kdWN0ICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcpLFxuICAgICAgICBvYmogICAgICAgICAgICAgPSBqc29uWydwcm9kdWN0cyddW2N1cnJlbnRQcm9kdWN0XSxcbiAgICAgICAgcHJvZHVjdCAgICAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICBcblxuICAgIGxldCBpbWFnZXMgPSBvYmpbJ2ltYWdlcyddLFxuICAgICAgICBsaXN0ICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICBpbWFnZXMuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICBsZXQgbGkgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG5cbiAgICBsZXQgcGFyYW1ldGVyTGlzdCA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIHBhcmFtZXRlcnMgICAgPSBvYmoucGFyYW1ldGVycztcbiAgICBcbiAgICBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5pbm5lckhUTUwgPSBgPHNwYW4+JHtwfTo8L3NwYW4+ICR7cGFyYW1ldGVyc1twXX08L2xpPmA7XG4gICAgICAgIHBhcmFtZXRlckxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmlubmVySFRNTCAgPSAgXG4gICAgICAgIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2ZhY2VcIj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICR7bGlzdC5pbm5lckhUTUwgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjb250cm9scz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19pbmZvLWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9kdWN0X195ZWFyXCI+JHtvYmoueWVhcn08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZHVjdF9fbmFtZVwiIHRpdGxlPVwiJHtvYmoudGl0bGV8fCAnJ31cIj48c3Bhbj4ke29iai50aXRsZXx8ICcnfTwvc3Bhbj48L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZHVjdF9fZGVzY3JpcHRpb25cIj4ke29iai5kZXNjcmlwdGlvbiB8fCAnJ308L3A+XG5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwcm9kdWN0X19wYXJhbWV0ZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICR7cGFyYW1ldGVyTGlzdC5pbm5lckhUTUwgfHwgJyd9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fYnV5LWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19wcmljZVwiPiR7b2JqLnByaWNlIHx8ICcnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicHJvZHVjdF9fYnRuXCIgdmFsdWU9XCJidXlcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8dWwgY2xhc3M9XCJwcm9kdWN0X19zbGlkZXNcIj5cbiAgICAgICAgICAgICR7bGlzdC5pbm5lckhUTUwgfHwgJyd9XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdmlkZW9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICBgO1xuXG4gICAgXG59XG4ndXNlIHN0cmljdCc7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuLy8gICAgIGxldCB0b3RhbFcgPSAwO1xuLy8gICAgIGxldCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnknKTtcbi8vICAgICBpZiAoZ2FsbGVyeSkge1xuXG5cbi8vICAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnk+ZGl2Jyk7XG4vLyAgICAgICAgIGxldCBpbWFnZXMgPSBBcnJheS5mcm9tKGdhbGxlcnkucXVlcnlTZWxlY3RvckFsbCgnaW1nJykpO1xuXG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIGxldCBpbWcgPSBpLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuLy8gICAgICAgICAgICAgbGV0IGggPSBnZXRDb21wdXRlZFN0eWxlKGltZykuaGVpZ2h0O1xuLy8gICAgICAgICAgICAgbGV0IHcgPSBnZXRDb21wdXRlZFN0eWxlKGltZykud2lkdGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLmhlaWdodCA9IGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLndpZHRoID0gdztcbi8vICAgICAgICAgICAgIHRvdGFsVyArPSBwYXJzZUludCh3KTtcbi8vICAgICAgICAgICAgIC8vINC30LDQtNCw0Y4g0L/QsNGA0LDQvNC10YLRgNGLINCx0LvQvtC60LAsINC60L7RgtC+0YDRi9C5INCx0YPQtNGD0YIg0LjQtNC10L3RgtC40YfQvdGLINC/0LDRgNCw0LzQtdGC0YDQsNC8INC60LDRgNGC0LjQvdC60Lhcbi8vICAgICAgICAgICAgIC8vICsg0L7Qv9GA0LXQtNC10LvRj9GOINGB0YPQvNC80LDRgNC90YPRjiDRiNC40YDQuNC90YMg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QuiDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC+0LvQuNGH0LXRgdGC0LLQsCDRgdGC0YDQvtC6XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIGxldCByb3dzID0gTWF0aC5yb3VuZCh0b3RhbFcgLyB3aW5kb3dXKTtcbi8vICAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YHRgtGA0L7QulxuLy8gICAgICAgICBsZXQgZGlmZiA9IDAuOTtcbi8vICAgICAgICAgLy8g0LLQvtC30LzQvtC20L3QsNGPINGA0LDQt9C90LjRhtCwINC/0LDRgNCw0LzQtdGC0YDQvtCyINCx0LvQvtC60LBcblxuXG4vLyAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7IFxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhBcnJheS5pc0FycmF5KGltYWdlcykpO1xuLy8gICAgICAgICBjcmVhdGVSb3coaW1hZ2VzLCB3aW5kb3dXLCByb3dzLCBkaWZmKTtcblxuLy8gICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgZnVuY3Rpb24gY3JlYXRlUm93KGFyciwgcm93V2lkdGgsIHJvd3MsIGRpZmYpIHtcbi8vICAgICAgICAgICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG5cbi8vICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAmJiBhcnIubGVuZ3RoID4gMDsgaSsrKSB7XG5cbi8vICAgICAgICAgICAgICAgICBmb3IgKGxldCB3ID0gMCwgeiA9IDA7XG4vLyAgICAgICAgICAgICAgICAgICAgIChkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA+IHcgLyBkaWZmKTspIHtcblxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoeiA+IDEwMCkgYnJlYWs7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1XID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbMF0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyWzBdLmNsYXNzTGlzdC5hZGQoaSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xuLy8gICAgICAgICAgICAgICAgICAgICB3ICs9IGl0ZW1XO1xuLy8gICAgICAgICAgICAgICAgICAgICB6Kys7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZmYgKiB3KTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codyAvIGRpZmYpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xuLy8gICAgICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbel0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAvLyB5ICs9IDE7XG4vLyAgICAgICAgICAgICAgICAgLy8geisrO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA8IGRpZmYgLyB3XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGkpLmhlaWdodCk7IFxuLy8gICAgICAgICAgICAgLy8gbGV0IG5ld1cgPSB3IC0gdyAqIGRpZmY7XG4vLyAgICAgICAgICAgICAvLyBpLnN0eWxlLmhlaWdodCA9IG5ld1cgKyAncHgnO1xuLy8gICAgICAgICB9KVxuLy8gICAgIH1cbi8vICAgICAvLyBjb2x1bW5zLmZvckVhY2goKGMsIGkpID0+IHtcblxuLy8gICAgIC8vIH0pO1xuLy8gfSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
