document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach((item) => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordions
            accordionItems.forEach((i) => i.classList.remove('active'));
            
            // If not active, open the clicked accordion
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
