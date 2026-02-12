import * as config from './config.mjs';

export const formatPrice = (amount) => {
    return `${config.currency} ${amount.toFixed(2)}`;
};