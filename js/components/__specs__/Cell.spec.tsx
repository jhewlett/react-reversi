import * as React from 'react'
import { Map } from 'immutable'
import { shallow, ShallowWrapper } from 'enzyme'

import Cell from '../Cell'
import { Player } from '../../domain-types'

describe('Cell', () => {
  describe('Owned by player 1', () => {
    let component: ShallowWrapper
    let actions

    beforeAll(() => {
      component = shallow(
        <Cell
          row={4}
          col={3}
          owner={Player.One}
          playerHint={Map()}
          actions={{ makeMove: (r, c) => {}, checkOverlayHint: (r, c) => {}, removeHint: () => {} }}
        />
      )
    })

    it('should render red with full opacity', () => {
      expect(component.get(0).props.style.opacity).toEqual(1)
      expect(component.get(0).props.style.backgroundImage).toEqual(
        'url("img/red.png")'
      )
    })
  })

  describe('Hint for player 2', () => {
    let component: ShallowWrapper
    let actions

    beforeAll(() => {
      component = shallow(
        <Cell
          row={3}
          col={5}
          owner={Player.None}
          playerHint={Map({ row: 3, col: 5, player: Player.Two })}
          actions={{ makeMove: (r, c) => {}, checkOverlayHint: (r, c) => {}, removeHint: () => {} }}
        />
      )
    })

    it('should render blue with partial opacity', () => {
      expect(component.get(0).props.style.opacity).toEqual(0.6)
      expect(component.get(0).props.style.backgroundImage).toEqual(
        'url("img/blue.png")'
      )
    })
  })

  describe('Hint and owner props', () => {
    let component: ShallowWrapper
    let actions

    beforeAll(() => {
      component = shallow(
        <Cell
          row={3}
          col={5}
          owner={Player.One}
          playerHint={Map({ row: 3, col: 5, player: Player.Two })}
          actions={{ makeMove: (r, c) => {}, checkOverlayHint: (r, c) => {}, removeHint: () => {} }}
        />
      )
    })

    it('should render owner', () => {
      expect(component.get(0).props.style.opacity).toEqual(1)
      expect(component.get(0).props.style.backgroundImage).toEqual(
        'url("img/red.png")'
      )
    })
  })
})
