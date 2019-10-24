import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

// import { Container } from './styles';

export default function Dashboard() {
	return <Background />;
}

Dashboard.navigationOptions = {
	tabBarLabel: 'Inscrições',
	tabBarIcon: ({ tintColor }) => (
		<Icon name="local-offer" size={20} color={tintColor} />
	),
};