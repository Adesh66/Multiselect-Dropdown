import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { fetchSampleData } from '../../services/apiService';
import MultiSelectComponent from './MultiSelectComponent';

const mockOptionList = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '-37.3159',
                lng: '81.1496',
            },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
        },
        isChecked: false,
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
                lat: '-43.9509',
                lng: '-34.4618',
            },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
        },
        isChecked: false,
    },
];
const mockCallback = jest.fn();
describe('Render MultiSelect component', () => {
    it('render Multiselect with otionsList when All option is not visible', async () => {
        const { rerender, unmount } = render(
            <MultiSelectComponent
                options={mockOptionList}
                onOptionSelection={mockCallback}
                showAllOptionCheckBox={false}
                removeIconClickHandler={mockCallback}
                inputPlaceholder='Select Option'
                label='Selected Option'
            />
        );
    });
    it('render Multiselect with otionsList when All option is visible', () => {
        const view = render(
            <MultiSelectComponent
                options={mockOptionList}
                onOptionSelection={mockCallback}
                showAllOptionCheckBox={true}
                removeIconClickHandler={mockCallback}
                inputPlaceholder='Select Option'
                label='Selected Option'
            />
        );
    });
});
