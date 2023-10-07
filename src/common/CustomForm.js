import React, { useState } from 'react';

function CustomForm({ onSubmit, fields }) {
	const [formData, setFormData] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			{fields.map(field => (
				<div
					key={field.name}
					className='mb-3'
				>
					<label
						htmlFor={field.id}
						className='form-label'
					>
						{field.label}
					</label>
					{field.type === 'textarea' ? (
						<textarea
							className='form-control'
							id={field.id}
							name={field.name}
							rows={field.rows || 2}
							placeholder={field.placeholder}
							value={formData[field.name] || ''}
							onChange={handleChange}
						></textarea>
					) : (
						<input
							type={field.type || 'text'}
							className='form-control'
							id={field.id}
							name={field.name}
							placeholder={field.placeholder}
							value={formData[field.name] || ''}
							onChange={handleChange}
						/>
					)}
				</div>
			))}
			<div>
				<button
					className='btn btn-secondary btn-1'
					type='button'
				>
					Cancel
				</button>
				<button
					className='btn btn-primary'
					type='submit'
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default CustomForm;
