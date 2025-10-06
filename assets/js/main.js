const yearEl = document.getElementById("year");
const clickCountEl = document.getElementById("click-count");
const waitlistButtons = document.querySelectorAll('[data-track]');
const heroCta = document.getElementById("hero-cta");
const demoButton = document.getElementById("demo-button");
const modal = document.getElementById("demo-modal");
const modalClose = document.getElementById("modal-close");
const form = document.getElementById("waitlist-form");
const formFeedback = document.getElementById("form-feedback");

const clickMetrics = {
  total: 0,
  updateDisplay() {
    if (!clickCountEl) return;
    const noun = this.total === 1 ? "person" : "people";
    clickCountEl.textContent = this.total
      ? `${this.total} ${noun} just joined the waitlist. Don’t miss out!`
      : "Be among the first to experience Musiqly.";
  },
  increment(source) {
    this.total += 1;
    this.updateDisplay();
    console.info(`[Musiqly] Waitlist click #${this.total} from: ${source}`);
  },
};

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

clickMetrics.updateDisplay();

waitlistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.dataset.track ?? "unknown";
    clickMetrics.increment(source);
    if (button === heroCta) {
      document.getElementById("email")?.focus();
    }
  });
});

if (demoButton && modal && modalClose) {
  demoButton.addEventListener("click", () => {
    modal.hidden = false;
    modal.querySelector(".button")?.focus();
  });

  const closeModal = () => {
    modal.hidden = true;
    demoButton.focus();
  };

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal.querySelector(".modal__backdrop")) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

const validateEmail = (value) => {
  return /^(?:[a-zA-Z0-9_'^&\/+{}=!?$%#`~-]+(?:\.[a-zA-Z0-9_'^&\/+{}=!?$%#`~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/i.test(
    value
  );
};

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = (formData.get("email") ?? "").toString().trim();

    if (!validateEmail(email)) {
      formFeedback.textContent = "Please enter a valid email address.";
      formFeedback.style.color = "#f87171";
      return;
    }

    formFeedback.textContent = "You’re on the list! We’ll send your invite soon.";
    formFeedback.style.color = "#34d399";
    form.reset();
  });
}
