import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';

import {
	createMeetupRequest,
	updateMeetupRequest,
} from '~/store/modules/meetup/actions';

import BannerInput from './BannerInput';
import DateInput from './DateInput';

import { Container } from './styles';

const schema = Yup.object().shape({
	title: Yup.string().required('O título do meetup é obrigatório'),
	location: Yup.string().required('A senha é obrigatória'),
	date: Yup.date().required('A data é obrigatória'),
	description: Yup.string().required('A localização é obrigatória'),
	banner_id: Yup.number().required('Você precisa anexar um banner'),
});

export default function Meetup() {
	const dispatch = useDispatch();
	const [initial, setInitial] = useState();

	const provider_id = useSelector(state => state.user.profile.id);

	function handleSubmit({ banner_id, title, description, date, location }) {
		const pageURL = window.location.href;
		const id = pageURL.substr(pageURL.lastIndexOf('/') + 1);

		// eslint-disable-next-line radix
		if (parseInt(id)) {
			dispatch(
				updateMeetupRequest(
					id,
					provider_id,
					title,
					description,
					banner_id,
					date,
					location
				)
			);
		} else {
			dispatch(
				createMeetupRequest(
					provider_id,
					banner_id,
					title,
					description,
					date,
					location
				)
			);
		}
	}

	useEffect(() => {
		const pageURL = window.location.href;
		const meetup_id = pageURL.substr(pageURL.lastIndexOf('/') + 1);
		async function meetupPopulate() {
			// eslint-disable-next-line radix
			if (parseInt(meetup_id)) {
				const { data } = await api.get(`schedule/${meetup_id}`);
				setInitial(data);
			}
		}
		meetupPopulate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<Form
				schema={schema}
				onSubmit={handleSubmit}
				initialData={initial || ''}
			>
				<BannerInput name="banner_id" />
				<Input
					autoComplete="off"
					name="title"
					placeholder="Título do Meetup"
				/>
				<Input
					autoComplete="off"
					multiline
					name="description"
					placeholder="Descrição completa"
				/>
				<DateInput autoComplete="off" className="date" name="date" />
				<Input
					autoComplete="off"
					name="location"
					placeholder="Localização"
				/>

				<button className="save" type="submit">
					Salvar Meetup
				</button>
			</Form>
		</Container>
	);
}
