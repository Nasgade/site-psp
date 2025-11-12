function validateForm(event) {
  if (event) event.preventDefault();

  const passField = document.querySelector('input[name="password"]');
  const confirmField = document.querySelector('input[name="confirm"]');
  const phoneInput = document.querySelector('input[name="phone"]');

  if (passField && confirmField && passField.value !== confirmField.value) {
    alert("Пароли не совпадают!");
    confirmField.focus();
    return false;
  }

  if (!phoneInput) {
    alert("Поле телефона не найдено!");
    return false;
  }

  let digits = phoneInput.value.replace(/\D/g, '');
  const ok11 = digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
  const ok10 = digits.length === 10;

  if (!ok11 && !ok10) {
    alert("Введите корректный номер телефона (10 или 11 цифр).");
    phoneInput.focus();
    return false;
  }

  const phoneRawField = document.getElementById('phone_raw');
  if (phoneRawField) phoneRawField.value = digits;

  window.location.href = "profile.html";

  return false;
}

document.querySelectorAll('input[name="firstname"], input[name="lastname"]').forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
  });
});

const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
  phoneInput.addEventListener('input', formatPhone);
  phoneInput.addEventListener('invalid', function () {
      if (!phoneInput.value) {
          phoneInput.setCustomValidity("Введите 10 или 11 цифр без пробелов");
      } else {
          phoneInput.setCustomValidity("");
      }
  });
  phoneInput.addEventListener('input', function () {
      phoneInput.setCustomValidity("");
  });
}

function formatPhone(e) {
  let value = e.target.value.replace(/\D/g, '');
  let formatted = '';

  if (value.startsWith('8')) {
    formatted = '8';
    if (value.length > 1) formatted += ' (' + value.substring(1, 4);
    if (value.length >= 5) formatted += ') ' + value.substring(4, 7);
    if (value.length >= 8) formatted += '-' + value.substring(7, 9);
    if (value.length >= 10) formatted += '-' + value.substring(9, 11);
  } else {
    if (!value.startsWith('7')) {
      value = '7' + value;
    }
    formatted = '+7';
    if (value.length > 1) formatted += ' (' + value.substring(1, 4);
    if (value.length >= 5) formatted += ') ' + value.substring(4, 7);
    if (value.length >= 8) formatted += '-' + value.substring(7, 9);
    if (value.length >= 10) formatted += '-' + value.substring(9, 11);
  }

  e.target.value = formatted;
}
