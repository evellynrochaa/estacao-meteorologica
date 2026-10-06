
//grafico temperatura
 const graficoT = document.getElementById("graficoT");

const GraficoT = new Chart(graficoT,{
    type: "line",
    data:{
        labels:["10:00","11:00","12:00"],
        datasets:[{label: "Temperatura",
            borderWidth: 2,
            pointRadius:5,
            data:[25,26,24]
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

 cardTemperatura = document.getElementById("valorTemperatura");


 //valor muda automaticamente
 GraficoT.data.labels.push("13:00");            //adiciona no x
 valoresTemperatura.push(30);                   //adiciona no y     

 temperaturaAtual = valoresTemperatura[valoresTemperatura.length - 1];        // descobrir novamente o  ultimo valor da lista

 cardTemperatura.innerHTML = temperaturaAtual + "°";               //elemento do html
 


 GraficoT.update();



 //grafico umidade
const graficoU = document.getElementById("graficoU");

 const GraficoU = new Chart(graficoU,{
    type:"line",
    data:{
        labels:["10:00","11:00","12:00"],
        datasets:[{label: "Umidade",
            borderWidth: 2,
            pointRadius:5,
            data:[70,72,68]
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

cardUmidade = document.getElementById("valorUmidade");


//valor muda automaticamente
GraficoU.data.labels.push("13:00")
valoresUmidade.push(60);
umidadeAtual = valoresUmidade[valoresUmidade.length - 1];

cardUmidade.innerHTML = umidadeAtual + "%";

GraficoU.update();

/*valores dos cards, umidade e temperatura
const temperatura = document.getElementById("valorTemperatura").innerHTML;
const umidade = document.getElementById("valorUmidade").innerHTML;

const temperaturaNumero = parseInt(temperatura);
const umidadeNumero = parseInt(umidade);
*/

//card alertas
const alerta = document.getElementById("alerta");

let mensagem = "";
if(temperaturaAtual > 30){

    mensagem += "⚠️ Temperatura elevada<br>" ;
}

if(umidadeAtual < 40){
    
    mensagem += "💧 Umidade baixa";
}
else if(umidadeAtual > 70){
    mensagem += "💧 Umidade alta";
}

if(mensagem === ""){
    mensagem = "Nenhum alerta no momento"
}

alerta.innerHTML = mensagem;

//mapa

const mapa = L.map("mapa").setView([-23.167795, -46.917690], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);


L.marker([-23.167795,-46.919560 ])
    .addTo(mapa)
    .bindPopup("<b>UNIP</b><br>Jundiaí - SP")
    .openPopup();

//data e hora


    