export function parseFormData(formData) {
  const hasCustomTip = formData["custom-tip"]?.trim() !== "";

  return {
    bill: Number(formData.bill),
    tip: hasCustomTip
      ? Number(formData["custom-tip"])
      : Number(formData.options),
    people: Number(formData.people),
    isCustomTip: hasCustomTip,
  };
}

export function validateInputs({ bill, tip, people, isCustomTip }) {
  if (Number.isNaN(bill)) return { field: "bill", message: "Invalid number" };
  if (Number.isNaN(people))
    return { field: "people", message: "Invalid number" };
  if (Number.isNaN(tip)) return { field: "custom-tip", message: "Invalid tip" };

  if (bill === 0) return { field: "bill", message: "Can't be zero!" };
  if (bill < 0) return { field: "bill", message: "Can't be negative!" };

  if (people === 0) return { field: "people", message: "Can't be zero!" };
  if (people < 0) return { field: "people", message: "Can't be negative!" };

  if (isCustomTip && tip <= 0)
    return { field: "custom-tip", message: "Invalid tip" };

  return { field: null };
}

export function calculateBill({ bill, tip, people }) {
  if (people === 0) {
    return {
      tipAmount: 0,
      totalAmount: 0,
      tipPerPerson: 0,
      billPerPerson: 0,
    };
  }

  const tipAmount = (tip / 100) * bill;
  const totalAmount = bill + tipAmount;

  return {
    tipAmount,
    totalAmount,
    tipPerPerson: tipAmount / people,
    billPerPerson: totalAmount / people,
  };
}

export function isFormReady({ bill, people, selectedTip, customTip }) {
  const hasBill = bill !== "";
  const hasPeople = people !== "";
  const hasTip = selectedTip !== "" || customTip !== "";

  return hasBill && hasPeople && hasTip;
}

export function getFormValues(form) {
  const formData = Object.fromEntries(new FormData(form));

  return {
    bill: formData.bill?.trim() || "",
    people: formData.people?.trim() || "",
    selectedTip: formData.options || "",
    customTip: formData["custom-tip"]?.trim() || "",
  };
}
