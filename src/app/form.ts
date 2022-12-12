import { AbstractControl, ValidationErrors } from "@angular/forms"

export const Taille = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';
  if (!value) {
    return null
  }


  if (value.length < 9) {
    return {tailleMdp :'Votre identifiant doit avoir au moins 09 chiffres'};
}

let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { tailleMdp: `Votre identifiant doit contenir 12 chiffres` };
  }

  let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === true) {
    return { tailleMdp: `Votre identifiant ne doit contenir que des chiffres` };
  }


  let specialCharacters = /[~!@#$%^&*()_+\-\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === true) {
    return {tailleMdp: `Votre identifiant ne doit contenir que des chiffres` };
  }


  return null;
}
