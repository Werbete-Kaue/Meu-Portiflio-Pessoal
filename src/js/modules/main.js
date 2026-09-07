document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
});

export function initTypewriter(){

    const textElement = document.getElementById('typewriter');
    const phrases = ['Kauê.']
    let phrasesIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type(){
        const currentPhrase = phrases[phrasesIndex];

        if(isDeleting){
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        }else{
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        }else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phrasesIndex = (phrasesIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type()
}

/* FUNCIONALIDA MODAL */

const projects = document.querySelectorAll('.education-project');

const modal = document.getElementById('projectModal');
const modalVideo = document.getElementById('projectModalVideo');
const modalTitle = document.getElementById('projectModalTitle');
const modalClose = document.getElementById('projectModalClose');

projects.forEach((project) => {

    project.addEventListener('click', () => {

        const video = project.querySelector('video');
        const title = project.querySelector('p');

        if (!video) return;

        modalVideo.src = video.src;
        modalTitle.textContent = title.textContent;

        modal.classList.add('active');

        modalVideo.currentTime = 0;
        modalVideo.play();
    });

});


function closeProjectModal() {

    modal.classList.remove('active');

    modalVideo.pause();
    modalVideo.currentTime = 0;

    setTimeout(() => {
        modalVideo.src = '';
    }, 300);
}


modalClose.addEventListener('click', closeProjectModal);


modal.addEventListener('click', (event) => {

    if (event.target === modal) {
        closeProjectModal();
    }

});


document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
        closeProjectModal();
    }

});