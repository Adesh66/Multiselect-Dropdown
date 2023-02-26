import { render, screen } from '@testing-library/react';
import App from './App';

describe('render App', () => {
    it('renders App component', () => {
        render(<App />);
        const linkElement = screen.getByText(/MultiSelect component/i);
        expect(linkElement).toBeInTheDocument();
    });
});
