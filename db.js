const Pool = require("pg").Pool;

// database connection
const db = new Pool({
user: "postgres",
host: "localhost",
database: "cakeshop",
password: "root",
port: 5432,
});

function getUsers(req, res) {
  console.log("connecting to database");
  db.query("SELECT * FROM login", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
}



// database query to fetch data based on users id
// request object can read data from URL
const getUsersById = (req, res) => {
const id = req.params.id;



db.query("SELECT * FROM login where id=$1", [id], (error, result) => {
if (error) {
throw error;
}
res.json(result.rows);
});
};



// database query to insert new record in the table
// request object can read data from HTTP request body
const postUsers = (req, res) => {
const newPost = req.body;
const email = newPost.email;
const password = newPost.password;
db.query(
"INSERT INTO login(email, password) values($1, $2)",
[email, password],
(error, result) => {
if (error) {
throw error;
}
res.status(201).json({ message: "New User added" });
}
);
};



// module.exports will export object with function
module.exports = { getUsers, getUsersById, postUsers };
