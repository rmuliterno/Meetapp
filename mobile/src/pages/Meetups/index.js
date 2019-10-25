import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, Title, List } from './styles';

export default function Meetups() {
	const [meetups, setMeetups] = useState([]);

	useEffect(() => {
		async function loadMeetups() {
			const response = await api.get('meetup');

			setMeetups(response.data);
		}
		loadMeetups();
	}, []);

	async function handleSubscribe(id) {
		await api.post(`subscriptions/${id}`);

		Alert.alert('Sucesso', 'Você se inscreveu na meetup!');
	}

	return (
		<Background>
			<Container>
				<Title>Meetups</Title>

				<List
					data={meetups}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<Meetup
							onSubscribe={() => handleSubscribe(item.id)}
							data={item}
						/>
					)}
				/>
			</Container>
		</Background>
	);
}

Meetups.navigationOptions = {
	tabBarLabel: 'Meetups',
	tabBarIcon: ({ tintColor }) => (
		<Icon name="format-list-bulleted" size={20} color={tintColor} />
	),
};
