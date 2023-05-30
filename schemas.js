const yup = require("yup");

module.exports.recipeSchema = yup.object({
  recipe: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    cookingTime: yup.number().required().min(1),
    ingredients: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required(),
          amount: yup.number().required().min(1),
          unit: yup.string().required(),
        })
      )
      .min(1),
    instructions: yup.array().of(yup.string().required()).min(1),
    category: yup.string().required(),
  }),
});

module.exports.commentSchema = yup.object({
  comment: yup.object({
    body: yup.string().required(),
    rating: yup.number().required().min(1).max(5),
  }),
});
