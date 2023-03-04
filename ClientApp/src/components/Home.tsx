import * as React from 'react';
import { connect } from 'react-redux';
import PremiumCalculator from '../components/Adactin';

const Home = () => (
    <div>
        <PremiumCalculator></PremiumCalculator>
  </div>
);

export default connect()(Home);
