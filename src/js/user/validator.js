import { countries } from "../constants/countries.js";
import { phoneCodes } from "../constants/constants.js";
export class UserValidator {
    user;
    constructor(user) {
        this.user = user;
    }
    static validationRules = {
        full_name: (user) => user.full_name === "string",
        gender: (user) => user.gender === "male" || user.gender === "female",
        note: (user) => user.note === "string",
        state: (user) => user.state === "string",
        city: (user) => user.city === "string",
        country: (user) => countries().includes(user.country),
        age: (user) => Number.isInteger(user.age) && user.age >= 18 && user.age <= 100,
        phone: (user) => /(\(?\+[0-9]{1,3}\)?)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/.test(user.phone),
        email: (user) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email),
    };
    validated() {
        const validated = { ...this.user };
        const fieldsValidation = {
            full_name: () => this.capitalize("full_name"),
            gender: () => this.capitalize("gender"),
            note: () => this.capitalizeFirst("note"),
            state: () => this.capitalize("state"),
            city: () => this.capitalize("city"),
            country: () => this.capitalize("country"),
            age: () => this.number("age"),
            phone: () => this.phone("phone"),
            email: () => this.email("email")
        };
        for (const field in fieldsValidation) {
            validated[field] = fieldsValidation[field](field);
        }
        return validated;
    }
    isValidBy(validationRule) {
        return validationRule(this.user);
    }
    isValid(field) {
        return this.isValidBy(UserValidator.validationRules[field]);
    }
    capitalizeFirst = (field) => {
        if (this.isValid(field))
            return null;
        return this.user[field].charAt(0).toUpperCase() + this.user[field].slice(1);
    };
    capitalize = (field) => {
        if (this.isValid(field))
            return null;
        return this.user[field].split(" ").map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()).join(" ").trim();
    };
    number = (field) => {
        return this.isValid(field) ? this.user[field] : null;
    };
    phone = (field) => {
        const countryCode = phoneCodes[this.user.country];
        return this.isValid(field) ? `${countryCode ? countryCode : ""}${this.user[field]}` : null;
    };
    email = (field) => {
        return this.isValid(field) ? this.user[field] : null;
    };
}
//# sourceMappingURL=validator.js.map