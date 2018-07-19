const knex = require('knex')(require('./knexfile'))

module.exports = {
  createUser({ username, password }) {
    console.log(`Add user ${username} with password ${password}`);
    return knex("user").insert({
      username,
      password
    });
  },
  getADip(req, res) {
        console.log("returning dip info");
        knex("diplomate_info")
            .join("certificate_info", "diplomate_info.id", "=","certificate_info.diplomate_id")
            .where("id", req.params.id)
            .then(function (data) { res.send(data) });
  },
  getTheDips(req, res){
        console.log("returning dips info");
        knex("diplomate_info")
            .orderBy('name', 'asc')
            .then(function(data) {res.send(data)});
  },
  EditDip({ id, name, city, state_prov, country, cert_number, status }) {
    console.log(`Editing Dip ${name}`);
    return knex("diplomate_info")
    .where('id', '=', id)
    .update({
      name: name,
      city: city,
      state_prov: state_prov,
      country: country,
      cert_number: cert_number,
      status: status
    });
  },
  EditCert({cert_id, certificate_year, diplomate_id}){
    return knex("certificate_info")
    .where('cert_id', '=', cert_id)
    .update({
      cert_id: cert_id,
      certificate_year: certificate_year,
      diplomate_id: diplomate_id
    });
  },
  getACert(req, res){
    knex("certificate_info")
      .join("diplomate_info", "certificate_info.diplomate_id", "=", "diplomate_info.id")
      .where("cert_id", req.params.id)
      .then(function(data) {
        res.send(data);
      });
  }
}