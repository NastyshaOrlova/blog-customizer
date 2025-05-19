import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
} from '../../constants/articleProps';
import { useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialSettings: ArticleStateType;
	onApplySettings: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialSettings,
	onApplySettings,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(initialSettings);
	const [isOpen, setIsOpen] = useState(false);
	const handleApply = (e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault();
		}
		onApplySettings(formState);
		toggleForm();
	};
	const handleReset = () => {
		setFormState(initialSettings);
	};
	const toggleForm = () => {
		setIsOpen(!isOpen);
	};
	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState({
			...formState,
			fontFamilyOption: selected,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as='h2' weight={800} size={25} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
