import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';
import api from '~/services/api';

import bitmap from '~/assets/bitmap.svg';

import { Container } from './styles';

export default function BannerInput() {
	const { defaultValue, registerField } = useField('banner');

	const [file, setFile] = useState(defaultValue && defaultValue.id);
	const [preview, setPreview] = useState(defaultValue && defaultValue.url);

	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			registerField({
				name: 'banner_id',
				ref: ref.current,
				path: 'dataset.file',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref]);

	async function handleChange(e) {
		const data = new FormData();

		data.append('file', e.target.files[0]);

		const response = await api.post('files', data);

		const { id, url } = response.data;

		setFile(id);
		setPreview(url);
	}

	return (
		<Container>
			<label htmlFor="banner">
				<img src={preview || bitmap} alt="Banner" />
				{!preview && (
					<div className="centered-text">
						<div>
							<MdCameraAlt
								className="icon-camera"
								size={54}
								color="#fff"
							/>
						</div>
						<strong>Selecionar imagem</strong>
					</div>
				)}
				<input
					type="file"
					id="banner"
					accept="image/*"
					data-file={file}
					onChange={handleChange}
					ref={ref}
				/>
			</label>
		</Container>
	);
}
