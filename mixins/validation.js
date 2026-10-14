export default {
  methods: {
    validateRequired(value, message) {
      return String(value === null || value === undefined ? '' : value).trim()
        ? ''
        : message;
    },
    validateFields(fields) {
      const errors = {};
      Object.keys(fields).forEach((field) => {
        const rule = fields[field];
        errors[field] = rule.required
          ? this.validateRequired(rule.value, rule.message)
          : '';
      });
      return errors;
    }
  }
};
