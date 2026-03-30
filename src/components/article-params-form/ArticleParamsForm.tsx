import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLElement>(null);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('[data-arrow-button]')
			) {
				closeSidebar();
			}
		};

		if (isSidebarOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setFormSettings({ ...formSettings, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormSettings({ ...formSettings, fontSizeOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormSettings({ ...formSettings, fontColor: option });
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormSettings({ ...formSettings, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormSettings({ ...formSettings, contentWidth: option });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formSettings);
		closeSidebar();
	};

	const handleReset = () => {
		const defaultSettings = defaultArticleState;
		setFormSettings(defaultSettings);
		onApply(defaultSettings);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.title}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>

					<div className={styles.field}>
						<Select
							selected={formSettings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							title='шрифт'
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formSettings.fontSizeOption}
							onChange={handleFontSizeChange}
							title='размер шрифта'
						/>
					</div>

					<div className={styles.field}>
						<Select
							selected={formSettings.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							title='цвет шрифта'
						/>
					</div>

					<div className={styles.field}>
						<Select
							selected={formSettings.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							title='цвет фона'
						/>
					</div>

					<div className={styles.field}>
						<Select
							selected={formSettings.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							title='ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
