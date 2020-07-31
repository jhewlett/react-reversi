import { Player, CellOwner } from '../domain/types'

function getBackgroundImage(player: CellOwner) {
  if (player === Player.One) return 'url("img/red.png")'
  if (player === Player.Two) return 'url("img/blue.png")'

  return 'none'
}

export default function(player: CellOwner) {
  return {
    backgroundImage: getBackgroundImage(player),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: 40,
    height: 40
  }
}
