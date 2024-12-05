<script>
    document.addEventListener('DOMContentLoaded', () => {
        const headers = document.querySelectorAll('.accordion-header');

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');

                // Close all accordions
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

                // Toggle active class for clicked item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    });
</script>
