// Spec
// all inputs are filled
// ToS is agreed
// email is in valid format (Regex)
// enable the button if all of the above is valid

// Step 1) get the elements
// All the input field
const allInputs = document.querySelectorAll(".form-control");
const arrayOfAllInputs = Array.from(allInputs);
// Checkbox for ToS
const checkbox = document.querySelector("#tos");
// Submit button
const submitButton = document.querySelector("button");
// Email input field
const emailInput = document.querySelector("#email");

// Add a event listener to checkbox so we can try to enable the button
checkbox.addEventListener("change", () => {
  // try to enable the button
  enableButton();
});

// Add a event listener to all text inputs so we can try to enable the button after user finished typing
allInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    // validate the input field that I blurred
    if (input === emailInput) {
      // if the input field is the email input
      // Get the email user typed
      const email = input.value;
      const valid = validateEmail(email);
      addValidClassToInput(input, valid);
    } else {
      // If the input field is not the email input
      const valid = input.value !== ""; // boolean
      addValidClassToInput(input, valid);
    }

    // try to enable the button
    enableButton();
  });
});

// returns boolean
// string argument
const validateEmail = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

// First argument is ad DOM of an input, and second is a boolean
const addValidClassToInput = (input, valid) => {
  if (valid) {
    // if the input is valid, add the .is-valid class
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    // if not, add the .is-invalid class
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
};

// This function tries to enable the button depending on the validity of the form
const enableButton = () => {
  // Check if all the input field has .is-valid class
  const allInputsAreValid = allValid();
  // Check if the ToS is checked
  const tosIsChecked = checkboxChecked();
  // if both are true
  if (allInputsAreValid && tosIsChecked) {
    // enable the button
    submitButton.disabled = false;
    // change the text
    submitButton.innerText = "Submit";
  } else {
    // disable the button
    submitButton.disabled = true;
    // Change the text back to Please fill all fields
    submitButton.innerText = "Please fill all fields";
  }
};

const checkboxChecked = () => {
  // see if the checkbox DOM has been checked (boolean)
  return checkbox.checked;
};

const allValid = () => {
  // check if all inputs has .is-valid class (similar to array.all? in ruby)
  return arrayOfAllInputs.every((input) =>
    input.classList.contains("is-valid")
  );
};
