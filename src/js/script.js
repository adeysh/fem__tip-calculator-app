const people = document.getElementById("people");
const customTipEl = document.getElementById("custom-tip");
const tipInputButtons = document.querySelectorAll(".calculator__tip-option");
const questionPopupBtn = document.getElementById("question-popup");
const popup = document.getElementById("popup");
const totalTipPopupEl = document.getElementById("total-tip-popup");
const totalAmountPopupEl = document.getElementById("total-amount-popup");
const form = document.getElementById("calculator-form");
const tipAmountEl = document.getElementById("tip-amount");
const totalAmountEl = document.getElementById("total");
const resetBtn = document.getElementById("reset-btn");

form.addEventListener("input", (event) => {
    console.log("input");
    const input = event.target;
    const value = input.value.trim();
    const parent = input.parentElement;
    resetBtn.disabled = false;

    if (input.name == "bill" || input.name == "people") {

        if (value !== "" && parseFloat(value) > 0) {
            input.classList.remove("calculator__input--error");

            const errorText = parent.querySelector("p");

            if (errorText) {
                errorText.classList.remove("show");
                errorText.classList.add("hide");
            }
        }
    } else {
        if (value !== "" && parseFloat(value) > 0) {
            input.classList.remove("calculator__input--error");
        }
    }
    form.requestSubmit();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    createFormEntries(formData);
});

form.addEventListener("reset", () => {
    resetBtn.disabled = true;
})

customTipEl.addEventListener("focus", () => {
    tipInputButtons.forEach(btn => {
        if (btn.checked == true) {
            btn.checked = false;
        }
    });
});

const changeTextContent = (element, value) => {
    element.textContent = value;
};

const toggleClass = (element, className) => {
    element.classList.toggle(className);
}

resetBtn.addEventListener("click", () => {
    form.reset();
    changeTextContent(totalAmountEl, "00.00");
    changeTextContent(tipAmountEl, "00.00");
    changeTextContent(totalTipPopupEl, "00.00");
    changeTextContent(totalAmountPopupEl, "00.00");
});

const hidePopup = () => {
    toggleClass(popup, "show");
    toggleClass(popup, "hide");

    setTimeout(() => {
        popup.style.visibility = "hidden";
        popup.classList.remove("hide");
    }, 200);
}

const showPopup = () => {
    popup.style.visibility = "visible";
    popup.classList.add("show");
}

questionPopupBtn.addEventListener("click", () => {
    if (popup.classList.contains("show")) {
        hidePopup();
        toggleClass(questionPopupBtn, "active");
    } else {
        showPopup();
        toggleClass(questionPopupBtn, "active");
    }
})

const showError = (fieldname, errorText = "") => {
    const field = document.getElementById(fieldname);

    if (fieldname === "custom-tip") {
        field.classList.add("calculator__input--error");
    } else {
        const label = document.querySelector(`label[for=${fieldname}]`);
        const errorMsgEl = label.nextElementSibling;
        changeTextContent(errorMsgEl, errorText);

        field.classList.add("calculator__input--error");
        errorMsgEl.classList.add("calculator__label--error")
        errorMsgEl.classList.remove("hide");
        errorMsgEl.classList.add("show");
        console.log(field, label, errorMsgEl);
    }
}

const updateUI = (calculations) => {
    if (Number(calculations["tipPerPerson"]) && Number(calculations["billPerPerson"])) {
        changeTextContent(totalAmountEl, calculations["billPerPerson"]);
        changeTextContent(tipAmountEl, calculations["tipPerPerson"]);
        changeTextContent(totalTipPopupEl, calculations["tipAmount"]);
        changeTextContent(totalAmountPopupEl, calculations["totalAmount"]);
    }
}

const calculateBill = (formEntries) => {
    let tipAmount = (formEntries["tip"] / 100) * formEntries["bill"];
    let totalAmount = formEntries["bill"] + tipAmount;

    let tipPerPerson = tipAmount / formEntries["people"];
    let billPerPerson = totalAmount / formEntries["people"];

    const calculations = {
        "tipAmount": tipAmount.toFixed(2),
        "totalAmount": totalAmount.toFixed(2),
        "tipPerPerson": tipPerPerson.toFixed(2),
        "billPerPerson": billPerPerson.toFixed(2),
    }

    updateUI(calculations);
}

const createFormEntries = (formData) => {
    const formEntries = {
        "bill": parseFloat(formData["bill"]) === 0 ? showError("bill", "Can't be zero!")
            : parseFloat(formData["bill"]) < 0 ? showError("bill", "Can't be negative!")
                : parseFloat(formData["bill"]),

        "tip": formData["custom-tip"] !== "" ? parseFloat(formData["custom-tip"]) <= 0 ? showError("custom-tip")
            : parseFloat(formData["custom-tip"])
            : parseFloat(formData["options"]),

        "people": parseInt(formData["people"]) === 0 ? showError("people", "Can't be zero!") : parseInt(formData["people"]) < 0 ? showError("people", "Can't be negative!")
            : parseInt(formData["people"]),
    };

    calculateBill(formEntries);
    console.log(formEntries);
}
