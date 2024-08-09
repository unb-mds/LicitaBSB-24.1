export function setStatusBidding(bidding) {
    if ('Data_Resultado_Compra' in bidding) {
        return 'Encerrada';
    } else return 'Aberta';
}