document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const messageBox = document.getElementById('formMessage');
  const modal = document.getElementById('contactModal');
  const openModalButton = document.getElementById('openContactModal');
  const closeModalButton = document.getElementById('closeContactModal');

  if (!form || !messageBox || !modal) {
    return;
  }

  const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    messageBox.textContent = '';
    messageBox.className = 'form-message';
    form.reset();
  };

  if (openModalButton) {
    openModalButton.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  }

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    messageBox.textContent = 'שולח את הפנייה...';
    messageBox.className = 'form-message';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'אירעה שגיאה');
      }

      messageBox.textContent = 'הפרטים שלכם נשלחו ואנחנו ניצור איתכם קשר בהקדם';
      messageBox.classList.add('success');
      form.reset();
    } catch (error) {
      messageBox.textContent = error.message || 'אירעה שגיאה בלתי צפויה';
      messageBox.classList.add('error');
    }
  });
});
