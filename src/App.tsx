import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import { defaultArticleState } from './constants/articleProps';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);

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
				onApplySettings={setArticleSettings}
			/>
			<Article />
		</main>
	);
};
