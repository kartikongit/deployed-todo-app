const PORT = process.env.PORT ?? 8000;

const express= require('express');
const app= express();

const pool= require('./databaseh');

const cors= require('cors');

const { v4: uuidv4 } = require('uuid');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');


app.use(cors())

app.use(express.json())


app.get('/todos/:userEmail',async (request, response)=>{
    
    const userEmail=request.params.userEmail
    try{
        todos= await pool.query("SELECT * FROM todos WHERE user_email = $1",[userEmail]);
        response.json(todos.rows)
    }
    catch(error){
        console.log(error.message)
    }
})

// creating a new todo object ?

app.post('/todos', async (request, response )=>{

    const id= uuidv4();

    const {user_email, title, progress, date} = request.body

    console.log(user_email, title, progress, date)

    try{
        const newToDo = await pool.query(`INSERT INTO todos(id , user_email, title , progress, date) VALUES($1, $2, $3, $4, $5)`,[id, user_email, title, progress, date]);

        response.json(newToDo)

    }
    catch(error){
        console.error(error)
    }
})



// editing the existing todo object 


app.put('/todos/:id', async(request, response)=>{
    const { id }= request.params
    const { user_email, title, progress, date }= request.body

    try{
        const editToDo= await pool.query('UPDATE todos SET user_email= $1, title= $2, progress= $3, date= $4 WHERE id= $5', [user_email, title, progress, date, id]);
        response.json(editToDo)
    }
    catch(error){

    }


})


// deleting a todo from database as well ..


app.delete('/todos/:id', async (request, response)=>{
    const id= request.params.id;
    try{
        const deletedToDo= await pool.query('DELETE FROM todos WHERE id=$1',[id]);
        response.json(deletedToDo)
    }
    catch(error){
        console.error(error)
    }
})


// sign up 
app.post('/signup', async(request, response)=>{
    const { email , password }= request.body

    const salt= bcrypt.genSaltSync(10);
    const hashedPassword= bcrypt.hashSync(password, salt)

    try{
        const signup= await pool.query('INSERT INTO users (email, hashed_password) VALUES($1,$2)',[email, hashedPassword]);
        
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'});

        response.json({email, token})
    }
    catch(error){
        console.error(error)

        if(error){
            response.json({detail:error.detail})
        }
    }
})




// login 

app.post('/login', async(request, response)=>{
    const { email , password}=  request.body

    try{
       const user=  await pool.query('SELECT * FROM users WHERE email= $1', [email]);
       if(!user.rows.length) return response.json({detail: 'User does not exist'});

       const success= await bcrypt.compare(password, user.rows[0].hashed_password);

       const token= jwt.sign({ email}, 'secret', {expiresIn: '1hr'});

       if(success){
        response.json({'email': user.rows[0].email, token })
       }else{
        response.json({'detail': "Login failed"})
       }

    }
    catch(error){
        console.error(error)
    }
})








app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`)) 
