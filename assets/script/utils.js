export class Contact {
    constructor(name, city, email) {
        this._name = name;
        this._city = city;
        this._email = email;
    }

    getName() {
        return this._name;
    }

    getCity() {
        return this._city;
    }

    getEmail() {
        return this._email;
    }
}
