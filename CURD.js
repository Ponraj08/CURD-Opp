const http = require('http');
const express = require('express');
const mysql = require('mysql2');
const cron =require('node-cron')



const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'test',
    user: 'root',
    password: 'Raj@08112003'
});    

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    } else {
        
        console.log('Connected to MySQL database');
    }    
});    



//adding cources POST 

app.post("/cources", async (req, res) => {
    try {
        const { title, rate, discription } = req.body
        const add = await connection.promise().query(
            `INSERT INTO cources (title, rate, discription)  VALUES (?, ?,?)`,
            [title, rate, discription]
        );    
        res.status(202).json({
            message: "cource Created",
        });    
    } catch (err) {
        res.status(500).json({
            error_message: err,
        });    
    }    
});    


//viewing coueses --GET

app.get('/cources', async (req, res) => {
    
    try {
        
        
        const data = await connection.promise().query('SELECT *  from cources;');
        
        // data.on('result', (d) => {
            //     console.log(d, '***')    
            // })
            
            
            res.status(202).json({
                coursces: data[0],
            });    
        }    
        catch (err) {
            console.log(err)
            res.status(500).json({
                error_message: err,
            });    
        }    
    });    
    
    
    //edit the cources -- PUT
    
    app.put('/cources/:id', async (req, res) => {
        
        try {
            
            const { id } = req.params
            console.log({ id })
            const { title, rate, discription } = req.body
            
            const data = await connection.promise().query('UPDATE cources set title= ? ,rate=?, discription=? WHERE id=?',
                [title, rate, discription, id]);
                
                res.status(202).json({
                    message: "cource Updated",
                });    
            }    
            catch (err) {
                console.log(err)
                res.status(500).json({
                    error_message: err,
                });    
            }    
        });    
        
    //delrting the cources -- DELETE
    
    
    app.delete("/cources/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const update = await connection.promise().query(`DELETE FROM  cources where id = ?`,[id]);
            res.status(200).json({
                message: "deleted",    
            });    
        } catch (err) {
            res.status(500).json({
                message: err,
            });    
        }    
    });    
    
    
    
    function logMessage() {
        console.log('Cron job executed at:', new Date().toLocaleString());
    }
    // Schedule the cron job to run every minute
    cron.schedule('* * * * *', () => {
        logMessage();
    });



    
    const server = http.createServer(app);
    server.listen(6000);
    
    module.exports = connection;
    
    
    
    
    