import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);

	const handleApplySettings = (newSettings: ArticleStateType) => {
		setArticleSettings(newSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialSettings={articleSettings}
				onApplySettings={handleApplySettings}
			/>
			<Article />
		</main>
	);
};
