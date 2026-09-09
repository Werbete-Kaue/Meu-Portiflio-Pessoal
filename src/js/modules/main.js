document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
});

export function initTypewriter(){

    const textElement = document.getElementById('typewriter');
    const phrases = ['Werbete Kauê.']
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

/* FUNCIONALIDADE MODAL */

const projects = document.querySelectorAll('.education-project');

const modal = document.getElementById('projectModal');
const modalVideo = document.getElementById('projectModalVideo');
const modalTitle = document.getElementById('projectModalTitle');
const modalDescription = document.getElementById('projectModalDescription');
const modalTechnologies = document.getElementById('projectModalTechnologies');
const modalClose = document.getElementById('projectModalClose');


projects.forEach((project) => {

    project.addEventListener('click', () => {

        const video = project.querySelector('video');
        const title = project.querySelector('p');

        const description = project.dataset.description;
        const technologies = project.dataset.technologies;

        if (!video || !title) return;


        /* VÍDEO */
        modalVideo.src = video.src;


        /* TÍTULO */
        modalTitle.textContent = title.textContent;


        /* DESCRIÇÃO */
        modalDescription.textContent =
            description || 'Descrição do projeto em breve.';


        /* TECNOLOGIAS */
        modalTechnologies.innerHTML = '';

        if (technologies) {

            const technologiesList = technologies.split(',');

            technologiesList.forEach((technology) => {

                const technologyTag = document.createElement('span');

                technologyTag.textContent = technology.trim();

                modalTechnologies.appendChild(technologyTag);

            });

        }


        /* ABRE O MODAL */
        modal.classList.add('active');

        document.body.style.overflow = 'hidden';


        /* REINICIA O VÍDEO */
        modalVideo.currentTime = 0;

        modalVideo.play().catch(() => {
            // Alguns navegadores podem bloquear reprodução automática.
        });

    });

});


function closeProjectModal() {

    modal.classList.remove('active');

    document.body.style.overflow = '';

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

    if (
        event.key === 'Escape' &&
        modal.classList.contains('active')
    ) {

        closeProjectModal();

    }

});