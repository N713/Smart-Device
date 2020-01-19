const modalTel = document.getElementById(`tel-number`);
const consultTelId = document.getElementById(`number`);

const maskOptions = {
  mask: '+(7)(000)000 00 00'
};

var mask = IMask(modalTel, maskOptions);
var mask = IMask(consultTelId, maskOptions);
