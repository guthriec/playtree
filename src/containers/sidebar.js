import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import SidebarView from '../components/sidebarView.js';

const mapStateToProps = state => ({
  channels: state.channels
});

export default withRouter(connect(mapStateToProps)(SidebarView));
