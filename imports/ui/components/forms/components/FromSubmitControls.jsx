import React from 'react';
import FormButton from '/imports/ui/components/forms/components/FormButton';

class FormSubmitControls extends React.Component {
  render() {
    const { onCancel, submitText, cancelText } = this.props;
    return (
      <div className="field is-grouped">
        <p className="control">
          <FormButton
            type="submit"
            className="button is-primary">
            {submitText}
          </FormButton>
        </p>
        <p className="control">
          <FormButton
            type="button"
            className="button is-link"
            onClick={onCancel}>
            {cancelText}
          </FormButton>
        </p>
      </div>
    )
  }
};

FormSubmitControls.defaultProps = {
  cancelText: 'cancel',
};

export default FormSubmitControls;
