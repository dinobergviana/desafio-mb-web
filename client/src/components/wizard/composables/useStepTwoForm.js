import { ref, computed } from "vue";

export function useStepTwoForm(formData, emit, schemaFactory) {
  const name = ref("");
  const cpf = ref("");
  const birthDate = ref("");
  const legalName = ref("");
  const cnpj = ref("");
  const openingDate = ref("");
  const phone = ref("");

  const isLegalPerson = computed(() => formData.isLegalPerson);

  const schema = schemaFactory({ formData });

  function initialize() {
    if (isLegalPerson.value) {
      legalName.value = formData.legalName || "";
      cnpj.value = formData.cnpj || "";
      openingDate.value = formData.openingDate || "";
    } else {
      name.value = formData.name || "";
      cpf.value = formData.cpf || "";
      birthDate.value = formData.birthDate || "";
    }

    phone.value = formData.phone || "";
  }

  function handleSaveData() {
    if (isLegalPerson.value) {
      formData.legalName = legalName.value;
      formData.cnpj = cnpj.value;
      formData.openingDate = openingDate.value;
    } else {
      formData.name = name.value;
      formData.cpf = cpf.value;
      formData.birthDate = birthDate.value;
    }

    formData.phone = phone.value;
    formData.currentStep += 1;
    emit("next-step", formData.currentStep);
  }

  function handlePreviousStep() {
    formData.currentStep -= 1;
    emit("previous-step", formData.currentStep);
  }

  return {
    name,
    cpf,
    birthDate,
    legalName,
    cnpj,
    openingDate,
    phone,
    isLegalPerson,
    schema,
    initialize,
    handleSaveData,
    handlePreviousStep,
  };
}
