
//grafico temperatura
 const graficoT = document.getElementById("graficoT");

const GraficoT = new Chart(graficoT,{
    type: "line",
    data:{
        labels:[],
        datasets:[{label: "Temperatura",
            borderWidth: 2,
            pointRadius:5,
            data:[]
        }]
    },
    options:{
        plugins:{
            legend:{
                labels:{
                    color:"#f5f5f5"
                }
            }
        },
        scales:{
            x:{
                ticks:{
                    color:"#b8b8bd"
                },
                grid:{
                    color:"#45464c"
                }
            },
            y:{
              title:{
                 display: true,
                    text:"Temperatura(°C)",
                    color:"#b8b8bd"
            },
                ticks:{
                    color:"#b8b8bd",
                    callback:function (value) {
                        return value + "°C";
                    }
                },
                grid:{
                    color:"#45464c"
                }
            }
        }
    }
 });

 //valor do card temperatura de acordo com o gráfico
 const valoresTemperatura = GraficoT.data.datasets[0].data;
 let temperaturaAtual = valoresTemperatura[ valoresTemperatura.length - 1];                          

  const cardTemperatura = document.getElementById("valorTemperatura");


 //valor muda automaticamente
 GraficoT.data.labels.push();            //adiciona no x
 valoresTemperatura.push();                   //adiciona no y     

 temperaturaAtual = valoresTemperatura[valoresTemperatura.length - 1];        // descobrir novamente o  ultimo valor da lista

 cardTemperatura.textContent = temperaturaAtual + "°C";               //elemento do html
 


 GraficoT.update();



 //grafico umidade
const graficoU = document.getElementById("graficoU");

 const GraficoU = new Chart(graficoU,{
    type:"line",
    data:{
        labels:[],
        datasets:[{label: "Umidade",
            borderWidth: 2,
            pointRadius:5,
            data:[]
        }]
    },
    options:{
        plugins:{
            legend:{
                labels:{
                    color:"#f5f5f5"
                }
            }
        },
        scales:{
            x:{
                ticks:{
                    color:"#b8b8bd"
                },
                grid:{
                    color:"#45464c"
                }
            },
            y:{
                title:{
                    display:true,
                    text:"Umidade(%)",
                    color:"#b8b8bd"
                },
                ticks:{
                    color:"#b8b8bd",
                    callback:function (value){
                        return value + "%";
                    }
                },
                grid:{
                    color:"#45464c"
                }

            }
        }
    }
});

//valor do card de umidade de acordo com o gráfico
const valoresUmidade = GraficoU.data.datasets[0].data;
let umidadeAtual = valoresUmidade[valoresUmidade.length - 1];

const cardUmidade = document.getElementById("valorUmidade");


//valor muda automaticamente
GraficoU.data.labels.push()
valoresUmidade.push();
umidadeAtual = valoresUmidade[valoresUmidade.length - 1];

cardUmidade.textContent = umidadeAtual + "%";

GraficoU.update();


//card alertas
const alerta = document.getElementById("alerta");



const mapa = L.map("mapa").setView([-23.167795, -46.917690], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);


L.marker([-23.167795,-46.919560 ])
    .addTo(mapa)
    .bindPopup("<b>UNIP</b><br>Jundiaí - SP")
    .openPopup();


//data e hora

fetch("https://estacao-metereologica-api.onrender.com/leituras/ultima").then
(function(resposta){
    return resposta.json();
})

.then(function(leitura){
    let mensagem = "";

     cardTemperatura.textContent = leitura.temperatura + "°C";
     cardUmidade.textContent = leitura.umidade + "%";

     if(leitura.temperatura > 22){
        mensagem += "⚠️ Temperatura elevada\n"
     }
     else if(leitura.temperatura < 20){
        mensagem += "⚠️ Temperatura baixa\n"
     }
        if(leitura.umidade < 40){
             mensagem += "💧 Umidade baixa";
        }
        else if(leitura.umidade > 60){
         mensagem += "💧 Umidade alta";
        }
        
        if(mensagem === ""){
       mensagem = "Nenhum alerta no momento"
        }

        alerta.textContent = mensagem;


     const elementoData = document.getElementById("data");
     const elementoHora = document.getElementById("hora");

     const dataHora = new Date(leitura.data_hora);

     elementoData.textContent = dataHora.toLocaleDateString("pt-BR",{
        timeZone: "America/Sao_Paulo"

     });

     elementoHora.textContent = dataHora.toLocaleTimeString("pt-BR",{
        hour:"2-digit",
        minute: "2-digit",
        timeZone:"America/Sao_Paulo"
     });

})

.catch(function(erro){
    console.log("Erro ao buscar dados:", erro);
});

fetch("https://estacao-metereologica-api.onrender.com/leituras?limite=200")
    .then(function (resposta) {
        return resposta.json();
    })

    //separar valores de temperatura

    .then(function (leituras) {

        leituras.sort(function(a,b){
            return new Date(a.data_hora) - new Date(b.data_hora);
        });

        const horarios = leituras.map(function (leitura) {
        return new Date(leitura.data_hora).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
});
        const temperaturas = leituras.map(function(leitura){
            return leitura.temperatura;
        });
        //separar valores de umidade

        const umidades = leituras.map(function(leitura){
            return leitura.umidade;
        });
        
        //atualizar o grafico de temperatura

        GraficoT.data.labels = horarios;
        GraficoT.data.datasets[0].data = temperaturas;
        GraficoT.update();

        //atualizar grafico de umidade

        GraficoU.data.labels = horarios;
        GraficoU.data.datasets[0].data = umidades;
        GraficoU.update();

    })
    .catch(function (erro) {
        console.log("Erro ao buscar o histórico:", erro);
    });



    