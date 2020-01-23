import IMask from 'imask';

var modalTel = document.getElementById('tel-number');
var consultTelId = document.getElementById('number');
var telInputs = [modalTel, consultTelId];

var maskOptions = {
  mask: consultTelId.dataset.mask + ''
};

for (var i = 0; i < telInputs.length; i++) {
  IMask(telInputs[i], maskOptions);
}
