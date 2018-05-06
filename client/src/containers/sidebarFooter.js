import { connect } from 'react-redux';

import SidebarFooterView from '../components/sidebarFooterView.js';

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(SidebarFooterView);
