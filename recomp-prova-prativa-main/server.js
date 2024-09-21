import { v4 as uuidv4 } from "uuid";
import http, { createServer } from "node:http";
import fs from 'node:fs'

const PORT = 8080;

const server = http.createServer((request, response) => {
  const {url, method} = request

  //ADD MOTORISTA
if(method === 'POST' && url === '/motorista'){
    let body = ''
    request.on("data", (chunk)=>{
        body += chunk
    })
    request.on('end', ()=>{
        const addMotorista = JSON.parse(body)
        fs.readFile('bustrack.json', 'utf8', (err, data)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message:"ERRO 1"}))
                return
            }
            const motoristas = JSON.parse(data)
            addMotorista.id = uuidv4()
            motoristas.push(addMotorista)

            fs.writeFile('bustrack.json', JSON.stringify(motoristas, null, 2), (err)=>{
                if(err){
                    response.writeHead(500, {'Content-Type' : 'application/json'})
                    response.end(JSON.stringify({message: 'Problema na rota 1'}))
                    return
                }
        
            response.writeHead(201, {'Content-Type' : 'application/json'})
            response.end(JSON.stringify(addMotorista))
              })
            })
          })

  //ADD ONIBUS
}else if(method === 'POST' && url === '/onibus'){
    let body = ''
    request.on("data", (chunk)=>{
        body += chunk
    })
    request.on('end', ()=>{
        const addOnibus = JSON.parse(body)
        fs.readFile('bustrack.json', 'utf8', (err, data)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message:"ERRO 1"}))
                return
            }
            const onibus = JSON.parse(data)
            addOnibus.ID = uuidv4()
            onibus.push(addOnibus)

            fs.writeFile('bustrack.json', JSON.stringify(onibus, null, 2), (err)=>{
                if(err){
                    response.writeHead(500, {'Content-Type' : 'application/json'})
                    response.end(JSON.stringify({message: 'Problema na rota 2'}))
                    return
                }
        
            response.writeHead(201, {'Content-Type' : 'application/json'})
            response.end(JSON.stringify(addOnibus))
              })
            })
          })


  //MOSTRAR MOTORISTAS
}else if(method === 'GET' && url === '/motoristas'){
    let body = ''
    request.on("data", (chunk)=>{
        body += chunk
    })
    request.on('end', ()=>{
        fs.readFile('bustrack.json', 'utf8', (err, data)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message:"ERRO 1"}))
                return
            }
            const motoristas = JSON.parse(data)
            const selecionarArray = motoristas.filter((motorista) => motorista.nome)

            fs.writeFile('bustrack.json', JSON.stringify(motoristas), (err)=>{
                if(err){
                    response.writeHead(500, {'Content-Type' : 'application/json'})
                    response.end(JSON.stringify({message: 'Problema na rota 3'}))
                    return
                }
        
            response.writeHead(201, {'Content-Type' : 'application/json'})
            response.end(JSON.stringify(selecionarArray))
              })
            })
          })
  //MOSTRAR ONIBUS
}else if(method === 'GET' && url === '/onibus'){
  let body = ''
  request.on("data", (chunk)=>{
      body += chunk
  })
  request.on('end', ()=>{
      fs.readFile('bustrack.json', 'utf8', (err, data)=>{
          if(err){
              response.writeHead(500, {'Content-Type':'application/json'})
              response.end(JSON.stringify({message:"ERRO 1"}))
              return
          }
          const onibus = JSON.parse(data)
          const selecionarArray = onibus.filter((onibus) => onibus.placa)

          fs.writeFile('bustrack.json', JSON.stringify(onibus), (err)=>{
              if(err){
                  response.writeHead(500, {'Content-Type' : 'application/json'})
                  response.end(JSON.stringify({message: 'Problema na rota 4'}))
                  return
              }
      
          response.writeHead(201, {'Content-Type' : 'application/json'})
          response.end(JSON.stringify(selecionarArray))
            })
          })
        })
        
        
        //ADD MOTORISTA NO ONIBUS
      }else if(method === 'GET' && url.startsWith('/onibus/motorista/')){
        //url => {{base_url}}/onibus/motorista/ id do onibus / nome do motorista
        const onibusID = url.split('/')[3]
        const motoristaNome = url.split('/')[4]
  let body = ''
  request.on("data", (chunk)=>{
      body += chunk
  })
  request.on('end', ()=>{
      fs.readFile('bustrack.json', 'utf8', (err, data)=>{
          if(err){
              response.writeHead(500, {'Content-Type':'application/json'})
              response.end(JSON.stringify({message:"ERRO 1"}))
              return
          }
          const selecionarArray = JSON.parse(data)
          const onibus = selecionarArray.find((onibus) => onibus.ID === onibusID)
          const motorista = selecionarArray.find((motorista) => motorista.nome === motoristaNome)
          const array = {onibus, motorista}

          fs.writeFile('bustrack.json', JSON.stringify(onibus), (err)=>{
              if(err){
                  response.writeHead(500, {'Content-Type' : 'application/json'})
                  response.end(JSON.stringify({message: 'Problema na rota 4'}))
                  return
              }
      
          response.writeHead(201, {'Content-Type' : 'application/json'})
          response.end(JSON.stringify(array))
            })
          })
        })


  // console.log(onibusID);
  // console.log(motoristaNome);

  // let body = ''
  // request.on("data", (chunk)=>{
  //     body += chunk
  // })
  // request.on('end', ()=>{
  //     fs.readFile('bustrack.json', 'utf8', (err, data)=>{
  //         if(err){
  //             response.writeHead(500, {'Content-Type':'application/json'})
  //             response.end(JSON.stringify({message:"ERRO 1"}))
  //             return
  //         }
  //         const selecionarArray = JSON.parse(data)
  //         const onibus = selecionarArray.find((onibus) => onibus.id === onibusID)
          // const motorista = selecionarArray.find((motorista) => motorista.nome === motoristaNome)

         //console.log(onibus);
          // console.log(motorista);
          // const onibusComMotorista = fs.writeFile('bustrack.json', JSON.stringify(onibus), (err)=>{
          //   if(err){
          //     response.writeHead(500, {'Content-Type' : 'application/json'})
          //     response.end(JSON.stringify({message: 'ERRO 2'}))
          //     return
          // }
          // response.writeHead(201, {'Content-Type' : 'application/json'})
          // response.end(JSON.stringify(motorista))
          // })

          // const onibusComMotorista = {...onibus, ...motorista}
        //   fs.writeFile('bustrack.json', JSON.stringify(selecionarArray), (err)=>{
        //     if(err){
        //       response.writeHead(500, {'Content-Type' : 'application/json'})
        //       response.end(JSON.stringify({message: 'Problema na rota 5'}))
        //       return
        //     }
            
        //   response.writeHead(201, {'Content-Type' : 'application/json'})
        //   response.end(JSON.stringify(onibus))
        //     })
        //   })
        // })
        
}


});

server.listen(PORT, () => {
  console.log(`Servidor online in http://localhost/${PORT}`);
});
