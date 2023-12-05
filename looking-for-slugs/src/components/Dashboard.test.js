import {render, screen, cleanup} from '@testing-library/react'
import Dashboard from './DashBoard'

test ("Should render todo component", () => {
    render(<Dashboard></Dashboard>);
})