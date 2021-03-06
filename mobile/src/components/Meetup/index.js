import React from 'react';
import { View } from 'react-native';

import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns-tz';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';

import {
	Container,
	Banner,
	Info,
	Data,
	Title,
	Date,
	Location,
	Provider,
} from './styles';

export default function Meetup({ data, onSubscribe }) {
	function dateFormat(date) {
		const dateFormatted = format(
			parseISO(date),
			"d 'de' MMMM', às' HH'h'",
			{
				timeZone: 'America/Sao_Paulo',
				locale: pt,
			},
		);

		return dateFormatted;
	}

	return (
		<Container>
			<Banner
				source={{
					uri: data.banner.url
						? data.banner.url
						: `https://api.adorable.io/avatar/400/${data.provider.name}.png`,
				}}
			/>

			<Info>
				<View>
					<Title>{data.title}</Title>
				</View>
				<Data>
					<Icon name="event" size={20} color="#333" />
					<Date>{dateFormat(data.date)}</Date>
				</Data>
				<Data>
					<Icon name="place" size={20} color="#333" />
					<Location>{data.location}</Location>
				</Data>
				<Data>
					<Icon name="person" size={20} color="#333" />
					<Provider>{data.provider.name}</Provider>
				</Data>

				<Button disabled onPress={onSubscribe}>
					Realizar inscrição
				</Button>
			</Info>
		</Container>
	);
}
