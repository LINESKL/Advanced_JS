export class SMSNotification {
    constructor(to) {
        this.to = to;
    }

    send(message) {
        console.log(`[SMS] To: ${this.to}`);
        console.log(`Message: ${message}`);
        return { success: true, type: 'sms'};
    }
}