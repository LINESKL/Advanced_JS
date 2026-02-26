import { EmailNotification } from "./notifications/EmailNotification";
import { SMSNotification } from "./notifications/SMSNotification";
import { PushNotification } from "./notifications/PushNotification";

export class NotificationFactory {
    static create(type, options) {
        switch (type) {
            case 'email':
                return new EmailNotification(options.to, options.subject);
            case 'sms':
                return new SMSNotification(options.to);
            case 'push':
                return new PushNotification(options.deviceToken, options.title);
            default:
                throw new Error(`Unknown notification type: ${type}`);
        }
    }

    static getSuppportedTypes() {
        return ['email', 'sms', 'push'];
    }
}