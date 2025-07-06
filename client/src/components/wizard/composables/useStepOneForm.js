import { ref, computed } from "vue";
import * as yup from "yup";

export function useStepOneForm(formData, emit) {
  const email = ref("");
  const entity = ref(null);

  const isLegalPerson = computed(() => entity.value === 2);

  const schema = yup.object({
    email: yup
      .string()
      .required("E-mail é um campo obrigatório")
      .email("Informe um e-mail válido"),
  });

  function initialize() {
    email.value = formData.email || "";
    entity.value = formData.isLegalPerson ? 2 : 1;
  }

  function handleSaveData() {
    formData.email = email.value;
    formData.entity = entity.value;
    formData.isLegalPerson = isLegalPerson.value;

    formData.currentStep += 1;
    emit("next-step", formData.currentStep);
  }

  return {
    email,
    entity,
    isLegalPerson,
    schema,
    initialize,
    handleSaveData,
  };
}
