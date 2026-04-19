export function resetUI(elements) {
  elements.tipAmount.textContent = "0.00";
  elements.total.textContent = "0.00";
  elements.totalTipPopup.textContent = "0.00";
  elements.totalAmountPopup.textContent = "0.00";
}

export function updateUI(elements, data) {
  if (!data) return;

  elements.tipAmount.textContent = format(data.tipPerPerson);
  elements.total.textContent = format(data.billPerPerson);
  elements.totalTipPopup.textContent = format(data.tipAmount);
  elements.totalAmountPopup.textContent = format(data.totalAmount);
}

function format(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

export function clearError(input) {
  const value = input.value.trim();
  const num = Number(value);

  if (value !== "" && Number.isFinite(num) && num > 0) {
    input.classList.remove("calculator__input--error");

    const parent = input.parentElement;
    const errorText = parent?.querySelector("p");

    if (errorText) {
      errorText.classList.remove("show");
      errorText.classList.add("hide");
    }
  }
}

export function updateText(element, value) {
  element.textContent = value;
}

export function toggleClass(element, className) {
  element.classList.toggle(className);
}

export function hidePopup(popup) {
  popup.classList.toggle("show");
  popup.classList.toggle("hide");

  const ANIMATION_DURATION = 200;

  setTimeout(() => {
    popup.style.visibility = "hidden";
    popup.classList.remove("hide");
  }, ANIMATION_DURATION);
}

export function showPopup(popup) {
  popup.style.visibility = "visible";
  popup.classList.add("show");
}

export function showError(elements, fieldName, message = "") {
  const field = elements[fieldName];

  if (!field) return;

  field.classList.add("calculator__input--error");

  if (fieldName !== "custom-tip") {
    const label = document.querySelector(`label[for=${fieldName}]`);
    const errorEl = label?.nextElementSibling;

    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove("hide");
      errorEl.classList.add("show");
    }
  }
}
