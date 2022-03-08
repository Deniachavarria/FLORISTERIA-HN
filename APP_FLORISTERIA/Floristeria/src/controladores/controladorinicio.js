exports.Raiz = (req, res) => {
    console.log(req);
    console.log("Hola");
    res.send("Hola");
};
exports.otra = (req, res) => {
    console.log("Estoy en otra");
    res.send("Estoy en otra");
};
exports.otra2 = (req, res) => {
    console.log("Estoy en otra2");
    res.send("Estoy en otra2");
};