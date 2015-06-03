var React = require('react/addons');
var Cell = React.createFactory(require('../js/components/Cell'));
var TestUtils = React.addons.TestUtils;
var GameStore = require('../js/stores/GameStore');
var Board = require('../js/lib/Board');

var fluce = require('../js/fluce');

var Map = require('immutable').Map;

var buildCell = function(props) {
   var cell = TestUtils.renderIntoDocument(Cell(props));

   return TestUtils.findRenderedDOMComponentWithTag(cell, 'td');
};

describe('cell', function() {
   it('makes a move on click', function() {
      var cell = buildCell({row: 2, col: 3, owner: 0, playerHint: Map()});

      TestUtils.Simulate.click(cell);
      jest.runAllTimers();

      expect(Board.getStatus(fluce.stores.GameStore.board, 2, 3)).toEqual(1);
   });

   it('renders player one cells as red', function() {
      var cell = buildCell({row: 2, col: 3, owner: 1, playerHint: Map()});

      expect(cell.props.style.backgroundImage).toEqual('url("img/red.png")');
      expect(cell.props.style.opacity).toEqual(1);
   });

   it('renders player two cells as blue', function() {
      var cell = buildCell({row: 2, col: 3, owner: 2, playerHint: Map()});

      expect(cell.props.style.backgroundImage).toEqual('url("img/blue.png")');
      expect(cell.props.style.opacity).toEqual(1);
   });

   it('renders player hints when the coordinates match', function() {
      var cell = buildCell({row: 2, col: 3, owner: 0, playerHint: Map({row: 2, col: 3, player: 2})});

      expect(cell.props.style.backgroundImage).toMatch('blue');
      expect(cell.props.style.opacity).toEqual(0.6);
   });

   it('does not render player hints when the coordinates dont match', function() {
      var cell = buildCell({row: 2, col: 4, owner: 0, playerHint: Map({row: 2, col: 3, player: 1})});

      expect(cell.props.style.backgroundImage).toEqual('none');
   });

   it('renders cell with full opacity when it has both an owner and player hint', function() {
      var cell = buildCell({row: 2, col: 3, owner: 1, playerHint: Map({row: 2, col: 3, player: 1})})

      expect(cell.props.style.opacity).toEqual(1);
   });
});
