import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Map } from 'immutable'

import Cell from '../Cell'
import Player from '../../lib/Player'

function shallowRender(Component) {
  const shallowRenderer = TestUtils.createRenderer()
  shallowRenderer.render(Component)

  return shallowRenderer.getRenderOutput()
}

describe('Cell', () => {
  describe('Owned by player 1', () => {
    let component
    let actions

    before(() => {
      component = shallowRender(
        <Cell
          row={4}
          col={3}
          owner={Player.One}
          playerHint={Map()}
          actions={{}}
        />
      )
    })

    it('should render red with full opacity', () => {
      expect(component.props.style.opacity).to.equal(1)
      expect(component.props.style.backgroundImage).to.equal(
        'url("img/red.png")'
      )
    })
  })

  describe('Hint for player 2', () => {
    let component
    let actions

    before(() => {
      component = shallowRender(
        <Cell
          row={3}
          col={5}
          owner={Player.None}
          playerHint={Map({ row: 3, col: 5, player: Player.Two })}
          actions={{}}
        />
      )
    })

    it('should render blue with partial opacity', () => {
      expect(component.props.style.opacity).to.equal(0.6)
      expect(component.props.style.backgroundImage).to.equal(
        'url("img/blue.png")'
      )
    })
  })

  describe('Hint and owner props', () => {
    let component
    let actions

    before(() => {
      component = shallowRender(
        <Cell
          row={3}
          col={5}
          owner={Player.One}
          playerHint={Map({ row: 3, col: 5, player: Player.Two })}
          actions={{}}
        />
      )
    })

    it('should render owner', () => {
      expect(component.props.style.opacity).to.equal(1)
      expect(component.props.style.backgroundImage).to.equal(
        'url("img/red.png")'
      )
    })
  })
})
