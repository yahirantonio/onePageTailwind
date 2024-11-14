import '../css/style.css'
import '@fontsource/roboto';
import "@fontsource/pt-serif";
import "@fontsource/pt-serif/700.css";
import anime from 'animejs';

const headers = document.querySelectorAll('.open_js');

headers.forEach(header => {
   header.addEventListener('click', (e) => {
      let html = e.target.closest(".accordion");
      let content = html.querySelector(".close_js");
      let icon = html.querySelector(".rotate_js")
      if (content.style.height && content.style.height !== "0px") {
         // Si está abierto, ciérralo
         anime({
            targets: content,
            height: 0,
            opacity: 0,
            bottom:250,
            easing: 'easeInOutQuad',
            duration: 250,
            complete: () => {
               content.style.marginTop = '0px';
               content.style.visibility = 'hidden';
            } // Restaura el estilo
         });

         anime({
            targets: icon,
            rotate: '0deg',
            easing: 'easeInOutQuad',
            duration: 250,
         });
      } else {
         // Si está cerrado, ábrelo
         content.style.visibility = 'visible';
         const contentHeight = content.scrollHeight;
         console.log(contentHeight)
         anime({
            targets: content,
            height: contentHeight,
            opacity: 1,
            easing: 'easeInOutQuad',
            duration: 250,
            begin:()=>{
               content.style.visibility = 'visible';
            },
            complete: () => {
               content.style.height = contentHeight + 'px';
            }
         });

         anime({
            targets: icon,
            rotate: '180deg',
            easing: 'easeInOutQuad',
            duration: 250,
         });
      }
   });
});

let arrow = document.querySelector('.expand_js');
let isRotated = false;

arrow.addEventListener('click', (e) => {

   anime.remove(arrow);

   anime({
      targets: arrow,
      easing: 'easeInOutQuad',
      rotate: isRotated ? 0 : 180,
      duration: 500
   })

   const aboutus = document.querySelectorAll('.aboutUs');
   const mission = document.querySelectorAll('.mission');

   if(isRotated){

      mission.forEach(element =>{
         anime({
            targets: element,
            opacity: 0,
            easing: 'linear',
            duration: 900,
         })
      })

      aboutus.forEach(element => {
         anime({
            targets: element,
            opacity: 1,
            easing: 'linear',
            duration: 900,
            begin: () =>{
               let image_bacground = document.querySelector('.background_image_aboutUs');
               image_bacground.style.background = '#9CA3AF'
            }
         })
         
      })

   }else{

      aboutus.forEach(element => {
         anime({
            targets: element,
            opacity: 0,
            easing: 'linear',
            duration: 1000,
            begin: () =>{
               let image_bacground = document.querySelector('.background_image_aboutUs');
               image_bacground.style.background = 'white'
            }
         })
         
      })

      mission.forEach(element =>{
         anime({
            targets: element,
            opacity: 1,
            easing: 'linear',
            duration: 1000,
         })
      })
   }

   isRotated = !isRotated;
})

window.addEventListener("scroll", function () {
   const navbar = document.getElementById("navbar");
   const targetSection = document.getElementById("aboutUs-mission");
   
   const targetPosition = targetSection.offsetTop;
   
   if (window.scrollY >= targetPosition) {
      navbar.classList.add("active");
    } else {
      navbar.classList.remove("active");
    }
 });
