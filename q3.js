// A paginação e a segmentação são técnicas de alocação de memória que permitem
//  a alocação não contígua, mas possuem diferenças essenciais. A paginação divide 
//  a memória em blocos de tamanho fixo, eliminando a fragmentação externa, mas
//   podendo causar fragmentação interna. Já a segmentação divide a memória em partes
//    lógicas de tamanhos variáveis, reduzindo a fragmentação interna, mas sofrendo com
//     fragmentação externa. Enquanto a paginação usa uma tabela de páginas para mapear
//      endereços, a segmentação utiliza uma tabela de segmentos. A paginação é mais 
//      eficiente na alocação, mas pode desperdiçar espaço, enquanto a segmentação reflete
//       melhor a organização dos programas, porém com maior complexidade na alocação. 
