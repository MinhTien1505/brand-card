<template>
  <section class="gift-card-panel" aria-labelledby="gift-card-title">
    <h2 id="gift-card-title" class="gift-card-panel__title">{{ text.title }}</h2>

    <form novalidate @submit.prevent="submitGiftCard">
      <fieldset class="gift-form__section">
        <legend class="gift-form__legend">{{ text.amountLegend }}</legend>
        <div class="choice-list" role="group" :aria-label="text.amountGroup">
          <button
            v-for="amount in presetAmounts"
            :key="amount"
            class="choice-button"
            :class="{ 'choice-button--selected': amountOption === amount }"
            type="button"
            :aria-pressed="amountOption === amount"
            @click="selectAmount(amount)"
          >
            {{ text.currencySymbol }}{{ amount }}
          </button>
          <button
            class="choice-button"
            :class="{ 'choice-button--selected': amountOption === customAmountOption }"
            type="button"
            :aria-pressed="amountOption === customAmountOption"
            @click="selectAmount(customAmountOption)"
          >
            {{ text.customAmount }}
          </button>
        </div>

        <div v-if="amountOption === customAmountOption" class="custom-amount">
          <span class="custom-amount__currency" aria-hidden="true">{{ text.currencySymbol }}</span>
          <label class="visually-hidden" for="custom-amount">{{ text.customAmountLabel }}</label>
          <input
            id="custom-amount"
            v-model="customAmount"
            type="text"
            inputmode="decimal"
            autocomplete="off"
            :placeholder="text.customAmountPlaceholder"
            required
            :aria-invalid="Boolean(errors.amount)"
            @input="clearError('amount')"
          >
        </div>
        <p v-if="errors.amount" class="gift-form__error">{{ errors.amount }}</p>
      </fieldset>

      <fieldset class="gift-form__section">
        <legend class="gift-form__legend">{{ text.deliveryTypeLegend }}</legend>
        <div class="radio-list">
          <label class="radio-option">
            <input v-model="deliveryType" type="radio" :value="deliveryTypes.personal">
            <span>{{ text.personalDelivery }}</span>
          </label>
          <label class="radio-option">
            <input v-model="deliveryType" type="radio" :value="deliveryTypes.gift">
            <span>{{ text.giftDelivery }}</span>
          </label>
        </div>
      </fieldset>

      <div v-if="deliveryType === deliveryTypes.gift" class="gift-form__grid gift-form__section">
        <div class="form-field">
          <label for="sender-name">{{ text.senderName }}</label>
          <input
            id="sender-name"
            v-model.trim="form.senderName"
            type="text"
            :maxlength="limits.name"
            autocomplete="name"
            :placeholder="text.senderNamePlaceholder"
            required
            :aria-invalid="Boolean(errors.senderName)"
            @input="clearError('senderName')"
          >
          <span v-if="errors.senderName" class="gift-form__error">{{ errors.senderName }}</span>
        </div>
        <div class="form-field">
          <label for="recipient-name">{{ text.recipientName }}</label>
          <input
            id="recipient-name"
            v-model.trim="form.recipientName"
            type="text"
            :maxlength="limits.name"
            autocomplete="off"
            :placeholder="text.recipientNamePlaceholder"
            required
            :aria-invalid="Boolean(errors.recipientName)"
            @input="clearError('recipientName')"
          >
          <span v-if="errors.recipientName" class="gift-form__error">{{ errors.recipientName }}</span>
        </div>
      </div>

      <div class="gift-form__grid gift-form__section">
        <div class="form-field">
          <label for="recipient-email">{{ text.recipientEmail }}</label>
          <input
            id="recipient-email"
            v-model.trim="form.recipientEmail"
            type="email"
            :maxlength="limits.email"
            autocomplete="email"
            :placeholder="text.recipientEmailPlaceholder"
            required
            :aria-invalid="Boolean(errors.recipientEmail)"
            @input="clearError('recipientEmail')"
          >
          <span v-if="errors.recipientEmail" class="gift-form__error">{{ errors.recipientEmail }}</span>
        </div>
        <div class="form-field">
          <label for="recipient-phone">{{ text.recipientPhone }}</label>
          <div class="phone-input">
            <span class="phone-input__prefix">{{ text.phonePrefix }}</span>
            <input
              id="recipient-phone"
              v-model.trim="form.recipientPhone"
              type="tel"
              :maxlength="limits.phone"
              autocomplete="tel-national"
              inputmode="tel"
              :placeholder="text.recipientPhonePlaceholder"
              required
              :aria-invalid="Boolean(errors.recipientPhone)"
              @input="clearError('recipientPhone')"
            >
          </div>
          <span v-if="errors.recipientPhone" class="gift-form__error">{{ errors.recipientPhone }}</span>
        </div>
      </div>

      <fieldset v-if="deliveryType === 'gift'" class="gift-form__section">
        <legend class="gift-form__legend">{{ text.deliveryTimeLegend }}</legend>
        <div class="radio-list">
          <label class="radio-option">
            <input v-model="deliveryTime" type="radio" :value="deliveryTimes.immediate">
            <span>{{ text.immediateDelivery }}</span>
          </label>
          <label class="radio-option">
            <input v-model="deliveryTime" type="radio" :value="deliveryTimes.custom">
            <span>{{ text.customDelivery }}</span>
          </label>
        </div>
      </fieldset>

      <div
        v-if="deliveryType === deliveryTypes.gift && deliveryTime === deliveryTimes.custom"
        class="gift-form__grid gift-form__section"
      >
        <div class="form-field">
          <label for="delivery-date">{{ text.deliveryDate }}</label>
          <input
            id="delivery-date"
            v-model="form.deliveryDate"
            type="date"
            :min="minimumDate"
            required
            :aria-invalid="Boolean(errors.deliveryDate)"
            @change="clearError('deliveryDate')"
          >
          <span v-if="errors.deliveryDate" class="gift-form__error">{{ errors.deliveryDate }}</span>
        </div>
        <fieldset class="form-field period-field">
          <legend>{{ text.period }}</legend>
          <div class="choice-list">
            <button
              v-for="period in deliveryPeriods"
              :key="period.value"
              class="choice-button"
              :class="{ 'choice-button--selected': form.deliveryPeriod === period.value }"
              type="button"
              :aria-pressed="form.deliveryPeriod === period.value"
              @click="form.deliveryPeriod = period.value"
            >
              {{ period.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <div v-if="deliveryType === deliveryTypes.gift" class="form-field gift-form__section">
        <label for="gift-message">{{ text.message }}</label>
        <textarea
          id="gift-message"
          v-model.trim="form.message"
          :maxlength="limits.message"
          :placeholder="text.messagePlaceholder"
          required
          :aria-invalid="Boolean(errors.message)"
          @input="clearError('message')"
        ></textarea>
        <span class="form-field__hint">{{ form.message.length }}/{{ limits.message }}</span>
        <span v-if="errors.message" class="gift-form__error">{{ errors.message }}</span>
      </div>

      <div class="gift-form__actions">
        <button class="submit-button" type="submit">{{ text.send }}</button>
      </div>
    </form>
  </section>
</template>

<script>
import {
  CUSTOM_GIFT_CARD_AMOUNT_OPTION,
  DEFAULT_DELIVERY_PERIOD,
  DEFAULT_GIFT_CARD_AMOUNT,
  DELIVERY_TIME_CUSTOM,
  DELIVERY_TIME_IMMEDIATE,
  DELIVERY_TYPE_GIFT,
  DELIVERY_TYPE_PERSONAL,
  GIFT_CARD_DELIVERY_PERIODS,
  INITIAL_GIFT_CARD_ERRORS,
  MAX_GIFT_CARD_EMAIL_LENGTH,
  MAX_GIFT_CARD_MESSAGE_LENGTH,
  MAX_GIFT_CARD_NAME_LENGTH,
  MAX_GIFT_CARD_PHONE_LENGTH,
  PRESET_GIFT_CARD_AMOUNTS
} from '~/constants/giftCard';
import { GIFT_CARD_TEXT } from '~/constants/text/giftCard';
import validationMixin from '~/mixins/validation';

export default {
  name: 'IssueGiftCardPanel',
  mixins: [validationMixin],
  props: {
    brandId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: GIFT_CARD_TEXT,
      customAmountOption: CUSTOM_GIFT_CARD_AMOUNT_OPTION,
      deliveryTypes: {
        personal: DELIVERY_TYPE_PERSONAL,
        gift: DELIVERY_TYPE_GIFT
      },
      deliveryTimes: {
        immediate: DELIVERY_TIME_IMMEDIATE,
        custom: DELIVERY_TIME_CUSTOM
      },
      presetAmounts: PRESET_GIFT_CARD_AMOUNTS,
      deliveryPeriods: GIFT_CARD_DELIVERY_PERIODS,
      limits: {
        name: MAX_GIFT_CARD_NAME_LENGTH,
        email: MAX_GIFT_CARD_EMAIL_LENGTH,
        phone: MAX_GIFT_CARD_PHONE_LENGTH,
        message: MAX_GIFT_CARD_MESSAGE_LENGTH
      },
      amountOption: DEFAULT_GIFT_CARD_AMOUNT,
      customAmount: '',
      deliveryType: DELIVERY_TYPE_PERSONAL,
      deliveryTime: DELIVERY_TIME_IMMEDIATE,
      form: {
        senderName: '',
        recipientName: '',
        recipientEmail: '',
        recipientPhone: '',
        deliveryDate: '',
        deliveryPeriod: DEFAULT_DELIVERY_PERIOD,
        message: ''
      },
      errors: { ...INITIAL_GIFT_CARD_ERRORS }
    };
  },
  computed: {
    minimumDate() {
      const date = new Date();
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDate.toISOString().slice(0, 10);
    },
    amount() {
      return this.amountOption === this.customAmountOption
        ? Number(this.customAmount)
        : Number(this.amountOption);
    }
  },
  methods: {
    selectAmount(amount) {
      this.amountOption = amount;
      this.clearError('amount');
    },
    clearError(field) {
      if (this.errors[field]) this.$set(this.errors, field, '');
    },
    validate() {
      const isGift = this.deliveryType === DELIVERY_TYPE_GIFT;
      const isScheduledGift = isGift && this.deliveryTime === DELIVERY_TIME_CUSTOM;
      const errors = this.validateFields({
        amount: {
          value: this.customAmount,
          message: this.text.validation.amountRequired,
          required: this.amountOption === this.customAmountOption
        },
        senderName: {
          value: this.form.senderName,
          message: this.text.validation.senderNameRequired,
          required: isGift
        },
        recipientName: {
          value: this.form.recipientName,
          message: this.text.validation.recipientNameRequired,
          required: isGift
        },
        recipientEmail: {
          value: this.form.recipientEmail,
          message: this.text.validation.recipientEmailRequired,
          required: true
        },
        recipientPhone: {
          value: this.form.recipientPhone,
          message: this.text.validation.recipientPhoneRequired,
          required: true
        },
        deliveryDate: {
          value: this.form.deliveryDate,
          message: this.text.validation.deliveryDateRequired,
          required: isScheduledGift
        },
        message: {
          value: this.form.message,
          message: this.text.validation.messageRequired,
          required: isGift
        }
      });
      this.errors = errors;
      return Object.values(errors).every(message => !message);
    },
    submitGiftCard() {
      if (!this.validate()) return;

      const isGift = this.deliveryType === DELIVERY_TYPE_GIFT;
      const scheduledGift = isGift
        && this.deliveryTime === DELIVERY_TIME_CUSTOM;
      const data = {
        brandId: this.brandId,
        amount: this.amount,
        deliveryType: this.deliveryType,
        deliveryTime: isGift ? this.deliveryTime : DELIVERY_TIME_IMMEDIATE,
        deliveryDate: scheduledGift ? this.form.deliveryDate : null,
        deliveryPeriod: scheduledGift ? this.form.deliveryPeriod : null,
        senderName: isGift ? this.form.senderName : null,
        recipientName: isGift ? this.form.recipientName : null,
        recipientEmail: this.form.recipientEmail,
        recipientPhone: this.form.recipientPhone,
        message: isGift ? this.form.message : null
      };

      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.gift-card-panel {
  width: 100%;
  min-width: 0;
  padding: $space-12;
  border: $border-width solid $color-border;
  border-radius: $border-radius-card;
  background: $color-surface;
  box-shadow: $shadow-card;

  &__title {
    margin: 0 0 $space-12;
    color: $color-text-primary;
    font-size: $font-size-section-title;
    font-weight: $font-weight-bold;
  }
}

.gift-form {
  &__section {
    min-width: 0;
    margin: 0 0 $form-section-gap;
    padding: 0;
    border: 0;

    &:last-of-type {
      margin-bottom: $space-8;
    }
  }

  &__legend,
  .period-field legend {
    margin-bottom: $space-4;
    color: $color-text-secondary;
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-6;
  }

  &__error {
    display: block;
    margin-top: $space-2;
    color: $color-error;
    font-size: $font-size-micro;
    line-height: $line-height-normal;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: $space-6;
  }
}

.choice-list,
.radio-list {
  display: flex;
  flex-wrap: wrap;
  gap: $space-4;
}

.choice-button {
  min-height: $form-control-height;
  padding: 0 $space-6;
  border: $border-width solid $color-input-border;
  border-radius: $border-radius-control;
  background: $color-surface;
  color: $color-text-primary;
  font-size: $font-size-small;
  font-weight: $font-weight-medium;
  cursor: pointer;

  &:hover {
    border-color: $color-primary;
  }

  &:focus-visible {
    outline: $space-1 solid $color-focus;
    outline-offset: $border-width;
  }

  &--selected {
    border-color: $color-primary;
    background: $color-primary;
    color: $color-primary-text;
  }
}

.custom-amount {
  display: flex;
  max-width: $form-custom-amount-max-width;
  margin-top: $space-6;

  &__currency {
    display: flex;
    min-width: $form-control-height;
    align-items: center;
    justify-content: center;
    border: $border-width solid $color-input-border;
    border-right: 0;
    border-radius: $border-radius-control 0 0 $border-radius-control;
    background: $color-pagination-hover-background;
    color: $color-text-secondary;
    font-size: $font-size-body;
  }

  input {
    flex: 1;
    width: 100%;
    min-width: 0;
    min-height: $form-control-height;
    padding: $space-4 $space-6;
    border: $border-width solid $color-input-border;
    border-radius: 0 $border-radius-control $border-radius-control 0;
    background: $color-input-background;
    color: $color-text-primary;
    font: inherit;
    font-size: $font-size-small;
    transition: border-color $transition-fast, box-shadow $transition-fast;

    &::placeholder {
      color: $color-input-placeholder;
    }

    &:focus {
      border-color: $color-primary;
      outline: 0;
      box-shadow: 0 0 0 $border-width rgba(22, 132, 255, 0.2);
    }

    &[aria-invalid='true'] {
      border-color: $color-error;
    }
  }
}

.radio-list {
  gap: $space-10;
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  color: $color-text-secondary;
  font-size: $font-size-small;
  cursor: pointer;

  input {
    width: $space-5;
    height: $space-5;
    margin: 0;
    accent-color: $color-radio;
  }
}

.form-field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;

  > label,
  > legend {
    margin-bottom: $space-4;
    color: $color-text-secondary;
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
  }

  input,
  textarea {
    width: 100%;
    min-width: 0;
    min-height: $form-control-height;
    padding: $space-4;
    border: $border-width solid $color-input-border;
    border-radius: $border-radius-control;
    background: $color-input-background;
    color: $color-text-primary;
    font: inherit;
    font-size: $font-size-small;
    transition: border-color $transition-fast, box-shadow $transition-fast;

    &::placeholder {
      color: $color-input-placeholder;
    }

    &:focus {
      border-color: $color-primary;
      outline: 0;
      box-shadow: 0 0 0 $border-width rgba(22, 132, 255, 0.2);
    }

    &[aria-invalid='true'] {
      border-color: $color-error;
    }
  }

  textarea {
    min-height: $form-textarea-height;
    resize: vertical;
  }

  &__hint {
    align-self: flex-end;
    margin-top: $space-2;
    color: $color-text-muted;
    font-size: $font-size-micro;
  }
}

.period-field {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;

  .choice-list {
    gap: $space-2;
  }

  .choice-button {
    padding: 0 $space-4;
  }
}

.phone-input {
  display: flex;
  width: 100%;

  &__prefix {
    display: flex;
    min-width: $form-control-height;
    align-items: center;
    justify-content: center;
    border: $border-width solid $color-input-border;
    border-right: 0;
    border-radius: $border-radius-control 0 0 $border-radius-control;
    background: $color-pagination-hover-background;
    color: $color-text-secondary;
    font-size: $font-size-small;
  }

  input {
    border-radius: 0 $border-radius-control $border-radius-control 0;
  }
}

.submit-button {
  min-width: $form-button-min-width;
  min-height: $form-control-height;
  padding: 0 $space-8;
  border: 0;
  border-radius: $border-radius-control;
  background: $color-primary;
  color: $color-primary-text;
  font-size: $font-size-small;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: background-color $transition-fast;

  &:hover:not(:disabled) {
    background: $color-primary-hover;
  }

  &:focus-visible {
    outline: $space-1 solid $color-focus;
    outline-offset: $border-width;
  }

}

.visually-hidden {
  position: absolute;
  width: $border-width;
  height: $border-width;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: $breakpoint-mobile) {
  .gift-card-panel {
    padding: $space-6;
  }

  .gift-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
