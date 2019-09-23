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

function getTime() {
    let d = new Date();

    return d.toLocaleTimeString('sv-SE', timeoptions);
}

function getDate() {
    let d = new Date();

    return d.toLocaleDateString('sv-SE', options);
}

module.exports = {
    getTime: getTime,
    getDate: getDate
};
