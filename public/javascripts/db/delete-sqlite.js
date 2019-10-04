const asyn = require('./sqliteAsync');

async function deleteItem(req, res, next, table) {
    let id = parseInt(req.params.id, 10);
    let sql = "DELETE FROM " + table + " WHERE id = " + id + ";";

    try {
        await asyn.Async(sql, 'run');
        let text = "Kastat id " + id + " från " + table;

        await makeMessage(req, res, text);
    } catch (err) {
        next(err);
    }
}

async function makeMessage(req, res, text) {
    res.json({message: text});
}

module.exports = {
    deleteItem: deleteItem
};
