import * as rawGameActions from './rawGameActions';
import { dispatch } from '../redux';
import { bindActionCreators } from 'redux';

export default bindActionCreators(rawGameActions, dispatch);
