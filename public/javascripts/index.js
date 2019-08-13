var obj = {
    desc: function() {
        return [
            "Välkommen!" +
            " -- Du har kommit",
            " till styrboxen :-)"
        ];
    },

    find: function() {
        let text = obj.desc();

        return [
            {
                "header": "Front",
                "description": text
            }
        ];
    }
};

module.exports = obj;
