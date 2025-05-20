import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';

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
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onChange: (newValue) => {
			if (newValue === false) {
				setIsOpen(false);
			}
		},
	});

	const handleApply = (e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault();
		}
		onApplySettings(formState);
		toggleForm();
	};
	const handleReset = () => {
		setFormState(defaultArticleState);
		onApplySettings(defaultArticleState);
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

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState({
			...formState,
			fontSizeOption: selected,
		});
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState({
			...formState,
			fontColor: selected,
		});
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState({
			...formState,
			backgroundColor: selected,
		});
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState({
			...formState,
			contentWidth: selected,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form onReset={handleReset} className={styles.form}>
					<Text as='h2' weight={800} size={25} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='Размер Шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет Шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет Фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина Контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
