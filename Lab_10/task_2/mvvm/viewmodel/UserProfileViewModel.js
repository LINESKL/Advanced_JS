import { ViewModel } from '../base/ViewModel.js';

export class UserProfileViewModel extends ViewModel {
    constructor() {
        super();
        // Define reactive properties
        this.defineProperty('firstName', '');
        this.defineProperty('lastName', '');
        this.defineProperty('email', '');
        this.defineProperty('age', '');
        this.defineProperty('errors', {});

        // Set up computed properties updates
        this.$watch('firstName', () => this.validate());
        this.$watch('lastName', () => this.validate());
        this.$watch('email', () => this.validate());
        this.$watch('age', () => this.validate());
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`.trim() || 'Anonymous';
    }

    validate() {
        const errors = {};
        if (!this.firstName || this.firstName.length < 2) {
            errors.firstName = 'First name must be at least 2 characters';
        }
        if (!this.lastName || this.lastName.length < 2) {
            errors.lastName = 'Last name must be at least 2 characters';
        }
        if (!this.email || !this.isValidEmail(this.email)) {
            errors.email = 'Please enter a valid email';
        }
        const age = Number.parseInt(this.age);
        if (this.age && (Number.isNaN(age) || age < 18 || age > 120)) {
            errors.age = 'Age must be between 18 and 120';
        }
        this.errors = errors;
        return Object.keys(errors).length === 0;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    get isValid() {
        return Object.keys(this.errors || {}).length === 0;
    }

    save() {
        if (this.validate()) {
            const profile = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                age: this.age ? Number.parseInt(this.age) : null
            };
            console.log('Saving profile:', profile);
            return { success: true, profile };
        }
        return { success: false, errors: this.errors };
    }

    reset() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.age = '';
        this.errors = {};
    }
}