import { ref } from "vue";
import * as yup from "yup";

export function useStepThreeForm(formData, emit) {
  const password = ref("");
  const seePassword = ref(false);

  const schema = yup.object({
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "A senha deve conter pelo menos 6 caracteres."),
  });

  function initialize() {
    password.value = formData.password;
  }

  function handleSaveData() {
    formData.password = password.value;
    formData.currentStep += 1;
    emit("next-step", formData.currentStep);
  }

  function handlePreviousStep() {
    formData.currentStep -= 1;
    emit("previous-step", formData.currentStep);
  }

  function toggleSeePassword() {
    seePassword.value = !seePassword.value;
  }

  return {
    password,
    seePassword,
    schema,
    initialize,
    handleSaveData,
    handlePreviousStep,
    toggleSeePassword,
  };
}
