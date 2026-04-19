import {
  calculateBill,
  validateInputs,
  getFormValues,
  isFormReady,
} from "./logic.js";

import {
  updateUI,
  resetUI,
  showError,
  clearError,
  toggleClass,
  showPopup,
  hidePopup,
} from "./ui.js";

export function initApp(elements) {
  const { form, resetBtn, customTip, tipButtons, message, popup, questionBtn } =
    elements;

  message.classList.add("hide");

  if (form) {
    form.addEventListener("input", (event) => {
      message.classList.remove("hide");
      message.classList.add("show");

      clearError(event.target);
      maybeAutoSubmit(form, elements);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleSubmit(form, elements);
    });

    form.addEventListener("reset", () => {
      resetBtn.disabled = true;
    });
  }

  if (customTip) {
    customTip.addEventListener("focus", () => {
      tipButtons.forEach((btn) => (btn.checked = false));
    });
  }

  tipButtons.forEach((btn) => {
    btn.addEventListener("change", () => {
      customTip.value = "";
      maybeAutoSubmit(form, elements);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      message.classList.remove("hide");
      resetUI(elements);
    });
  }

  if (questionBtn) {
    questionBtn.addEventListener("click", () => {
      const isOpen = popup.classList.contains("show");

      isOpen ? hidePopup(popup) : showPopup(popup);
      toggleClass(questionBtn, "active");
    });
  }
}

function maybeAutoSubmit(form, elements) {
  const values = getFormValues(form);

  elements.message.classList.remove("hide");

  if (isFormReady(values)) {
    elements.message.classList.add("hide");
    elements.resetBtn.disabled = false;
    form.requestSubmit();
  }
}

function handleSubmit(form, elements) {
  const formData = Object.fromEntries(new FormData(form));

  const data = {
    bill: Number(formData.bill),
    tip: formData["custom-tip"]
      ? Number(formData["custom-tip"])
      : Number(formData.options),
    people: Number(formData.people),
  };

  const { field, message } = validateInputs(data);

  if (field) {
    showError(elements, field, message);
    return;
  }

  const result = calculateBill(data);
  updateUI(elements, result);
}
