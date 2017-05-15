const basicLength = (lengthMax) => {
  return (value) => {
    value.length > lengthMax;
  }
};

const RULES_BY_TYPE = {
  serverQueryUser: (data) => ({
    username: {
      value: data.username,
      rules: ['basicLength']
    },
    password: {
      value: data.password,
      rules: ['basicLength']
    }
  }),
  registerForm: (data) => ({
    email: {
      value: data.email,
      rules: ['required', 'isEmail']
    },
    username: {
      value: data.username,
      rules: ['basicLength']
    },
    password: {
      value: data.password,
      rules: ['basicLength']
    }
  }),
  loginForm: (data) => ({
    email: {
      value: data.email,
      rules: ['required', 'isEmail']
    },
    password: {
      value: data.password,
      rules: ['basicLength']
    }
  }),
  clientForm: (data) => ({
    hostname: {
      value: data.hostname,
      rules: ['required'],
    },
    hostnamePort: {
      value: data.hostnamePort,
      rules: ['numeric']
    },
    serverQueryHostname: {
      value: data.serverQueryHostname || data.hostname,
      rules: []
    },
    serverQueryPort: {
      value: data.serverQueryPort || 10011,
      rules: []
    }
  }),
}

const RULES_BY_NAME = {
  required: ({ value, fieldName }) => ({
    error: !value || value && value.length === 0,
    message: `${fieldName} is required`,
  }),
  numeric: ({ value, fieldName }) => ({
    error: !value || isNaN(value) ,
    message: `${fieldName} should be a number`,
  }),
  isEmail: ({ value }) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
      error: !value || value && !re.test(value),
      message: `${value} is not a valid email`
    };
  },
  basicLength: ({ value, fieldName }) => ({
    error: !value || value && value.length < 2,
    message: `${fieldName} should be 2 words minimun`
  })
};


const collectValues = (data) => {
  let response = {};
  for (var property in data) {
    if (data.hasOwnProperty(property)) response[property] = data[property].value
  }
  return response;
};

const collectErrors = (data) => {
  const errors = [];
  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      const field = data[property];
      const rules = field.rules;
      rules.forEach((rule) => {
        const checkError = RULES_BY_NAME[rule]({
          value: field.value,
          fieldName: property
        });
        if (checkError.error) errors.push(checkError.message)
      })
    }
  }
  return errors;
}

export default {
  validate(data) {
    const formData = collectValues(data);
    const errors = collectErrors(data);
    const haveErrors = errors.length > 0;
    return { errors, formData, haveErrors };
  },
  applyRules({ data, type }) {
    return RULES_BY_TYPE[type](data);
  }
};
