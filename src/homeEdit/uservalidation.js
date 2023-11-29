import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at least!")
    .max(50, "Name must not exceed 50 charcters!")
    .required("Your name is required!"),
  sectors: Yup.array()
    .of(Yup.number().required("Choose at least one Sector!"))
    .min(1, "Choose at least one Sector!")
    .max(5, "Maximun select is five Sectors!"),
  agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms!"),
});
