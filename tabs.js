const buttons = document.querySelectorAll('.lofts__bullets button');
const lofts = document.querySelectorAll('.lofts__content ul');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        lofts.forEach(loft => {
            loft.style.display = 'none'
            if(event.target.id == loft.id){
                loft.style.display = 'grid'
            }
        })
    })
});