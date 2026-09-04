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