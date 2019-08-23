let options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
};

let timeoptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

let d = new Date();
let time = d.toLocaleTimeString('sv-SE', timeoptions);
let date = d.toLocaleDateString('sv-SE', options);

exports.time = time;
exports.date = date;
