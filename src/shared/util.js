export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const generateBase64FromImage = imageFile => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
    });
  
    reader.readAsDataURL(imageFile);
    return promise;
};

export const convertTime = (num) => {
    const getSeconds = Math.round((num / 60) * 100 + Number.EPSILON) / 100 % 1;
    const seconds = Math.round(getSeconds * 100 + Number.EPSILON) / 100 * 60;
    const time = `${Math.floor(num / 60)}:${Math.round(seconds)}`;
    return time.split(':').map(num => num.length < 2 ? `0${num}` : num).join(':');
  }
export const convertToSeconds = (time) => {
    return time.split(':').reduce((a,b) => parseInt(a*60) + parseInt(b))
}

export const checkValidity = (value, rules, password = 0) => {
  let isValid = true;
  if (!rules) {
      return true;
  }
  
  if (rules.required) {
      isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
  }

  if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
  }

  if(rules.isEqual) {
      isValid = value === password && isValid;
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }
  if (rules.isTime) {
      const pattern = /^[0-9]{1,}(:[0-9]{2})$|^[0-9]{1,}$/g;
      isValid = pattern.test(value) && isValid;
  }

  return isValid;
}