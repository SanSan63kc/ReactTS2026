import { Profile, ValidateProfileError } from "../../types/profile"

export let validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA]
  }

  let { first, lastname, age, country } = profile

  let errors: ValidateProfileError[] = []

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY)
  }

  return errors
}
