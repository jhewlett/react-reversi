export default function(player1Score, player2Score) {
  return (
    player1Score === 0 ||
    player2Score === 0 ||
    player1Score + player2Score === 64
  )
}
