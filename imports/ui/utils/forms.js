export default {
  submit: (submitFn, formData) => {
    return (e) => {
      e.preventDefault();
      submitFn(formData);
    }
  }
}
