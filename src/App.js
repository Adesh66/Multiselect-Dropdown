import { useEffect, useState } from 'react';
import MultiSelectComponent from './components/MultiSelect/MultiSelectComponent';
import { HOST_URL } from './constants/typeCode';
import { addToCache, getFromToCache } from './helpers/browserApiHelper';
import { fetchSampleData } from './services/apiService';
import './stylesheet/__main.scss';

function App() {
    const urlEndPoint = 'users';
    const [optionList, setOptionList] = useState([]);

    useEffect(() => {
        getSampleData();
    }, []);

    const getSampleData = async () => {
        try {
            let data = [];
                const cacheData = await getFromToCache(urlEndPoint, HOST_URL);
                if (cacheData?.length) {
                    data = cacheData;
                }
            if (!data.length) {
                const response = await fetchSampleData(urlEndPoint);
                if (response.status === 200) {
                    const responseData = await response.json();
                    data = responseData.map((user) => ({
                        ...user,
                        isChecked: false,
                    }));
                    await addToCache(urlEndPoint, HOST_URL, data);
                }
            }
            setOptionList(data);
        } catch (error) {}
    };

    const onOptionSelection = (item) => {
        const { isAll = false, checked } = item;
        let newState = optionList;
        if (isAll) {
            newState = optionList.map((state) => {
                return { ...state, isChecked: !checked };
            });
        } else {
            newState = optionList.map((state) => {
                if (state.username === item.username) {
                    return { ...state, isChecked: !item.isChecked };
                } else {
                    return { ...state };
                }
            });
        }
        setOptionList(newState);
    };
    const removeIconClickHandler = (e, item) => {
        e.stopPropagation();
        onOptionSelection(item);
    };
    return (
        <div className='App'>
            <header className=''>
                <h1>MultiSelect component</h1>
            </header>
            <p tabIndex='0' aria-label='test'>
                This is a test title to check accessibility
            </p>
            <MultiSelectComponent
                showAllOptionCheckBox={true}
                options={optionList}
                onOptionSelection={onOptionSelection}
                removeIconClickHandler={removeIconClickHandler}
                inputPlaceholder={'Select users...'}
            />
        </div>
    );
}

export default App;

// props for MultiSelectComponent ={

// }
