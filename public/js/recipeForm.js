const getNewInstruction = (index) => {
  return `<li><input type="text" name="recipe[instructions][${index}]" required /></li>`;
};

const instructionList = document.querySelector("#instructions-list");
const addInstructionButton = document.querySelector("#add-instruction");
const deleteInstructionButton = document.querySelector("#delete-instruction");

let instructionsNum = document.querySelectorAll("#instructions-list li").length;

addInstructionButton.addEventListener("click", () => {
  if (instructionsNum === 1) {
    deleteInstructionButton.style.display = "block";
  }
  instructionList.insertAdjacentHTML(
    "beforeend",
    getNewInstruction(instructionsNum)
  );
  instructionsNum++;
});

deleteInstructionButton.addEventListener("click", () => {
  if (instructionsNum === 2) {
    deleteInstructionButton.style.display = "none";
  }
  document.querySelector("#instructions-list li:last-of-type").remove();
  instructionsNum--;
});

const getNewIngredient = (index) => {
  return (
    "<li>" +
    `<label for="name-${index}">Name</label>` +
    `<input type="text" name="recipe[ingredients][${index}][name]" id="name-${index}" placeholder="Name" required/>` +
    `<label for="amount-${index}">Amount</label>` +
    `<input type="number" name="recipe[ingredients][${index}][amount]" id="amount-${index}" placeholder="Amount" required/>` +
    `<label for="unit-${index}">Units</label>` +
    `<select name="recipe[ingredients][${index}][unit]" id="unit-${index}"><option value="647642d0a8c85cb5d2455a67">g</option><option value="647642d0a8c85cb5d2455a68">l</option><option value="647642d0a8c85cb5d2455a69">ml</option><option value="647642d0a8c85cb5d2455a6c">drop</option><option value="647642d0a8c85cb5d2455a6d">pinch</option><option value="647642d0a8c85cb5d2455a6e">items</option><option value="647642d0a8c85cb5d2455a6a">tbsp</option><option value="647642d0a8c85cb5d2455a6b">tsp</option></select>` +
    "</li>"
  );
};

let ingredientsNum = document.querySelectorAll("#ingredients-list li").length;

const ingredientsList = document.querySelector("#ingredients-list");
const addIngredientButton = document.querySelector("#add-ingredient");
const deleteIngredientButton = document.querySelector("#delete-ingredient");

addIngredientButton.addEventListener("click", () => {
  if (ingredientsNum === 1) {
    deleteIngredientButton.style.display = "block";
  }
  ingredientsList.insertAdjacentHTML(
    "beforeend",
    getNewIngredient(ingredientsNum)
  );
  ingredientsNum++;
});

deleteIngredientButton.addEventListener("click", () => {
  if (ingredientsNum === 2) {
    deleteIngredientButton.style.display = "none";
  }
  document.querySelector("#ingredients-list li:last-of-type").remove();
  ingredientsNum--;
});
