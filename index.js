const app = require('./src/app')

app.listen(app.get('port'),(err) =>{
    if(err){
        console.log(`Error startting the server: ${err}`)
    } else {
        console.log(`🚀The server is started on the port: ${app.get('port')}`)
    }
})
