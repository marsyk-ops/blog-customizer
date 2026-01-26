import { useState, useEffect, useRef, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	type ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	/*исправлен код с ошибками линтинга*/ appliedState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);
	const sidebarRef = useRef<HTMLElement>(null);

	useOutsideClickClose({
		isMenuOpen,
		rootRef: sidebarRef,
		onChange: setIsMenuOpen,
	});

	useEffect(() => {
		if (isMenuOpen) {
			setFormState(appliedState);
		}
	}, [isMenuOpen, appliedState]);

	const handleToggleSidebar = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsMenuOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontFamilyOption: option,
							}))
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontSizeOption: option,
							}))
						}
					/>

					<Select
						title='Цвет текста'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontColor: option,
							}))
						}
					/>

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								backgroundColor: option,
							}))
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								contentWidth: option,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
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
/*проверена работоспосбоность*/
