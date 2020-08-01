import { buildStyles } from '../Cell'
import { Player, PlayerHint } from '../../../domain/types'

describe('buildStyles', () => {
  describe('Owned by player 1', () => {
    it('should render red with full opacity', () => {
      const styles = buildStyles(Player.One, null, 4, 3)

      expect(styles.opacity).toEqual(1)
      expect(styles.backgroundImage).toEqual('url("img/red.png")')
    })
  })

  describe('Hint for player 2', () => {
    it('should render blue with partial opacity', () => {
      const styles = buildStyles(Player.None, new PlayerHint({row: 3, col: 5, player: Player.Two}), 3, 5)

      expect(styles.opacity).toEqual(0.6)
      expect(styles.backgroundImage).toEqual('url("img/blue.png")')
    })
  })

  describe('Hint and owner props', () => {
    it('should render owner', () => {
      const styles = buildStyles(Player.One, new PlayerHint({row: 3, col: 5, player: Player.Two}), 3, 5)

      expect(styles.opacity).toEqual(1)
      expect(styles.backgroundImage).toEqual('url("img/red.png")')
    })
  })
})
