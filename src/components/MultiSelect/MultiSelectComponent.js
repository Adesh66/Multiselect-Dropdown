import React, { useRef, useState } from 'react';
import useClickOutside from '../../hooks/UseClickOutside';
import {
    getActionFromKey,
    getUpdatedIndex,
    SelectActions,
} from './_multiselectHelper';
const MultiSelectComponent = (props) => {
    const {
        options = [],
        onOptionSelection,
        showAllOptionCheckBox,
        removeIconClickHandler,
        inputPlaceholder,
        label,
    } = props;

    const [isListOpen, setIsListOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const optionWrapperRef = useRef();
    const optionListRef = useRef();

    useClickOutside(optionWrapperRef, () => setIsListOpen(false));

    
    const handleToggle = (state) => {
        setIsListOpen(state);
        setSearchValue('');
    };
    const onSelectedOptionKeyDown = (e) => {
        const { key } = e;
        const max = options.length - 1;
        const action = getActionFromKey(e, isListOpen);
        switch (action) {
            case SelectActions.Last:
            case SelectActions.First:
                handleToggle(true);
            // // intentional fallthrough
            case SelectActions.Next:
            case SelectActions.Previous:
            case SelectActions.PageUp:
            case SelectActions.PageDown:
                e.preventDefault();
                return setActiveIndex(
                    getUpdatedIndex(activeIndex, max, action)
                );
            case SelectActions.CloseSelect:
                e.preventDefault();
                setActiveIndex(activeIndex);
                const option = options[activeIndex];
                onOptionSelection(option);

            // intentional fallthrough
            case SelectActions.Close:
                e.preventDefault();
                return handleToggle(false);
            case SelectActions.Open:
                e.preventDefault();
                return handleToggle(true);
            default:
                return;
        }
    };
    const onOptionKeyDown = (e) => {
        console.log(e);
    };
    const handleSearchInputChange = (value) => {
        setSearchValue(value);
    };
    const selected = options.filter((item) => item.isChecked);
    const activeID = isListOpen ? `multi-combo1-${activeIndex}` : '';
    return (
        <>
            {label && <label>{label}</label>}
            <div className='options-wrapper' ref={optionWrapperRef}>
                <div
                    className='selected-options'
                    role='combobox'
                    aria-controls='listbox1'
                    aria-expanded={isListOpen ? true : false}
                    aria-haspopup='listbox'
                    aria-labelledby='dropdown-ariaLabel-Class'
                    id='combo1'
                    tabIndex='0'
                    onClick={() => handleToggle(!isListOpen)}
                    onKeyDown={(e) => onSelectedOptionKeyDown(e)}
                    aria-activedescendant={activeID}
                >
                    {selected.length > 0 ? (
                        selected.map((item) => (
                            <div
                                key={item.id}
                                className='selected-option-label'
                                onClick={(e) => removeIconClickHandler(e, item)}
                            >
                                {item.username}
                                <span>X</span>
                            </div>
                        ))
                    ) : (
                        <span className='placeholder-text'>
                            {inputPlaceholder}
                        </span>
                    )}
                </div>
                {isListOpen && (
                    <div
                        className='options-list-container'
                        role='listbox'
                        id='listbox1'
                        tabIndex='-1'
                    >
                        <div className='searchbar-list'>
                            <input
                                type='text'
                                className='form-control search-input '
                                placeholder='search'
                                value={searchValue}
                                onChange={(e) =>
                                    handleSearchInputChange(e.target.value)
                                }
                            />
                        </div>
                        {showAllOptionCheckBox && (
                            <div
                                key='ALLSELECTION'
                                role='option'
                                id={`multi-combo1-0`}
                                aria-selected={false}
                                className={
                                    'option '
                                }
                                onClick={(e) =>
                                    onOptionSelection({
                                        isAll: true,
                                        checked:
                                            options.filter(
                                                (option) =>
                                                    option.isChecked !== true
                                            ).length === 0,
                                    })
                                }
                            >
                                <div
                                        className={
                                            'custom-checkbox ' +
                                            (options.filter(
                                                (option) =>
                                                    option.isChecked !== true
                                            ).length === 0 ? 'checked' : '')
                                        }
                                    ></div>
                                <label
                                    htmlFor={`option-ALLSELECTION`}
                                    className='option-label'
                                >
                                    Select all
                                </label>
                            </div>
                        )}
                        {options
                            .filter((option) => {
                                let username = option.username.toLowerCase();
                                return username.includes(
                                    searchValue.toLowerCase()
                                );
                            })
                            .map((option, index) => (
                                <div
                                    key={option.id}
                                    role='option'
                                    id={`multi-combo1-${index}`}
                                    aria-selected={index === activeIndex}
                                    className={
                                        'option ' +
                                        (index === activeIndex
                                            ? ' option-current'
                                            : '')
                                    }
                                    onClick={(e) => onOptionSelection(option)}
                                >
                                    <div
                                        className={
                                            'custom-checkbox ' +
                                            (option.isChecked ? 'checked' : '')
                                        }
                                    ></div>
                               
                                    <label
                                        htmlFor={`option-${option.username}`}
                                        className='option-label'
                                    >
                                        {option.username}
                                    </label>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MultiSelectComponent;
