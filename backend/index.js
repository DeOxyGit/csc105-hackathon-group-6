import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Cookies from 'js-cookie';

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host: "db.cshack.site",
  port: 3306,
  user: "group06",
  database: "group06",
  password: "201216242",
});

app.use(cookieParser());

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);

  const q =
    "INSERT INTO users(`username`,`email`,`password`) VALUES(? , ? , ?)";

  db.query(q, [username, email, hash], (err, data) => {
    if (err) return res.status(500).send(err);
    res.send("Successfully");
  });
});

app.post("/login", (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q,[req.body.email] ,(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(400).json("User are already existing.");

        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password , data[0].password);

        if(!isPasswordCorrect) return res.status(400).json("wrong username or password");

        const token = jwt.sign({id:data[0].id}, "jwtkey");
        const {password , ...other} = data[0];

        Cookies.set("User_token" , token);

        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(other);
    })
});

app.get("/getAllposts", (req,res)=>{

  const q = "SELECT * FROM post";

  db.query(q ,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data)
  });
});

app.get("/getpost" , (req,res)=>{

  const id = req.body.id;

  const q = `SELECT * FROM post WHERE id = ${id}`;

  db.query(q,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data)
  });
})

app.get("/getComment" , (req,res)=>{
  const q = "SELECT * FROM comment INNER JOIN users ON comment.uid = users.id";

  db.query(q,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data)
  });
})

app.post("/createPost",(req,res)=>{
  const img = req.body.img;
  const title = req.body.title;
  const desc = req.body.desc;

  const q = "INSERT INTO post(`img`,`title`,`desc`) VALUES(? , ? , ?)"

  db.query(q,[img,title,desc],(err,data)=>{
    if(err) return res.status(400).json("The post cannot be create successfully.");
    return res.json("This work perfectly find");
  })
})

app.put("/updatePost",(req,res)=>{
  const id = req.body.id;
  const q = "UPDATE post SET title = ? , `desc` = ? WHERE id = ?";

  db.query(q , [req.body.title , req.body.desc , id ] , (err,data)=>{
    if(err) return res.json(err);
    return res.status(200).json("Post was update successfully");
  })
})

app.delete("/deletePost/:id",(req,res)=>{
  const id = req.params.id;
  const  q = `DELETE FROM post WHERE id = ${id}`

  db.query(q , (err,data)=>{
    if(err) return res.json(err);
    return res.status(200).json("The post was delete successfully");
  });
})

app.listen(6105, () => {
  console.log("Database was connected.");
});
