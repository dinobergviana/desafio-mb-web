import * as yup from "yup";

import date from "../../../helpers/date.js";
import phoneNumber from "../../../helpers/phone.js";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$|^\d{14}$/;

function stepTwoSchema(props) {
  const schema = yup.object({
    name: !props.formData.isLegalPerson
      ? yup.string().required("Campo obrigatório")
      : false,
    cpf: !props.formData.isLegalPerson
      ? yup
          .string()
          .required("Campo obrigatório")
          .matches(cpfRegex, "CPF inválido")
      : false,
    birthDate: !props.formData.isLegalPerson
      ? yup
          .string()
          .required("Campo obrigatório")
          .test(
            "valid-date",
            "Data inválida.",
            (value) => date.validateDate(value)
          )
          .test(
            "not-future-date",
            "Datas futuras não são permitidas.",
            (value) => date.checkIsFutureDate(value)
          )
          .test(
            "is-of-age",
            "É necessário ter pelo menos 18 anos.",
            (value) => date.checkIsLegalAge(value)
          )
      : false,
    legalName: props.formData.isLegalPerson
      ? yup.string().required("Campo obrigatório")
      : false,
    cnpj: props.formData.isLegalPerson
      ? yup
          .string()
          .required("Campo obrigatório")
          .matches(cnpjRegex, "CNPJ inválido")
      : false,
    openingDate: props.formData.isLegalPerson
      ? yup
          .string()
          .required("Campo obrigatório")
          .test("valid-date", "Data inválida", (value) =>
            date.validateDate(value)
          )
          .test(
            "not-future-date",
            "Datas futuras não são permitidas.",
            (value) => date.checkIsFutureDate(value)
          )
      : false,
    phone: yup
      .string()
      .required("Campo obrigatório")
      .test("valid-phone", "Telefone inválido", (value) =>
        phoneNumber.validatePhoneNumber(value)
      ),
  });

  return schema;
}

export default stepTwoSchema;
