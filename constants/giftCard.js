import { GIFT_CARD_TEXT } from '~/constants/text/giftCard';

export const INITIAL_GIFT_CARD_ERRORS = {
  amount: '',
  senderName: '',
  recipientName: '',
  recipientEmail: '',
  recipientPhone: '',
  deliveryDate: '',
  message: ''
};

export const DEFAULT_GIFT_CARD_AMOUNT = 30;
export const CUSTOM_GIFT_CARD_AMOUNT_OPTION = 'custom';
export const DELIVERY_TYPE_PERSONAL = 'personal';
export const DELIVERY_TYPE_GIFT = 'gift';
export const DELIVERY_TIME_IMMEDIATE = 'immediately';
export const DELIVERY_TIME_CUSTOM = 'custom';
export const DEFAULT_DELIVERY_PERIOD = 'afternoon';
export const MAX_GIFT_CARD_NAME_LENGTH = 80;
export const MAX_GIFT_CARD_EMAIL_LENGTH = 254;
export const MAX_GIFT_CARD_PHONE_LENGTH = 20;
export const MAX_GIFT_CARD_MESSAGE_LENGTH = 300;

export const PRESET_GIFT_CARD_AMOUNTS = [10, 20, 30, 40];

export const GIFT_CARD_DELIVERY_PERIODS = [
  { label: GIFT_CARD_TEXT.deliveryPeriods.morning, value: 'morning' },
  { label: GIFT_CARD_TEXT.deliveryPeriods.afternoon, value: 'afternoon' },
  { label: GIFT_CARD_TEXT.deliveryPeriods.evening, value: 'evening' }
];
