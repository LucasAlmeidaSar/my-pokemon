const produtos = [{
  name: 'camisa',
  id: 1,
  modelos : [
    {
      nome: 'Vermelho',
      tamanhos: [
        {
          tamanho: 'G',
          qtd: 2
        },
        {
          tamanho: 'M',
          qtd: 1
        }
      ]
    },
    {
      nome: 'Rosa',
      tamanhos: [
        {
          tamanho: 'G',
          qtd: 2
        },
        {
          tamanho: 'M',
          qtd: 1
        },
        {
          tamanho: 'P',
          qtd: 4
        }
      ]
    },
    {
      nome: 'Azul',
      tamanhos: [
        {
          tamanho: 'G',
          qtd: 4
        },
        {
          tamanho: 'M',
          qtd: 3
        }
      ]
    }
    ]
},
{
  name: 'Short',
  id: 2,
  modelos : [
    {
      nome: 'Preto',
      tamanhos: [
        {
          tamanho: 'G',
          qtd: 1
        },
        {
          tamanho: 'M',
          qtd: 2
        }
      ]
    },    
    {
      nome: 'Branco',
      tamanhos: [
        {
          tamanho: 'G',
          qtd: 2
        }
      ]
    }
    ]
},
{
  name: 'Blusa de frio',
  id: 3,
  modelos : [
    {
      nome: 'Azul',
      tamanhos: [
        {
          tamanho: 'P',
          qtd: 2
        },
        {
          tamanho: 'M',
          qtd: 4
        }
      ]
    }
    ]
},
{
  name: 'Regata',
  id: 4,
  modelos : [
    {
      nome: 'Laranja',
      tamanhos: [
        {
          tamanho: 'GG',
          qtd: 2
        },
        {
          tamanho: 'G',
          qtd: 4
        },
        {
          tamanho: 'M',
          qtd: 1
        },
        {
          tamanho: 'P',
          qtd: 1
        },
        {
          tamanho: 'PP',
          qtd: 2
        }
      ]
    },
    {
      nome: 'Rosa',
      tamanhos: [
        {
          tamanho: 'G',
          qtd: 2
        },
        {
          tamanho: 'M',
          qtd: 1
        },
        {
          tamanho: 'P',
          qtd: 4
        }
      ]
    },
    {
      nome: 'Azul',
      tamanhos: [
        {
          tamanho: 'G',
          qtd: 4
        },
        {
          tamanho: 'M',
          qtd: 3
        }
      ]
    }
    ]
}
]

// let modelos = [
//   {
//     nome: 'Vermelho',
//     modelos: [
//       {
//         tamanho: 'G',
//         qtd: 2
//       },
//       {
//         tamanho: 'M',
//         qtd: 1
//       }
//     ]
//   },
//   {
//     nome: 'Rosa',
//     modelos: [
//       {
//         tamanho: 'G',
//         qtd: 2
//       },
//       {
//         tamanho: 'M',
//         qtd: 1
//       },
//       {
//         tamanho: 'P',
//         qtd: 4
//       }
//     ]
//   },
//   {
//     nome: 'Azul',
//     modelos: [
//       {
//         tamanho: 'G',
//         qtd: 4
//       },
//       {
//         tamanho: 'M',
//         qtd: 3
//       }
//     ]
//   }
// ]



const conversorDeModelos = () => produtos.forEach(produto => {
  let modelosBackend = []

  produto.modelos.forEach(cor => {  
    cor.tamanhos.forEach(({tamanho, qtd}) => {
      const nome = cor.nome
      let medida = tamanho
      let quantidade = qtd
      let obj = {
        'cor': nome,
        'tamanho': medida,
        'qtd' : quantidade
      }  
      
      modelosBackend.push(obj)
    }) 
  })
  
  produto.modelos = modelosBackend

})


// conversorDeModelos()
// console.log(produtos)